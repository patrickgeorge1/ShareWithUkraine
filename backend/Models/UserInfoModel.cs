using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class UserInfoModel
    {
        [StringLength(15, MinimumLength = 10)]
        public string Phone { get; set; }
        public string UserType { get; set; }
    }
}
