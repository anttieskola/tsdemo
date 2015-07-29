using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using tsdemo.logic.Dal;
using tsdemo.logic.Entity;
using Microsoft.Data.Entity.ChangeTracking;
using Microsoft.Data.Entity;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace tsdemo.ui.Controllers
{
    [Route("api/[controller]")]
    public class StatusesController : Controller
    {
        private AssemblyContext _context;

        public StatusesController(AssemblyContext context)
        {
            _context = context;
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<Status> Get()
        {
            return _context.Statuses.ToList();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Status Get(int id)
        {
            return _context.Statuses.FirstOrDefault(s => s.id == id);
        }

        // POST api/values
        [HttpPost]
        public async Task<Status> Post([FromBody]Status value)
        {
            EntityEntry<Status> ee = _context.Entry<Status>(value);
            ee.State = EntityState.Added;
            await _context.SaveChangesAsync();
            return ee.Entity;
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Status value)
        {
            var current = _context.Statuses.FirstOrDefault(s => s.id == id);
            if (current != null)
            {
                _context.Statuses.Attach(value);
                _context.Entry<Status>(value).State = EntityState.Modified;
            }
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            var status = _context.Statuses.FirstOrDefault(s => s.id == id);
            if (status != null)
            {
                _context.Entry<Status>(status).State = EntityState.Deleted;
                return true;
            }
            return false;
        }
    }
}
