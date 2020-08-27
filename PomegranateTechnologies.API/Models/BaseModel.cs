using System;

namespace PomegranateTechnologies.API.Models
{
    public class BaseModel
    {
        public int? Id { get; set; }
        public DateTime? CaptureDate { get; set; }
        public bool? IsActive { get; set; }
    }
}