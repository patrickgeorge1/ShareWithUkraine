using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Data
{
    public class BackendContext : DbContext
    {
        public BackendContext (DbContextOptions<BackendContext> options)
            : base(options)
        {
        }

        public DbSet<Backend.Models.UserModel> Users { get; set; }
        public DbSet<Backend.Models.TransportRequestModel> TransportRequests { get; set; }
        public DbSet<Backend.Models.ShelterRequestModel> ShelterRequests { get; set; }
        public DbSet<Backend.Models.GoodsRequestModel> GoodsRequests { get; set; }
    }
}
