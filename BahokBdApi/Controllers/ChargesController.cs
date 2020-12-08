using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BahokBdApi.Data;
using BahokBdApi.Models;
using BahokBdApi.ViewModel;
using Microsoft.AspNetCore.Cors;

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
        public System.Object GetCharges()
        {
            var result = _context.Charges.Select(x => new
            {

                x.Id,
                x.Location,
                BaseCharge = x.BaseCharge.ToString(),
                IncreaseChargePerKg=  x.IncreaseChargePerKg.ToString(),

            }).ToList();

            return result;
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
     
        public async Task<IActionResult> PutCharge(Guid id, ChargeVm vm)
        {
            if (id != vm.Id)
            {
                return BadRequest();
            }
            Charge charge =await _context.Charges.FindAsync(vm.Id);
            charge.Location = vm.Location;
            charge.BaseCharge = Convert.ToDecimal(vm.BaseCharge);
            charge.IncreaseChargePerKg = Convert.ToDecimal(vm.IncreaseChargePerKg);

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
       
        public async Task<ActionResult<ChargeVm>> PostCharge([FromBody] ChargeVm vm)
        {
            Charge charge = new Charge();
            charge.Location = vm.Location;
            charge.BaseCharge= Convert.ToDecimal(vm.BaseCharge);
            charge.IncreaseChargePerKg= Convert.ToDecimal(vm.IncreaseChargePerKg);
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
