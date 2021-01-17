using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OCAS.Models;

namespace OCAS.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActivityController : ControllerBase
    {
       
        private readonly ILogger<ActivityController> _logger;
        private readonly ActivityContext _context;

        public ActivityController(ILogger<ActivityController> logger, ActivityContext context)
        {
            _logger = logger;
            _context = context;
        }



        [HttpGet]
        public IEnumerable<Activity> GetActivities()
        {
            return _context.Activities.ToList();
        }
    }
}
