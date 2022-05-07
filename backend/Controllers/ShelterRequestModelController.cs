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
        private readonly IShelterRequestModelService _ShelterRequestService;
        public ShelterRequestModelController(IUserModelService userService, IShelterRequestModelService ShelterRequestService)
        {
            _userService = userService;
            _ShelterRequestService = ShelterRequestService;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<ShelterRequestModel>>> GetShelterRequests()
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
            return await _ShelterRequestService.GetAll();
        }

        [HttpGet("{id:int}")]
        [Authorize]
        public async Task<ActionResult<ShelterRequestModel>> GetShelterRequestById(int id)
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
            return await _ShelterRequestService.Get(id);
        }


        [HttpPost]
        [Authorize]
        public async Task<ActionResult<ShelterRequestModel>> PostShelterRequest()
        {
            var username = HttpContext.User.FindFirst("preferred_username")?.Value;
            var request = HttpContext.Request;
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
            string requestBodyString;
            try
            {
                request.EnableBuffering();
                var buffer = new byte[Convert.ToInt32(request.ContentLength)];
                await request.Body.ReadAsync(buffer, 0, buffer.Length);
                requestBodyString = Encoding.UTF8.GetString(buffer);
            }
            finally
            {
                request.Body.Position = 0;
            }
            var ShelterRequestModel = JsonSerializer.Deserialize<ShelterRequestModel>(requestBodyString);

            await _ShelterRequestService.Add(ShelterRequestModel);
            return ShelterRequestModel;
        }


        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<ActionResult<ShelterRequestModel>> DeleteShelterRequest(int id)
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
            var request = await _ShelterRequestService.Get(id);
            await _ShelterRequestService.Delete(id);
            return request;
        }
    }
}
