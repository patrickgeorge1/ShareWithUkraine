using Backend.Data;
using Backend.Data.EFCore;
using Backend.Models;

namespace backend.Data.EFCore.Repositories
{
    public class ShelterRequestModelRepository : RepositoryBase<ShelterRequestModel>, IShelterRequestModelRepository
    {
        public ShelterRequestModelRepository(BackendContext context) : base(context)
        {

        }
    }
}
