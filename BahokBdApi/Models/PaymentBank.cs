using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BahokBdApi.Models
{
    public partial class PaymentBank
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid? TypeId { get; set; }

        public virtual PaymentType Type { get; set; }
    }
}
