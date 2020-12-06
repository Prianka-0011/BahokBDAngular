using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BahokBdApi.Models
{
    public partial class Charge
    {
        public Guid Id { get; set; }
        public string Location { get; set; }
        public decimal? BaseCharge { get; set; }
        public decimal? IncreaseChargePerKg { get; set; }
    }
}
