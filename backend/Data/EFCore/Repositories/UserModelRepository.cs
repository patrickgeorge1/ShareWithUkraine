using backend.Data.EFCore;
using Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Data.EFCore
{
    public class UserModelRepository : RepositoryBase<UserModel>, IUserModelRepository
    {
        public UserModelRepository(BackendContext context) : base(context)
        {

        }
        // We can add new methods specific to the users repository here in the future

    }
}
