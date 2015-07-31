using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using tsdemo.logic.Dal;
using tsdemo.logic.Entity;
using Microsoft.Data.Entity.ChangeTracking;
using Microsoft.Data.Entity;

namespace tsdemo.ui.Controllers
{
    [Route("api/[controller]")]
    public class OperationsController : Controller
    {
        private AssemblyContext _context;
        public OperationsController(AssemblyContext context)
        {
            _context = context;
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<Operation> Get()
        {
            return _context.Operations.ToList();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Operation Get(int id)
        {
            return _context.Operations.FirstOrDefault(o => o.id == id);
        }

        // POST api/values
        [HttpPost]
        public async Task<Operation> Post([FromBody]Operation value)
        {
            if (ModelState.IsValid)
            {
                EntityEntry<Operation> ee = _context.Operations.Add(value);
                await _context.SaveChangesAsync();
                return ee.Entity;
            }
            return null;
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task<Operation> Put(int id, [FromBody]Operation value)
        {
            if (ModelState.IsValid)
            {
                _context.Entry<Operation>(value).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return value;
            }
            return null;
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(int id)
        {
            var operation =  await _context.Operations.FirstOrDefaultAsync(o => o.id == id);
            if (operation != null)
            {
                _context.Entry<Operation>(operation).State = EntityState.Deleted;
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
