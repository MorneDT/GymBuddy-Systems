using System;
using System.Threading.Tasks;
using PomegranateTechnologies.API.Models;

namespace PomegranateTechnologies.API.Data
{
    public interface IAuthRepository
    {
         Task<SystemUser> Register(SystemUser user, string password);
         Task<SystemUser> Login(string username, string password);
         Task<bool> UserExists(string username);
    }
}