using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace OCAS.Models
{
    public class UserContext : DbContext
    {
        private readonly IConfiguration Configuration;
        public DbSet<User> Users { get; set; }


        public UserContext(IConfiguration configuration, DbContextOptions<UserContext> options) : base(options)
        {
            Configuration = configuration;
        }



    }
}