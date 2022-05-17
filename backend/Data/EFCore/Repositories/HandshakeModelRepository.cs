using Backend.Data;
using Backend.Data.EFCore;
using Backend.Models;

namespace backend.Data.EFCore.Repositories
{
    public class HandshakeModelRepository : RepositoryBase<HandshakeModel>, IHandshakeModelRepository
    {
        public HandshakeModelRepository(BackendContext context) : base(context)
        {

        }
    }
}
