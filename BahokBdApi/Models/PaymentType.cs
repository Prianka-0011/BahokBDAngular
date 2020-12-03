using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BahokBdApi.Models
{
    public partial class PaymentType
    {
        public PaymentType()
        {
            PaymentBanks = new HashSet<PaymentBank>();
        }

        public Guid Id { get; set; }
        public string Type { get; set; }
        public virtual ICollection<PaymentBank> PaymentBanks { get; set; }
    }
}
