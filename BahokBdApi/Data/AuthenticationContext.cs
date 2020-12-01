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
        public virtual DbSet<PaymentBank> PaymentBanks { get; set; }
        public virtual DbSet<PaymentType> PaymentTypes { get; set; }
    }
}
