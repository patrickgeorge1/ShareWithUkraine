using backend.Data.EFCore;
using Backend.Data;
using Backend.Data.EFCore;
using Backend.Models;
using System.Threading.Tasks;

namespace backend.Data.Services
{
    public class UserService : ServiceBase<UserModel>, IUserModelService
    {

        public UserService(IUserModelRepository usersRepo)
            : base(usersRepo)
        { }

        public async Task<int> GetByUsername(string username)
        {
            var users = await base.GetAll();
            foreach(var user in users)
            {
                if (user.Username == username)
                    return user.Id;
            }
            return -1;
        }
    }
}
