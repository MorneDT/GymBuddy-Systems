using System;
using PomegranateTechnologies.API.Helper;

namespace PomegranateTechnologies.API.Models
{
    public class Person: BaseModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public GenderEnum? Gender { get; set; }
    }
}