using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Npgsql;
using Backend.Data.EFCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using backend.Data.Services;
using Backend.Models;
using backend.Data;
using System;
using System.Collections.Generic;
using backend.Data.EFCore;
using backend.Data.EFCore.Repositories;
using backend.Data.Services.Interfaces;

namespace Backend
{
    public class Startup
    {
        private const string AllowSpecificOrigins = nameof(AllowSpecificOrigins);
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.Authority = Configuration["Jwt:Authority"];
                Console.WriteLine("mone_iulian");

                Console.WriteLine(Configuration["Jwt:Authority"]);
                options.TokenValidationParameters = new() { ValidateIssuer = false };
                options.Audience = Configuration["Jwt:Audience"];
                options.RequireHttpsMetadata = false;
                options.Events = new JwtBearerEvents()
                {
                    OnAuthenticationFailed = c =>
                    {
                        c.NoResult();

                        c.Response.StatusCode = 403;
                        c.Response.ContentType = "text/plain";
                        if (Environments.Development.Equals("Development"))
                        {
                            return c.Response.WriteAsync(c.Exception.ToString());
                        }
                        return c.Response.WriteAsync("An error occured processing your authentication.");
                    }
                };
            });

            var origins = new List<string>()
            {
                "http://host.docker.internal:3000",
                "http://host.docker.internal:8080"
            };
            services.AddCors(options =>
            {
                options.AddPolicy(name: AllowSpecificOrigins,
                    builder =>
                    {
                        builder.WithOrigins(origins.ToArray());
                        builder.WithMethods("*");
                        builder.WithHeaders("*");
                        builder.AllowCredentials();
                        builder.SetPreflightMaxAge(TimeSpan.FromDays(2));
                    });
            });
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebApplication1", Version = "v1" });
            });

            services.AddControllersWithViews().AddNewtonsoftJson(options =>
            options.SerializerSettings.ReferenceLoopHandling=Newtonsoft.Json.ReferenceLoopHandling.Ignore)
                .AddNewtonsoftJson(options => options.SerializerSettings.ContractResolver
                = new DefaultContractResolver());

            services.AddDbContext<BackendContext>(options =>
                    options.UseNpgsql(Configuration.GetConnectionString("backendContext")));

            services.AddTransient<IUserModelService, UserService>();
            services.AddTransient<IUserModelRepository, UserModelRepository>();

            services.AddTransient<IHandshakeService, HandshakeService>();
            services.AddTransient<IHandshakeModelRepository, HandshakeModelRepository>();

            services.AddTransient<ITransportRequestService, TransportRequestService>();
            services.AddTransient<ITransportRequestModelRepository, TransportRequestModelRepository>();

            services.AddTransient<IShelterRequestService, ShelterRequestService>();
            services.AddTransient<IShelterRequestModelRepository, ShelterRequestModelRepository>();

            services.AddTransient<IGoodsRequestService, GoodsRequestService>();
            services.AddTransient<IGoodsRequestModelRepository, GoodsRequestModelRepository>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            //Enable CORS
            app.UseCors(AllowSpecificOrigins);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebApplication1 v1"));
            }

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
