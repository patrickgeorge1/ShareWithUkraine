using Backend.Data;
using Backend.Data.EFCore;
using Backend.Models;

namespace backend.Data.EFCore.Repositories
{
    public class TransportRequestModelRepository : RepositoryBase<TransportRequestModel>, ITransportRequestModelRepository
    {
        public TransportRequestModelRepository(BackendContext context) : base(context)
        {

        }
    }
}
