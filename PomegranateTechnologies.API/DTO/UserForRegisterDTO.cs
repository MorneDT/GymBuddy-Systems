using System;
using System.ComponentModel.DataAnnotations;
using PomegranateTechnologies.API.Helper;

namespace PomegranateTechnologies.API.DTO
{
    public class UserForRegisterDTO
    {

        [Required]
        [EmailAddress]
        public string EmailAddress { get; set; }

        [Required]
        [StringLength(16, MinimumLength = 4, ErrorMessage = "You must specify password between {2} and {1} characters.")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        //[Required]
        public GenderEnum? Gender { get; set; }

        [Required]
        [MaxLength(250)]
        public string Name { get; set; }

        [Required]
        [MaxLength(250)]
        public string Surname { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }
    }
}