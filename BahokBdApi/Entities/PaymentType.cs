using System;
using System.Collections.Generic;

#nullable disable

namespace BahokBdApi.Entities
{
    public partial class PaymentType
    {
        public Guid Id { get; set; }
        public string Type { get; set; }
        public bool? Satus { get; set; }
    }
}
