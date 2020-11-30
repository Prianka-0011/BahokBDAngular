using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BahokBdApi.Data;
using BahokBdApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BahokBdApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentTypesProbController : ControllerBase
    {
        private readonly AuthenticationContext _context;

        public PaymentTypesProbController(AuthenticationContext context)
        {
            _context = context;
        }
        [HttpPost]
        [Route("postPayment")]
        public async Task<ActionResult<PaymentType>> PostPaymentType(PaymentType paymentType)
        {
            _context.PaymentTypes.Add(paymentType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPaymentType", new { id = paymentType.Id }, paymentType);
        }
    }
}
