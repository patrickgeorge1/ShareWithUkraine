using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using System.Threading.Tasks;
using Backend.Data;
using backend.Data.Services;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using backend.Data;
using Microsoft.AspNetCore.Authorization;
using backend.Data.Services.Interfaces;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoodsRequestModelController : ControllerBase
    {
        private readonly IUserModelService _userService;
        private readonly IGoodsRequestModelService _goodsRequestService;
        public GoodsRequestModelController(IUserModelService userService, IGoodsRequestModelService goodsRequestService)
        {
            _userService = userService;
            _goodsRequestService = goodsRequestService;
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<GoodsRequestModel>> PostGoodsRequest()
        {
            var username = HttpContext.User.FindFirst("preferred_username")?.Value;
            var userExists = await _userService.GetByUsername(username);
            if (!userExists)
            {
                UserModel userModel = new()
                {
                    RealName = "bossu",
                    Username = username,
                    UserType = "labagiu"
                };
                await _userService.Add(userModel);
            }
            GoodsRequestModel goodsRequestModel = new GoodsRequestModel()
            {
                RefugeeId = 1,
                GoodName = "supa dupa"
            };
            await _goodsRequestService.Add(goodsRequestModel);
            return goodsRequestModel;
        }
    }
}
