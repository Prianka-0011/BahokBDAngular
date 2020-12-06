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
        //[HttpGet]
        //[Route("getBank")]
        //public System.Object GetPaymentBanks()
        //{
        //    //var result = _context.PaymentBanks.Include(c => c.Type).AsQueryable();
        //    var result = _context.PaymentBanks.Select(x => new
        //    {

        //        x.Id,
        //        x.Name,
        //    }).ToList();


        //    return result;
        //}
        // GET: api/BankBranches
        [HttpGet]
        [Route("getBranch")]
        public System.Object GetBankBranch()
        {
            //var result = _context.PaymentBanks.Include(c => c.Type).AsQueryable();
            var result = _context.BankBranchs.Include(c => c.PaymentBank).Select(x => new
            {

                x.Id,
                x.Name,
                BankName = x.PaymentBank.Name,
                x.PaymentBankId,
               
            }).ToList();

            return result;
        }

        // GET: api/BankBranches/5
        [HttpGet("{id}")]
        public List<BankBranch> GetBankBranch(Guid id)
        {
            var paymentBank = _context.BankBranchs.Where(c => c.PaymentBankId == id).ToList();

            //if (paymentBank == null)
            //{
            //    return NotFound();
            //}

            return paymentBank;
        }

        // PUT: api/BankBranches/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBankBranch(Guid id, BankBranchVm vm)
        {
            if (id != vm.Id)
            {
                return BadRequest();
            }
            BankBranch result = await _context.BankBranchs.FindAsync(vm.Id);
            if (result!=null)
            {
                result.Name = vm.Name;
                result.PaymentBankId = vm.PaymentBankId;
               
            }
            _context.Entry(result).State = EntityState.Modified;

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
        public async Task<ActionResult<BankBranch>> PostBankBranch(BankBranchVm vm)
        {
            BankBranch bankBranch = new BankBranch();
            bankBranch.Name = vm.Name;
            bankBranch.PaymentBankId = vm.PaymentBankId;
            
            _context.BankBranchs.Add(bankBranch);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBankBranch", new { id = vm.Id }, bankBranch);
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
