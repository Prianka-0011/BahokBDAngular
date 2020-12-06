using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BahokBdApi.Models
{
    public partial class MarchentCharge
    {
        public Guid Id { get; set; }
        public Guid? MarchentId { get; set; }
        public string Location { get; set; }
        public decimal? BaseCharge { get; set; }
        public decimal? IncreaseChargePerKg { get; set; }
        public Guid? ChargeId { get; set; }
    }
}
