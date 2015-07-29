using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using tsdemo.logic.Dal;
using tsdemo.logic.Entity;
using Microsoft.Data.Entity.ChangeTracking;
using Microsoft.Data.Entity;
//using tsdemo.logic.Entity;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace tsdemo.ui.Controllers
{
    [Route("api/[controller]")]
    public class ProductsController : Controller
    {
        private AssemblyContext _context;

        /// <summary>
        /// Automatic dependency injection
        /// </summary>
        /// <param name="context"></param>
        public ProductsController(AssemblyContext context)
        {
            _context = context;
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<Product> Get()
        {
            return _context.Products.Include(p => p.Lines).ToList();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public Product Get(int id)
        {
            return _context.Products.Include(p => p.Lines).FirstOrDefault(p => p.id == id);
        }

        // POST api/values, Create
        [HttpPost]
        public async Task<Product> Post([FromBody]Product p)
        {
            EntityEntry<Product> ee = _context.Entry<Product>(p);
            ee.State = EntityState.Added;
            await _context.SaveChangesAsync();
            return ee.Entity;
        }

        // PUT api/values/5, Update
        [HttpPut("{id}")]
        public async Task<Product> Put(int id, [FromBody]Product value)
        {
            var current = _context.Products.Include(p => p.Lines).FirstOrDefault(p => p.id == id);
            if (current != null)
            {
                current.Name = value.Name;
                foreach (var item in current.Lines)
                {
                    if (!foundIn(value.Lines, item))
                    {
                        _context.Entry<ProductLine>(item).State = EntityState.Deleted;
                    }
                }
                foreach (var item in value.Lines)
                {
                    if (!foundIn(current.Lines, item))
                    {
                        _context.Entry<ProductLine>(item).State = EntityState.Added;
                    }
                }
                await _context.SaveChangesAsync();
                return current;
            }
            return null;
        }

        private bool foundIn(IEnumerable<ProductLine> list, ProductLine pl)
        {
            foreach (var item in list)
            {
                if (item.LineId == pl.LineId && item.ProductId == pl.ProductId)
                {
                    return true;
                }
            }
            return false;
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(int id)
        {
            var product = _context.Products.FirstOrDefault(p => p.id == id);
            if (product != null)
            {
                _context.Entry<Product>(product).State = EntityState.Deleted;
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
