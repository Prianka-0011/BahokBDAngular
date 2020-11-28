using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BahokBdApi.Data;
using BahokBdApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace BahokBdApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<ApplicationSettions>(Configuration.GetSection("ApplicationSettions"));
            services.AddControllers();
            services.AddDbContext<AuthenticationContext>(options => options.UseSqlServer(Configuration.GetConnectionString("BahokDbConn")));
            services.AddIdentity<IdentityUser, IdentityRole>(options => options.SignIn.RequireConfirmedAccount = true)
                .AddEntityFrameworkStores<AuthenticationContext>();
            services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.Password.RequiredLength = 4;
                //  options.Lockout.AllowedForNewUsers = true;
                //options.SignIn.RequireConfirmedEmail = false;
            });
            services.AddCors();

            //JWT Authentication
            var key = Encoding.UTF8.GetBytes(Configuration["ApplicationSettions:JWT_Secret"].ToString());//Ancoding=using System.Text;
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = false;
                x.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = false,
                    IssuerSigningKey = new SymmetricSecurityKey(key),//using Microsoft.IdentityModel.Tokens;
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                };
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseHttpsRedirection();
            app.Use(async (ctx, next) =>
            {
                await next();
                if (ctx.Response.StatusCode == 204)
                {
                    ctx.Response.ContentLength = 0;
                }
            });
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }


            app.UseCors(builder =>
         builder.WithOrigins("http://localhost:44301")
         .AllowAnyHeader()
         .AllowAnyMethod()

         );

            app.UseAuthentication();
            app.UseRouting();

            app.UseAuthorization();
            app.UseAuthentication();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
