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
    public class ShelterRequestController : ControllerBase
    {
        private readonly IUserModelService _userService;
        private readonly IHandshakeService _handshakeService;
        private readonly IShelterRequestService _shelterRequestService;
        public ShelterRequestController(IUserModelService userService, IShelterRequestService ShelterRequestService, IHandshakeService handshakeService)
        {
            _userService = userService;
            _shelterRequestService = ShelterRequestService;
            _handshakeService = handshakeService;
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
                    RealName = HttpContext.User.FindFirst("name")?.Value,
                    Username = username
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
                    RealName = HttpContext.User.FindFirst("name")?.Value,
                    Username = username
                };
                await _userService.Add(userModel);
            }
            return await _shelterRequestService.Get(id);
        }


        [HttpPost]
        [Authorize]
        public async Task<ActionResult<ShelterRequestModel>> PostShelterRequest([FromBody] ShelterRequestModel shelterRequestModel)
        {
            var username = HttpContext.User.FindFirst("preferred_username")?.Value;
            var userId = await _userService.GetByUsername(username);
            if (userId == -1)
            {
                UserModel userModel = new()
                {
                    RealName = HttpContext.User.FindFirst("name")?.Value,
                    Username = username
                };
                await _userService.Add(userModel);
            }
            shelterRequestModel.RefugeeId = userId;
            shelterRequestModel.Timestamp = DateTime.UtcNow.ToString();
            return await _shelterRequestService.Add(shelterRequestModel);
        }

        [HttpPut("{requestId:int}")]
        [Authorize]
        public async Task<ActionResult<ShelterRequestModel>> PutShelterRequest(int requestId)
        {
            var username = HttpContext.User.FindFirst("preferred_username")?.Value;
            var userId = await _userService.GetByUsername(username);
            if (userId == -1)
            {
                UserModel userModel = new()
                {
                    RealName = HttpContext.User.FindFirst("name")?.Value,
                    Username = username
                };
                await _userService.Add(userModel);
                userId = await _userService.GetByUsername(username);
            }
            ShelterRequestModel shelterRequestModel = await _shelterRequestService.Get(requestId);
            shelterRequestModel.Accepted = true;
            HandshakeModel handshakeModel = new()
            {
                RefugeeId = shelterRequestModel.RefugeeId,
                HelperId = userId,
                RequestType = "ShelterRequest",
                RequestId = requestId
            };
            await _handshakeService.Add(handshakeModel);
            return await _shelterRequestService.Update(shelterRequestModel);
        }

        [HttpGet("byUserId/{id:int}")]
        [Authorize]
        public async Task<ActionResult<List<ShelterRequestModel>>> GetShelterRequestByUserId(int id)
        {
            var username = HttpContext.User.FindFirst("preferred_username")?.Value;
            var userId = await _userService.GetByUsername(username);
            if (userId == -1)
            {
                UserModel userModel = new()
                {
                    RealName = HttpContext.User.FindFirst("name")?.Value,
                    Username = username
                };
                await _userService.Add(userModel);
                userId = await _userService.GetByUsername(username);
            }
            return await _shelterRequestService.GetAll(goodsRequest => goodsRequest.RefugeeId == id);
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
                    RealName = HttpContext.User.FindFirst("name")?.Value,
                    Username = username
                };
                await _userService.Add(userModel);
            }
            var request = await _shelterRequestService.Get(id);
            await _shelterRequestService.Delete(id);
            return request;
        }
    }
}
