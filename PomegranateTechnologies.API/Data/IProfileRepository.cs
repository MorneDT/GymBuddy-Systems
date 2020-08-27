using System.Threading.Tasks;
using PomegranateTechnologies.API.Models;

namespace PomegranateTechnologies.API.Data
{
    public interface IProfileRepository
    {
        Task<SystemUser> GetUser(int Id);
    }
}