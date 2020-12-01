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
        public  DbSet<PaymentType> PaymentTypes { get; set; }
    }
}
