using Backend.Models;
using System.Threading.Tasks;

namespace backend.Data.Services
{
    public interface IUserModelService : IServiceBase<UserModel>
    {
        Task<bool> GetByUsername(string username);
    }
}
