using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BahokBdApi.Models
{
    public partial class BankBranch
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string RoutingName { get; set; }
        public Guid? PaymentBankId { get; set; }

        public virtual PaymentBank PaymentBank { get; set; }
    }
}
