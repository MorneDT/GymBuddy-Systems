
using System.Collections.Generic;

namespace PomegranateTechnologies.API.Models
{
    public class SystemUser: BaseModel
    {
        public string Username { get; set; }
        public int PersonId { get; set; }
        public virtual Person Person { get; set; }
        public virtual ICollection<SystemUserDetail> SystemUserDetails { get; set; }
        public virtual ICollection<SystemUserAccount> SystemUserAccounts { get; set; }
    }
}