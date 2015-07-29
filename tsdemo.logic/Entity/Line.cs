using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace tsdemo.logic.Entity
{
    public class Line
    {
        public int id { get; set; }
        public string Name { get; set; }
        public ICollection<ProductLine> Products { get; set; }
        public ICollection<Operation> Operations { get; set; }
    }
}
