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
using System.IO;
using System;
using System.Text;
using System.Text.Json;
using System.Collections.Generic;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShelterRequestModelController : ControllerBase
    {
        private readonly IUserModelService _userService;
        private readonly IShelterRequestModelService _shelterRequestService;
        public ShelterRequestModelController(IUserModelService userService, IShelterRequestModelService ShelterRequestService)
        {
            _userService = userService;
            _shelterRequestService = ShelterRequestService;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<ShelterRequestModel>>> GetshelterRequests()
        {
            var username = HttpContext.User.FindFirst("preferred_username")?.Value;
            var userId = await _userService.GetByUsername(username);
            if (userId == -1)
            {
                UserModel userModel = new()
                {
                    RealName = "bossu",
                    Username = username,
                    UserType = "labagiu"
                };
                await _userService.Add(userModel);
                userId = await _userService.GetByUsername(username);
            }
            return await _shelterRequestService.GetAll();
        }

        [HttpGet("{id:int}")]
        [Authorize]
        public async Task<ActionResult<ShelterRequestModel>> GetShelterRequestById(int id)
        {
            var username = HttpContext.User.FindFirst("preferred_username")?.Value;
            var userId = await _userService.GetByUsername(username);
            if (userId == -1)
            {
                UserModel userModel = new()
                {
                    RealName = "bossu",
                    Username = username,
                    UserType = "labagiu"
                };
                await _userService.Add(userModel);
            }
            return await _shelterRequestService.Get(id);
        }


        [HttpPost]
        [Authorize]
        public async Task<ActionResult<ShelterRequestModel>> PostShelterRequest([FromBody] ShelterRequestModel ShelterRequestModel)
        {
            var username = HttpContext.User.FindFirst("preferred_username")?.Value;
            var userId = await _userService.GetByUsername(username);
            if (userId == -1)
            {
                UserModel userModel = new()
                {
                    RealName = "bossu",
                    Username = username,
                    UserType = "labagiu"
                };
                await _userService.Add(userModel);
            }
            ShelterRequestModel.RefugeeId = userId;
            return await _shelterRequestService.Add(ShelterRequestModel);
        }

        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<ActionResult<ShelterRequestModel>> DeleteShelterRequest(int id)
        {
            var username = HttpContext.User.FindFirst("preferred_username")?.Value;
            var userId = await _userService.GetByUsername(username);
            if (userId == -1)
            {
                UserModel userModel = new()
                {
                    RealName = "bossu",
                    Username = username,
                    UserType = "labagiu"
                };
                await _userService.Add(userModel);
            }
            var request = await _shelterRequestService.Get(id);
            await _shelterRequestService.Delete(id);
            return request;
        }
    }
}
