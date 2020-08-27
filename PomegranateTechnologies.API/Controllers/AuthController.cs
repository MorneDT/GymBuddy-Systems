using System;
using System.Threading.Tasks;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using PomegranateTechnologies.API.Data;
using PomegranateTechnologies.API.DTO;
using PomegranateTechnologies.API.Models;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace PomegranateTechnologies.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        public IMapper _mapper { get; }

        public AuthController(IAuthRepository repo, IConfiguration config, IMapper mapper)
        {
            _config = config;
            _mapper = mapper;
            _repo = repo;
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDTO userForRegisterDTO)
        {
            // validate request
            userForRegisterDTO.EmailAddress = userForRegisterDTO.EmailAddress.ToLower();

            if (await _repo.UserExists(userForRegisterDTO.EmailAddress))
                return BadRequest("Username already exists");

            var person = _mapper.Map<Person>(userForRegisterDTO);
            var userToCreate = _mapper.Map<SystemUser>(userForRegisterDTO);
            userToCreate.Person = person;

            var createdUser = await _repo.Register(userToCreate, userForRegisterDTO.Password);

            var userToReturn = _mapper.Map<UserForDetailedDTO>(createdUser.Person);
            var usernameToReturn = _mapper.Map<UserForDetailedDTO>(createdUser);

            userToReturn.Id = usernameToReturn.Id;
            userToReturn.Username = usernameToReturn.Username;
            userToReturn.Created = usernameToReturn.Created;

            return CreatedAtRoute("GetUser", new { controller = "Users", id = createdUser.Id }, userToReturn);
        }
        
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDTO userForLoginDTO)
        {
            string errorMessage = "Invalide Username or Password";
            if (userForLoginDTO.Username == null || userForLoginDTO.Password == null)
                return Unauthorized(errorMessage);

            SystemUser userFromRepo = null;
            try {
                userFromRepo = await _repo.Login(userForLoginDTO.Username.ToLower(), userForLoginDTO.Password);
            } catch (Exception ex) {
                errorMessage = ex.Message;
            }

            if (userFromRepo == null)
                return Unauthorized(errorMessage);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.Username)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));
            var creds = new SigningCredentials(key,SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials= creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var userToReturn = _mapper.Map<UserForDetailedDTO>(userFromRepo.Person);
            var usernameToReturn = _mapper.Map<UserForDetailedDTO>(userFromRepo);

            userToReturn.Id = usernameToReturn.Id;
            userToReturn.Username = usernameToReturn.Username;
            userToReturn.Created = usernameToReturn.Created;

            return Ok(new 
            {
                 token = tokenHandler.WriteToken(token),
                 userToReturn
            });
        }
    }
}