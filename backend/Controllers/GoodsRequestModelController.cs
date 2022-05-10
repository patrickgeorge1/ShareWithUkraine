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
    public class GoodsRequestModelController : ControllerBase
    {
        private readonly IUserModelService _userService;
        private readonly IGoodsRequestModelService _goodsRequestService;
        public GoodsRequestModelController(IUserModelService userService, IGoodsRequestModelService goodsRequestService)
        {
            _userService = userService;
            _goodsRequestService = goodsRequestService;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<GoodsRequestModel>>> GetGoodsRequests()
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
            return await _goodsRequestService.GetAll();
        }

        [HttpGet("{id:int}")]
        [Authorize]
        public async Task<ActionResult<GoodsRequestModel>> GetGoodsRequestById(int id)
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
            return await _goodsRequestService.Get(id);
        }


        [HttpPost]
        [Authorize]
        public async Task<ActionResult<GoodsRequestModel>> PostGoodsRequest([FromBody] GoodsRequestModel goodsRequestModel)
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
            goodsRequestModel.RefugeeId = userId;
            return await _goodsRequestService.Add(goodsRequestModel);
        }


        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<ActionResult<GoodsRequestModel>> DeleteGoodsRequest(int id)
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
            var request = await _goodsRequestService.Get(id);
            await _goodsRequestService.Delete(id);
            return request;
        }
    }
}
