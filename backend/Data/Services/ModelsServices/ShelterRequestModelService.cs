using backend.Data.EFCore;
using backend.Data.Services.Interfaces;
using Backend.Data;
using Backend.Data.EFCore;
using Backend.Models;
using System.Threading.Tasks;

namespace backend.Data.Services
{
    public class ShelterRequestModelService : ServiceBase<ShelterRequestModel>, IShelterRequestModelService
    {

        public ShelterRequestModelService(IShelterRequestModelRepository ShelterRequestsRepo)
            : base(ShelterRequestsRepo)
        { }
    }
}
