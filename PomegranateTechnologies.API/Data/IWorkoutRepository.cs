using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using PomegranateTechnologies.API.Models;

namespace PomegranateTechnologies.API.Data
{
    public interface IWorkoutRepository
    {
        Task<Workout> AddWorkout(Workout workout);
        Task<IEnumerable<Workout>>  GetWorkoutsForPerson(int PersonId);
    }
}