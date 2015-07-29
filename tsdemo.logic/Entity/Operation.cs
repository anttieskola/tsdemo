using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace tsdemo.logic.Entity
{
    public class Operation
    {
        public int id { get; set; }
        public string Name { get; set; }
        public int LineId { get; set; }
        [JsonIgnore]
        public virtual Line Line { get; set; }
    }
}
