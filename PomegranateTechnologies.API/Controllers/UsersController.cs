using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PomegranateTechnologies.API.Data;
using PomegranateTechnologies.API.DTO;

namespace PomegranateTechnologies.API.Controllers
{
    //[ServiceFilter(typeof(LogUseActivity))]
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IProfileRepository _repo;
        private readonly IMapper _mapper;

        public UsersController(IProfileRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet("{id}", Name = "GetUser")]
        public async Task<IActionResult> GetUser(int Id)
        {
            var user = await _repo.GetUser(Id);
            var userToReturn = _mapper.Map<UserForDetailedDTO>(user.Person);
            var usernameToReturn = _mapper.Map<UserForDetailedDTO>(user);

            userToReturn.Id = usernameToReturn.Id;
            userToReturn.Username = usernameToReturn.Username;
            userToReturn.Created = usernameToReturn.Created;
            return Ok(userToReturn);
        }
    }
}