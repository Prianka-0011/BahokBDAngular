using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BahokBdApi.Models
{
    public partial class MarchentPayDetail
    {
        public Guid Id { get; set; }
        public Guid? MarchentId { get; set; }
        public Guid? PayTypeId { get; set; }
        public Guid? PayBankId { get; set; }
        public Guid? BranchId { get; set; }
        public string RoutingName { get; set; }

        public virtual Marchent Marchent { get; set; }
    }
}
