using System;
using System.Collections.Generic;
using PomegranateTechnologies.API.Models;

namespace PomegranateTechnologies.API.DTO
{
    public class WorkoutForUserDTO
    {
        public int? Id { get; set; }
        public string Time { get; set; }
        public DateTime CaptureDate { get; set; }
        public UserForDetailedDTO User { get; set; }
        public ICollection<Exercise> Exercises { get; set; }
    }
}