using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BahokBdApi.Models
{
    public partial class PaymentType
    {
        public Guid Id { get; set; }
        public string Type { get; set; }
        public bool? Satus { get; set; }
    }
}
