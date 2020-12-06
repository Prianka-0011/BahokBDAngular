using BahokBdApi.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BahokBdApi.Data
{
    public class AuthenticationContext:IdentityDbContext
    {
        public AuthenticationContext(DbContextOptions options):base(options)
        {

        }
        public virtual DbSet<BankBranch> BankBranchs { get; set; }
        public virtual DbSet<Charge> Charges { get; set; }
        public virtual DbSet<Marchent> Marchents { get; set; }
        public virtual DbSet<MarchentCharge> MarchentCharges { get; set; }
        public virtual DbSet<MarchentPayDetail> MarchentPayDetails { get; set; }
        public virtual DbSet<PaymentBank> PaymentBanks { get; set; }
        public virtual DbSet<PaymentType> PaymentTypes { get; set; }
    }
}
