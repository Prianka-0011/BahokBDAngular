using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BahokBdApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BahokBdApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationUserController : ControllerBase
    {
        private UserManager<IdentityUser> _userManager { get; set; }
        private SignInManager<IdentityUser> _signInManager { get; set; }
        public ApplicationUserController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
        }
        [HttpGet]
        [Route("Rgister")]
        public async Task<object>PostApplicationUser(ApplicationUser model)
        {
            var appUser = new IdentityUser()
            {
                UserName = model.UserName,
                Email = model.Email,
                PhoneNumber=model.Phone,

            };
            try
            {
                var result =await _userManager.CreateAsync(appUser, model.Password);
                return Ok(result);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
