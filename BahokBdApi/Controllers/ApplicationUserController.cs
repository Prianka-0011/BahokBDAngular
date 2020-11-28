using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using BahokBdApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace BahokBdApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationUserController : ControllerBase
    {
        private UserManager<IdentityUser> _userManager { get; set; }
        private SignInManager<IdentityUser> _signInManager { get; set; }
        private readonly ApplicationSettions _appsettings;
        public ApplicationUserController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, IOptions<ApplicationSettions> appSettings)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _appsettings = appSettings.Value;
        }
        [HttpPost]
        [Route("Register")]
        public async Task<object> PostApplicationUser(ApplicationUser model)
        {
            var appUser = new IdentityUser()
            {
                UserName = model.UserName,
                Email = model.Email,
                PhoneNumber = model.Phone,

            };
            try
            {
                var result = await _userManager.CreateAsync(appUser, model.Password);
                return Ok(result);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        [HttpPost]
        [Route("Login")]
        //POST: /api/ApplicationUser/Login
        public async Task<IActionResult> Login(LoginModel model)
        {
            var user = await _userManager.FindByNameAsync(model.UserName);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserId",user.Id.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appsettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)

                };
                var tokenHandlar = new JwtSecurityTokenHandler();
                var securityToken = tokenHandlar.CreateToken(tokenDescriptor);
                var token = tokenHandlar.WriteToken(securityToken);
                return Ok(new { token });
            }
            else
            {
                return BadRequest(new { Message = "UserName or Password Incorrect" });
            }
        }
    }
}
