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
        [HttpGet]
        public System.Object GetMarchent()
        {
            var result = _context.Marchents.ToList();
            return result;
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
                //var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(@"D:\.netProject\BahokBD\BahokBDClient\ClientApp\src\assets\images");

                var imgFileName = ContentDispositionHeaderValue.Parse(image.ContentDisposition).FileName.Trim('"');
                uniqueFileNameForImage= Guid.NewGuid().ToString() + "_" + imgFileName;
                var imgFullPath = Path.Combine(pathToSave, uniqueFileNameForImage);
                var logoFileName = ContentDispositionHeaderValue.Parse(logo.ContentDisposition).FileName.Trim('"');
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
                marchent.Image = uniqueFileNameForImage;
                marchent.Logo = uniqueFileNameForLogo;
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
                var typeId = "beb41e1a-93aa-4745-8fa8-08d899fbb4b9";
                Guid payTypeId = Guid.Parse(Request.Form["PayTypeId"]);
                if (payTypeId == Guid.Parse(typeId))
                {
                    marchentDetail.MarchentId = marchent.Id;
                    marchentDetail.PayTypeId = Guid.Parse(Request.Form["PayTypeId"]);
                    marchentDetail.PayBankId = Guid.Parse(Request.Form["PayBankId"]);
                    marchentDetail.BranchId = Guid.Parse(Request.Form["BranchId"]);
                    marchentDetail.RoutingName = Request.Form["RoutingName"];
                    _context.MarchentPayDetails.Add(marchentDetail);
                }
                else
                {
                    marchentDetail.MarchentId = marchent.Id;
                    marchentDetail.PayTypeId = Guid.Parse(Request.Form["PayTypeId"]);
                    marchentDetail.PayBankId = Guid.Parse(Request.Form["PayBankId"]);

                }
                _context.SaveChanges();
                ImageLogoDbPath dbPath = new ImageLogoDbPath();
                dbPath.ImageDbPath=  uniqueFileNameForImage;
                dbPath.LogoDbPath=  uniqueFileNameForLogo;
                return Ok(new{ dbPath});
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
            
        }
        [HttpPost, DisableRequestSizeLimit]
        public IActionResult PutMarchent()
        {
            try
            {
                Marchent marchent = _context.Marchents.Find(Request.Form["Id"]);
                
                MarchentPayDetail marchentDetail = new MarchentPayDetail();
                var image = Request.Form.Files[0];
                var logo = Request.Form.Files[1];
                string uniqueFileNameForImage = null;
                string uniqueFileNameForLogo = null;
                var pathToSave = Path.Combine(@"D:\.netProject\BahokBD\BahokBDClient\ClientApp\src\assets\images");
                if (image!=null)
                {
                  
                    var imgFileName = ContentDispositionHeaderValue.Parse(image.ContentDisposition).FileName.Trim('"');
                    uniqueFileNameForImage = Guid.NewGuid().ToString() + "_" + imgFileName;
                    var imgFullPath = Path.Combine(pathToSave, uniqueFileNameForImage);
                    using (var stream1 = new FileStream(imgFullPath, FileMode.Create))
                    {
                        image.CopyTo(stream1);
                    }
                    marchent.Image = uniqueFileNameForImage;
                }
                if (logo!=null)
                {
                    var logoFileName = ContentDispositionHeaderValue.Parse(logo.ContentDisposition).FileName.Trim('"');
                    uniqueFileNameForLogo = Guid.NewGuid().ToString() + "_" + logoFileName;
                    var logoFullPath = Path.Combine(pathToSave, uniqueFileNameForLogo);
                    //var dbPath = Path.Combine(folderName, uniqueFileNameForImage);
                    using (var stream = new FileStream(logoFullPath, FileMode.Create))
                    {
                        logo.CopyTo(stream);
                    }
                    marchent.Logo = uniqueFileNameForLogo;
                }
                
                
                marchent.FullName = Request.Form["FullName"];
                marchent.UserName = Request.Form["UserName"];
                marchent.Email = Request.Form["Email"];
                marchent.Phone = Request.Form["Phone"];
                marchent.BusinessName = Request.Form["BusinessName"];
                marchent.BusinessLink = Request.Form["BusinessLink"];
                marchent.BusinessAddress = Request.Form["BusinessAddress"];
                marchent.AccountName = Request.Form["AccountName"];
                marchent.AccountNumber = Request.Form["AccountNumber"];
                marchent.Password = "1234";
                marchent.CreateDateTime = DateTime.Now;
                marchent.Status = 0;
                marchent.LastIpAddress = "2GH";
                _context.Entry(marchent).State = EntityState.Modified;
                var payTypeId = Guid.Parse(Request.Form["PayTypeId"]);
                var payBankId = Guid.Parse(Request.Form["PayBankId"]);
                var branchId = Guid.Parse(Request.Form["BranchId"]);
                marchentDetail.RoutingName = Request.Form["RoutingName"];
                if (payTypeId!=null && payBankId!=null && branchId!=null)
                {
                    var payTypeDetail = _context.MarchentPayDetails.Find(marchent.Id);
                    if (payTypeDetail!=null)
                    {
                        _context.Entry(payTypeDetail).State = EntityState.Modified;
                    }
                    else
                    {
                        _context.MarchentPayDetails.Remove(payTypeDetail);
                        marchentDetail.PayTypeId = Guid.Parse(Request.Form["PayTypeId"]);
                        marchentDetail.PayBankId = Guid.Parse(Request.Form["PayBankId"]);
                        marchentDetail.BranchId = Guid.Parse(Request.Form["BranchId"]);
                        marchentDetail.RoutingName = Request.Form["RoutingName"];
                        _context.MarchentPayDetails.Add(payTypeDetail);
                    }
                }
                _context.SaveChanges();
                ImageLogoDbPath dbPath = new ImageLogoDbPath();
                //dbPath.ImageDbPath= Path.Combine(folderName, uniqueFileNameForImage);
                //dbPath.LogoDbPath= Path.Combine(folderName, uniqueFileNameForLogo);
                return Ok(new { dbPath });
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
