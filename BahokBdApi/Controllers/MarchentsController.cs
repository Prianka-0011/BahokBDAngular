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
using System.IO;
using System.Net.Http.Headers;

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
        [HttpPost, DisableRequestSizeLimit]
        public IActionResult PostMarchent()
        {
            try
            {
                Marchent marchent = new Marchent();
                MarchentPayDetail marchentDetail = new MarchentPayDetail();
                var image = Request.Form.Files[0];
                var logo = Request.Form.Files[1];
                string uniqueFileNameForImage = null;
                string uniqueFileNameForLogo = null;
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                var imgFileName = ContentDispositionHeaderValue.Parse(image.ContentDisposition).FileName.Trim('"');
                uniqueFileNameForImage= Guid.NewGuid().ToString() + "_" + imgFileName;
                var imgFullPath = Path.Combine(pathToSave, uniqueFileNameForImage);
                var logoFileName = ContentDispositionHeaderValue.Parse(image.ContentDisposition).FileName.Trim('"');
                uniqueFileNameForLogo = Guid.NewGuid().ToString() + "_" + logoFileName;
                var logoFullPath = Path.Combine(pathToSave, uniqueFileNameForLogo);
                //var dbPath = Path.Combine(folderName, uniqueFileNameForImage);
                using (var stream = new FileStream(logoFullPath, FileMode.Create))
                {
                    logo.CopyTo(stream);
                }
                using (var stream1 = new FileStream(imgFullPath, FileMode.Create))
                {
                    logo.CopyTo(stream1);
                }
                marchent.Image = imgFullPath;
                marchent.Logo = logoFullPath;
                marchent.FullName = Request.Form["FullName"];
                marchent.UserName = Request.Form["UserName"];
                marchent.Email = Request.Form["Email"];
                marchent.Phone= Request.Form["Phone"];
                marchent.BusinessName = Request.Form["BusinessName"];
                marchent.BusinessLink = Request.Form["BusinessLink"];
                marchent.BusinessAddress = Request.Form["BusinessAddress"];
                marchent.AccountName = Request.Form["AccountName"];
                marchent.AccountNumber = Request.Form["AccountNumber"];
                marchent.Password = "1234";
                marchent.CreateDateTime = DateTime.Now;
                marchent.Status = 0;
                marchent.LastIpAddress="2GH";
                _context.Marchents.Add(marchent);
                
                marchentDetail.MarchentId = marchent.Id;
                marchentDetail.PayTypeId = Guid.Parse(Request.Form["PayTypeId"]);
                marchentDetail.PayBankId = Guid.Parse(Request.Form["PayBankId"]);
                marchentDetail.BranchId = Guid.Parse(Request.Form["BranchId"]);
                marchentDetail.RoutingName = Request.Form["RoutingName"];
                _context.MarchentPayDetails.Add(marchentDetail);
                _context.SaveChanges();
                return Ok(new { marchent });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
            
        }


        private bool MarchentExists(Guid id)
        {
            return _context.Marchents.Any(e => e.Id == id);
        }
    }
}
