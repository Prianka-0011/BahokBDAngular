using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BahokBdApi.Data;
using BahokBdApi.Models;

namespace BahokBdApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentTypesController : ControllerBase
    {
        private readonly AuthenticationContext _context;

        public PaymentTypesController(AuthenticationContext context)
        {
            _context = context;
        }

        // GET: api/PaymentTypes
        [HttpGet]
        [Route("GetPayment")]
        public async Task<ActionResult<IEnumerable<PaymentType>>> GetPaymentTypes()
        {
            return await _context.PaymentTypes.ToListAsync();
        }

        // GET: api/PaymentTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PaymentType>> GetPaymentType(Guid id)
        {
            var paymentType = await _context.PaymentTypes.FindAsync(id);

            if (paymentType == null)
            {
                return NotFound();
            }

            return paymentType;
        }

        // PUT: api/PaymentTypes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        [Route("putpayment")]
        public async Task<IActionResult> PutPaymentType(Guid id, PaymentType paymentType)
        {
            if (id != paymentType.Id)
            {
                return BadRequest();
            }

            _context.Entry(paymentType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaymentTypeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/PaymentTypes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        
        public async Task<ActionResult<PaymentType>> PostPaymentType(PaymentType paymentType)
        {
            _context.PaymentTypes.Add(paymentType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPaymentType", new { id = paymentType.Id }, paymentType);
        }

        // DELETE: api/PaymentTypes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PaymentType>> DeletePaymentType(Guid id)
        {
            var paymentType = await _context.PaymentTypes.FindAsync(id);
            if (paymentType == null)
            {
                return NotFound();
            }

            _context.PaymentTypes.Remove(paymentType);
            await _context.SaveChangesAsync();

            return paymentType;
        }

        private bool PaymentTypeExists(Guid id)
        {
            return _context.PaymentTypes.Any(e => e.Id == id);
        }
    }
}
