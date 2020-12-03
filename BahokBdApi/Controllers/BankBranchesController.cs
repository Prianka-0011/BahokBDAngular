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
    public class BankBranchesController : ControllerBase
    {
        private readonly AuthenticationContext _context;

        public BankBranchesController(AuthenticationContext context)
        {
            _context = context;
        }

        // GET: api/BankBranches
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BankBranch>>> GetBankBranchs()
        {
            return await _context.BankBranchs.ToListAsync();
        }

        // GET: api/BankBranches/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BankBranch>> GetBankBranch(Guid id)
        {
            var bankBranch = await _context.BankBranchs.FindAsync(id);

            if (bankBranch == null)
            {
                return NotFound();
            }

            return bankBranch;
        }

        // PUT: api/BankBranches/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBankBranch(Guid id, BankBranch bankBranch)
        {
            if (id != bankBranch.Id)
            {
                return BadRequest();
            }

            _context.Entry(bankBranch).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BankBranchExists(id))
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

        // POST: api/BankBranches
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<BankBranch>> PostBankBranch(BankBranch bankBranch)
        {
            _context.BankBranchs.Add(bankBranch);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBankBranch", new { id = bankBranch.Id }, bankBranch);
        }

        // DELETE: api/BankBranches/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<BankBranch>> DeleteBankBranch(Guid id)
        {
            var bankBranch = await _context.BankBranchs.FindAsync(id);
            if (bankBranch == null)
            {
                return NotFound();
            }

            _context.BankBranchs.Remove(bankBranch);
            await _context.SaveChangesAsync();

            return bankBranch;
        }

        private bool BankBranchExists(Guid id)
        {
            return _context.BankBranchs.Any(e => e.Id == id);
        }
    }
}
