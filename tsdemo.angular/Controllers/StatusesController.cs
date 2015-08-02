using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using tsdemo.logic.Dal;
using tsdemo.logic.Entity;
using Microsoft.Data.Entity.ChangeTracking;
using Microsoft.Data.Entity;

namespace tsdemo.angular.Controllers
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
        public async Task<Status> Get(int id)
        {
            return await _context.Statuses.FirstOrDefaultAsync(s => s.id == id);
        }

        // POST api/values
        [HttpPost]
        public async Task<Status> Post([FromBody]Status value)
        {
            if (ModelState.IsValid)
            {
                EntityEntry<Status> ee = _context.Entry<Status>(value);
                ee.State = EntityState.Added;
                await _context.SaveChangesAsync();
                return ee.Entity;
            }
            return null;
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task<Status> Put(int id, [FromBody]Status value)
        {
            if (ModelState.IsValid)
            {
                _context.Entry<Status>(value).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return value;
            }
            return null;
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(int id)
        {
            var status = await _context.Statuses.FirstOrDefaultAsync(s => s.id == id);
            if (status != null)
            {
                _context.Entry<Status>(status).State = EntityState.Deleted;
                return true;
            }
            return false;
        }
    }
}
