using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BahokBdApi.Models
{
    public partial class PaymentBank
    {
        public PaymentBank()
        {
            BankBranches = new HashSet<BankBranch>();
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid? TypeId { get; set; }

        public virtual PaymentType Type { get; set; }
        public virtual ICollection<BankBranch> BankBranches { get; set; }
    }
}
