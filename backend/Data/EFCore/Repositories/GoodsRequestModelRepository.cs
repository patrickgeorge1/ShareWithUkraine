using Backend.Data;
using Backend.Data.EFCore;
using Backend.Models;

namespace backend.Data.EFCore.Repositories
{
    public class GoodsRequestModelRepository : RepositoryBase<GoodsRequestModel>, IGoodsRequestModelRepository
    {
        public GoodsRequestModelRepository(BackendContext context) : base(context)
        {

        }
    }
}
