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
    public class LinesController : Controller
    {
        private AssemblyContext _context;

        /// <summary>
        /// Automatic dependency injection
        /// </summary>
        /// <param name="context"></param>
        public LinesController(AssemblyContext context)
        {
            _context = context;
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<Line> Get()
        {
            return _context.Lines.ToList();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Line Get(int id)
        {
            return _context.Lines.FirstOrDefault(l => l.id == id);
        }

        // POST api/values
        [HttpPost]
        public async Task<Line> Post([FromBody]Line line)
        {
            EntityEntry<Line> ee = _context.Lines.Add(line);
            await _context.SaveChangesAsync();
            return ee.Entity;
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task<Line> Put(int id, [FromBody]Line value)
        {
            var current = _context.Lines.FirstOrDefault(l => l.id == id);
            if (current != null)
            {
                current.Name = value.Name;
                await _context.SaveChangesAsync();
                return current;
            }
            return null;
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(int id)
        {
            var line = _context.Lines.FirstOrDefault(l => l.id == id);
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
