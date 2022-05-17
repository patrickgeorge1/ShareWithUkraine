using backend.Data.EFCore;
using backend.Data.Services.Interfaces;
using Backend.Data;
using Backend.Data.EFCore;
using Backend.Models;
using System.Threading.Tasks;

namespace backend.Data.Services
{
    public class TransportRequestService : ServiceBase<TransportRequestModel>, ITransportRequestService
    {

        public TransportRequestService(ITransportRequestModelRepository transportRequestsRepo)
            : base(transportRequestsRepo)
        { }
    }
}
