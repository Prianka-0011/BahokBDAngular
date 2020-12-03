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
    public class PaymentBanksController : ControllerBase
    {
        private readonly AuthenticationContext _context;

        public PaymentBanksController(AuthenticationContext context)
        {
            _context = context;
        }

        // GET: api/PaymentBanks
        
        [Route("getBank")]
        public System.Object GetPaymentBanks()
        {
            //var result = _context.PaymentBanks.Include(c => c.Type).AsQueryable();
            var result = _context.PaymentBanks.Include(c => c.Type).Select(x => new
            {

                x.Id,
                x.Name,
                Type = x.Type.Type,
                x.TypeId

            }).ToList();

            return result;
        }

        // GET: api/PaymentBanks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PaymentBank>> GetPaymentBank(Guid id)
        {
            var paymentBank = await _context.PaymentBanks.FindAsync(id);

            if (paymentBank == null)
            {
                return NotFound();
            }

            return paymentBank;
        }

        // PUT: api/PaymentBanks/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        [Route("putBank")]
        public async Task<IActionResult> PutPaymentBank(Guid id, PaymentBank paymentBank)
        {
            if (id != paymentBank.Id)
            {
                return BadRequest();
            }

            _context.Entry(paymentBank).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaymentBankExists(id))
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

        // POST: api/PaymentBanks
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        [Route("postBank")]
        public async Task<ActionResult<PaymentBank>> PostPaymentBank(PaymentBank paymentBank)
        {
            _context.PaymentBanks.Add(paymentBank);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPaymentBank", new { id = paymentBank.Id }, paymentBank);
        }

        // DELETE: api/PaymentBanks/5
        [HttpDelete("{id}")]
        [Route("deleteBank")]
        public async Task<ActionResult<PaymentBank>> DeletePaymentBank(Guid id)
        {
            var paymentBank = await _context.PaymentBanks.FindAsync(id);
            if (paymentBank == null)
            {
                return NotFound();
            }

            _context.PaymentBanks.Remove(paymentBank);
            await _context.SaveChangesAsync();

            return paymentBank;
        }

        private bool PaymentBankExists(Guid id)
        {
            return _context.PaymentBanks.Any(e => e.Id == id);
        }
    }
}
