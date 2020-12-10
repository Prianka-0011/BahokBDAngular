using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using BahokBdApi.Data;
using BahokBdApi.Models;
using BahokBdApi.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BahokBdApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MarchentDetailsController : ControllerBase
    {
        private readonly AuthenticationContext _context;

        public MarchentDetailsController(AuthenticationContext context)
        {
            _context = context;
        }
        [HttpPost, DisableRequestSizeLimit]
        public IActionResult EditMarchent()
        {
            try
            {
                Guid Id = Guid.Parse(Request.Form["Id"]);
                Marchent marchent = _context.Marchents.Find(Id);

                MarchentPayDetail marchentDetail = new MarchentPayDetail();
                var image = Request.Form.Files[0];
                var logo = Request.Form.Files[1];
                string uniqueFileNameForImage = null;
                string uniqueFileNameForLogo = null;
                var pathToSave = Path.Combine(@"D:\.netProject\BahokBD\BahokBDClient\ClientApp\src\assets\images");
                if (image != null)
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
                if (logo != null)
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
                if (payTypeId != null && payBankId != null && branchId != null)
                {
                    var payTypeDetail = _context.MarchentPayDetails.Find(marchent.Id);
                    if (payTypeDetail != null)
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

    }
}
