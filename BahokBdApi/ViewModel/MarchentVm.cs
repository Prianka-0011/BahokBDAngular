using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace BahokBdApi.ViewModel
{
    public class MarchentVm
    {
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string BusinessName { get; set; }
        public string BusinessLink { get; set; }
        public string BusinessAddress { get; set; }
        public string AccountName { get; set; }
        public IFormFile Image { get; set; }
        public IFormFile Logo { get; set; }
        public string AccountNumber { get; set; }
        public Guid PayTypeId { get; set; }
        public Guid PayBankId { get; set; }
        public Guid BranchId { get; set; }
        public string RoutingName { get; set; }
    }
}
