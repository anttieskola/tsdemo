using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace tsdemo.logic.Entity
{
    public class Status
    {
        public int id { get; set; }
        public bool Complete { get; set; }
        public string Notes { get; set; }
        public int ProductId { get; set; }
        [JsonIgnore]
        public virtual Product Product { get; set; }
        public int OperationId { get; set; }
        [JsonIgnore]
        public virtual Operation Operation { get; set; }
    }
}
