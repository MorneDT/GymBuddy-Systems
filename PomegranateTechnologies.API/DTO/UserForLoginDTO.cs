using System.ComponentModel.DataAnnotations;

namespace PomegranateTechnologies.API.DTO
{
    public class UserForLoginDTO
    {
        public string Username { get; set; }

        public string Password { get; set; }
    }
}