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
        private readonly ITransportRequestModelService _transportRequestService;
        public TransportRequestModelController(IUserModelService userService, ITransportRequestModelService transportRequestService)
        {
            _userService = userService;
            _transportRequestService = transportRequestService;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<TransportRequestModel>>> GetTransportRequests()
        {
            var username = HttpContext.User.FindFirst("preferred_username")?.Value;
            var userExists = await _userService.GetByUsername(username);
            if (userExists == -1)
            {
                UserModel userModel = new()
                {
                    RealName = "bossu",
                    Username = username,
                    UserType = "labagiu"
                };
                await _userService.Add(userModel);
            }
            return await _transportRequestService.GetAll();
        }

        [HttpGet("{id:int}")]
        [Authorize]
        public async Task<ActionResult<TransportRequestModel>> GetTransportRequestById(int id)
        {
            var username = HttpContext.User.FindFirst("preferred_username")?.Value;
            var userExists = await _userService.GetByUsername(username);
            if (userExists == -1)
            {
                UserModel userModel = new()
                {
                    RealName = "bossu",
                    Username = username,
                    UserType = "labagiu"
                };
                await _userService.Add(userModel);
            }
            return await _transportRequestService.Get(id);
        }


        [HttpPost]
        [Authorize]
        public async Task<ActionResult<TransportRequestModel>> PostGoodsRequest([FromBody] TransportRequestModel transportRequestModel)
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
            transportRequestModel.RefugeeId = userId;
            return await _transportRequestService.Add(transportRequestModel);
        }


        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<ActionResult<TransportRequestModel>> DeleteGoodsRequest(int id)
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
            var request = await _transportRequestService.Get(id);
            await _transportRequestService.Delete(id);
            return request;
        }
    }
}
