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
    public class ChargesController : ControllerBase
    {
        private readonly AuthenticationContext _context;

        public ChargesController(AuthenticationContext context)
        {
            _context = context;
        }

        // GET: api/Charges
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Charge>>> GetCharges()
        {
            return await _context.Charges.ToListAsync();
        }

        // GET: api/Charges/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Charge>> GetCharge(Guid id)
        {
            var charge = await _context.Charges.FindAsync(id);

            if (charge == null)
            {
                return NotFound();
            }

            return charge;
        }

        // PUT: api/Charges/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCharge(Guid id, Charge charge)
        {
            if (id != charge.Id)
            {
                return BadRequest();
            }

            _context.Entry(charge).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChargeExists(id))
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

        // POST: api/Charges
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Charge>> PostCharge(Charge charge)
        {
            _context.Charges.Add(charge);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCharge", new { id = charge.Id }, charge);
        }

        // DELETE: api/Charges/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Charge>> DeleteCharge(Guid id)
        {
            var charge = await _context.Charges.FindAsync(id);
            if (charge == null)
            {
                return NotFound();
            }

            _context.Charges.Remove(charge);
            await _context.SaveChangesAsync();

            return charge;
        }

        private bool ChargeExists(Guid id)
        {
            return _context.Charges.Any(e => e.Id == id);
        }
    }
}
