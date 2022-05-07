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
    public class TransportRequestModelController : ControllerBase
    {
        private readonly IUserModelService _userService;
        private readonly ITransportRequestModelService _TransportRequestService;
        public TransportRequestModelController(IUserModelService userService, ITransportRequestModelService TransportRequestService)
        {
            _userService = userService;
            _TransportRequestService = TransportRequestService;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<TransportRequestModel>>> GetTransportRequests()
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
            return await _TransportRequestService.GetAll();
        }

        [HttpGet("{id:int}")]
        [Authorize]
        public async Task<ActionResult<TransportRequestModel>> GetTransportRequestById(int id)
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
            return await _TransportRequestService.Get(id);
        }


        [HttpPost]
        [Authorize]
        public async Task<ActionResult<TransportRequestModel>> PostTransportRequest()
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
            var TransportRequestModel = JsonSerializer.Deserialize<TransportRequestModel>(requestBodyString);

            await _TransportRequestService.Add(TransportRequestModel);
            return TransportRequestModel;
        }


        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<ActionResult<TransportRequestModel>> DeleteTransportRequest(int id)
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
            var request = await _TransportRequestService.Get(id);
            await _TransportRequestService.Delete(id);
            return request;
        }
    }
}
