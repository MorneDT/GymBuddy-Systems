using System;
using System.Collections.Generic;
using PomegranateTechnologies.API.Helper;

namespace PomegranateTechnologies.API.Models
{
    public class Workout: BaseModel
    {
        public int PersonId { get; set; }
        public string Time { get; set; }
        public virtual Person Person { get; set; }
        public virtual ICollection<Exercise> Exercises { get; set; }
    }
}