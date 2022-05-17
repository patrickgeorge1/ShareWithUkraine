using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using System.Threading.Tasks;
using Backend.Data;
using backend.Data.Services;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using backend.Data;
using Microsoft.AspNetCore.Authorization;
using backend.Models;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserModelService _service;
        public UserController(IUserModelService service)
        {
            _service = service;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<UserModel>> GetCurrentUser()
        {
            var username = HttpContext.User.FindFirst("preferred_username")?.Value;
            var userId = await _service.GetByUsername(username);
            if (userId != -1)
            {
                return await _service.Get(userId);
            }
            else
            {
                UserModel userModel = new()
                {
                    RealName = HttpContext.User.FindFirst("name")?.Value,
                    Username = username
                };
                return await _service.Add(userModel);
            }
        }

        [HttpPut]
        [Authorize]
        public async Task<ActionResult<UserModel>> UpdateCurrentUser([FromBody] UserInfoModel userInfoModel)
        {
            var username = HttpContext.User.FindFirst("preferred_username")?.Value;
            var userId = await _service.GetByUsername(username);
            UserModel userModel;
            if (userId != -1)
            {
                userModel = await _service.Get(userId);
                userModel.UserType = userInfoModel.UserType;
                userModel.Phone = userInfoModel.Phone;
                return await _service.Update(userModel);
            }
            else
            {
                userModel = new()
                {
                    RealName = HttpContext.User.FindFirst("name")?.Value,
                    Username = username,
                    UserType = userInfoModel.UserType,
                    Phone = userInfoModel.Phone              
                };
                return await _service.Add(userModel);
            }
        }
    }
}
