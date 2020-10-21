using System;

namespace PomegranateTechnologies.API.DTO
{
    public class UserForDetailedDTO
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }
        public string FullName { get; set; }
        public DateTime Created { get; set; }
        public long? Weight { get; set; }
    }
}