using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PomegranateTechnologies.API.Models;

namespace PomegranateTechnologies.API.Data
{
    public class WorkoutRepository : IWorkoutRepository
    {
        private readonly DataContext _context;
        public WorkoutRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<Workout> AddWorkout(Workout workout)
        {
            foreach (var exerciseItem in workout.Exercises)
            {
                exerciseItem.CaptureDate = DateTime.Now;
                exerciseItem.IsActive = true;
            }
            workout.CaptureDate = DateTime.Now;
            workout.IsActive = true;
            await _context.Workout.AddAsync(workout);
            await _context.SaveChangesAsync();
            return workout;
        }

        public async Task<IEnumerable<Workout>> GetWorkoutsForPerson(int PersonId)
        {
            if (await _context.Workout.AnyAsync(wor => wor.PersonId == PersonId))
            {
                var workouts = await _context.Workout.Include(e => e.Exercises)
                                                     .Include(p => p.Person)
                                                     .Where(x => x.PersonId == PersonId)
                                                     .ToListAsync();

                return workouts;
            }
            else
            {
                return null;
            }
        }
    }
}