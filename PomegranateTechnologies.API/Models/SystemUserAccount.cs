using System;

namespace PomegranateTechnologies.API.Models
{
    public class SystemUserAccount: BaseModel
    {
        public int SystemUserId { get; set; }
        //public int AccountId { get; set; }
        public int FailedLoginAttempts { get; set; }
        public bool IsAccountLocked { get; set; }
        public DateTime? AccountLockedDate { get; set; }
        public virtual SystemUser SystemUser { get; set; }
    }
}