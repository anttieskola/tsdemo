using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace tsdemo.logic.Entity
{
    /// <summary>
    /// For many-many relationship between product and line
    /// </summary>
    public class ProductLine
    {
        public int ProductId { get; set; }
        [JsonIgnore]
        public virtual Product Product { get; set; }
        public int LineId { get; set; }
        [JsonIgnore]
        public virtual Line Line { get; set; }
    }
}
