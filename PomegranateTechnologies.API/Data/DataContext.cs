using Microsoft.EntityFrameworkCore;
using PomegranateTechnologies.API.Models;

namespace PomegranateTechnologies.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<SystemUser> SystemUser { get; set; }
        public DbSet<SystemUserDetail> SystemUserDetail { get; set; }
        public DbSet<SystemUserAccount> SystemUserAccount { get; set; }
        public DbSet<Person> Person { get; set; }
        public DbSet<Workout> Workout { get; set; }
        public DbSet<Exercise> Exercise { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            
        }
    }
}