using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using System.Threading.Tasks;
using Backend.Data;
using backend.Data.Services;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using backend.Data;
using Microsoft.AspNetCore.Authorization;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserModelController : ControllerBase
    {
        private readonly IUserModelService _service;
        public UserModelController(IUserModelService service)
        {
            _service = service;
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<UserModel>> SaveUser()
        {
            var claims = HttpContext.User;
            UserModel userModel = new()
            {
                RealName = "bossu",
                Username = claims.FindFirst("preferred_username")?.Value,
                UserType = "labagiu"
            };
            await _service.Add(userModel);
            return userModel;
        }
    }
}
