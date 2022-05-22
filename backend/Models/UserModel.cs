using Backend.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class UserModel
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string RealName { get; set; }
        public string Phone { get; set; }
        public string UserType { get; set; }
    }
}
