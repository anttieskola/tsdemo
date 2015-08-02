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
    public class LinesController : Controller
    {
        private AssemblyContext _context;
        public LinesController(AssemblyContext context)
        {
            _context = context;
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<Line> Get()
        {
            return _context.Lines.Include(l => l.Operations).ToList();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<Line> Get(int id)
        {
            return await _context.Lines.Include(l => l.Operations)
                .FirstOrDefaultAsync(l => l.id == id);
        }

        // POST api/values
        [HttpPost]
        public async Task<Line> Post([FromBody]Line line)
        {
            if (ModelState.IsValid)
            {
                EntityEntry<Line> ee = _context.Lines.Add(line);
                await _context.SaveChangesAsync();
                return ee.Entity;
            }
            return null;
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task<Line> Put(int id, [FromBody]Line value)
        {
            if (ModelState.IsValid)
            {
                _context.Entry<Line>(value).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return value;
            }
            return null;
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(int id)
        {
            var line = await _context.Lines.FirstOrDefaultAsync(l => l.id == id);
            if (line != null)
            {
                _context.Entry<Line>(line).State = EntityState.Deleted;
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
