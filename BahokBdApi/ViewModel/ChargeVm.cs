using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BahokBdApi.ViewModel
{
    public class ChargeVm
    {
        public Guid Id { get; set; }
        public string Location { get; set; }
        public string BaseCharge { get; set; }
        public string IncreaseChargePerKg { get; set; }
    }
}
