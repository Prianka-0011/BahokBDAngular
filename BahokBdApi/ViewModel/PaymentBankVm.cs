using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BahokBdApi.ViewModel
{
    public class PaymentBankVm
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid? TypeId { get; set; }

        public string Type { get; set; }
    }
}
