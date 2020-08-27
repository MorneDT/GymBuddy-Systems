
namespace PomegranateTechnologies.API.Models
{
    public class SystemUserDetail: BaseModel
    {
        public int SystemUserId { get; set; }
        public byte[] DetailHash { get; set; }
        public byte[] DetailSalt { get; set; }
        public virtual SystemUser SystemUser { get; set; }
    }
}