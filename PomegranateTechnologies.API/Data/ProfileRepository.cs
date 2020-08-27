using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PomegranateTechnologies.API.Models;

namespace PomegranateTechnologies.API.Data
{
    public class ProfileRepository : IProfileRepository
    {
        private readonly DataContext _context;
        public ProfileRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<SystemUser> GetUser(int Id)
        {
            var user = await _context.SystemUser.Include(p => p.Person).FirstOrDefaultAsync(u => u.Id == Id);
            return user;
        }
    }
}