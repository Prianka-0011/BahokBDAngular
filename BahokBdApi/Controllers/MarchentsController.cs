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
    public class MarchentsController : ControllerBase
    {
        private readonly AuthenticationContext _context;

        public MarchentsController(AuthenticationContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<BankBranch>> GetPaymentType(Guid id)
        {
            var paymentType = await _context.BankBranchs.FindAsync(id);

            if (paymentType == null)
            {
                return NotFound();
            }

            return paymentType;
        }

        // POST: api/Marchents
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<MarchentVm>> PostMarchent(MarchentVm vm)
        {
            Marchent marchent=new Marchent();
            _context.Marchents.Add(marchent);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMarchent", new { id = vm.Id }, vm);
        }


        private bool MarchentExists(Guid id)
        {
            return _context.Marchents.Any(e => e.Id == id);
        }
    }
}
