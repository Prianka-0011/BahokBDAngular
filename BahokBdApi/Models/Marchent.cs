using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BahokBdApi.Models
{
    public partial class Marchent
    {
        public Marchent()
        {
            MarchentPayDetails = new HashSet<MarchentPayDetail>();
        }

        public Guid Id { get; set; }
        public string FullName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Image { get; set; }
        public string Logo { get; set; }
        public string Phone { get; set; }
        public int? Status { get; set; }
        public string BusinessName { get; set; }
        public string BusinessLink { get; set; }
        public string BusinessAddress { get; set; }
        public string AccountName { get; set; }
        public string AccountNumber { get; set; }
        public DateTime? CreateDateTime { get; set; }
        public string LastIpAddress { get; set; }

        public virtual ICollection<MarchentPayDetail> MarchentPayDetails { get; set; }
    }
}
