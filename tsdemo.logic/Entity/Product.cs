using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace tsdemo.logic.Entity
{
    public class Product
    {
        public int id{ get; set; }
        public string Name { get; set; }
        public ICollection<ProductLine> Lines { get; set; }
    }
}
