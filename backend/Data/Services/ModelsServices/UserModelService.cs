using backend.Data.EFCore;
using Backend.Data;
using Backend.Data.EFCore;
using Backend.Models;
using System.Threading.Tasks;

namespace backend.Data.Services
{
    public class UserModelService : ServiceBase<UserModel>, IUserModelService
    {

        public UserModelService(IUserModelRepository usersRepo)
            : base(usersRepo)
        { }

        public async Task<bool> GetByUsername(string username)
        {
            var users = await base.GetAll();
            foreach(var user in users)
            {
                if (user.Username == username)
                    return true;
            }
            return false;
        }
    }
}
