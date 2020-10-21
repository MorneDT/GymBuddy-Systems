using System;
using PomegranateTechnologies.API.Helper;

namespace PomegranateTechnologies.API.Models
{
    public class Exercise: BaseModel
    {
        public string Name { get; set; }
        public long? Reps { get; set;}
        public long? Sets { get; set;}
    }
}