using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace OCAS.Models
{
    public class ActivityContext : DbContext
    {
        private readonly IConfiguration Configuration;
        public DbSet<Activity> Activities { get; set; }
        

        public ActivityContext(IConfiguration configuration, DbContextOptions<ActivityContext> options) : base(options)
        {
            Configuration = configuration;
        }

        
        
    }
}
