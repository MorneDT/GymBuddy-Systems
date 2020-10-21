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
using Microsoft.AspNetCore.Authorization;

namespace PomegranateTechnologies.API.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class WorkoutController : ControllerBase
    {
        private readonly IWorkoutRepository _repo;
        private readonly IProfileRepository _profileRepo;
        private readonly IConfiguration _config;
        public IMapper _mapper { get; }

        public WorkoutController(IWorkoutRepository repo, IProfileRepository profileRepo, IConfiguration config, IMapper mapper)
        {
            _config = config;
            _mapper = mapper;
            _repo = repo;
            _profileRepo = profileRepo;
        }

        [HttpPost("AddWorkout")]
        public async Task<IActionResult> AddWorkout(WorkoutForUserDTO workoutForUserDTO)
        {
            var currUser = await _profileRepo.GetUser(workoutForUserDTO.User.Id);
            currUser.Person.Weight = workoutForUserDTO.User.Weight;
            // if (workoutForUserDTO.User.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unauthorized();

            Workout _workout = _mapper.Map<Workout>(workoutForUserDTO);
            _workout.PersonId = currUser.PersonId;
            _workout.Person = currUser.Person;

            await _repo.AddWorkout(_workout);

            return Ok(_workout);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetWorkout(int id)
        {
            var currUser = await _profileRepo.GetUser(id);
            var result = await _repo.GetWorkoutsForPerson(currUser.PersonId);
            return Ok(result);
        }
    }
}