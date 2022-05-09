﻿using Microsoft.AspNetCore.Mvc;
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
            return await _goodsRequestService.GetAll();
        }

        [HttpGet("{id:int}")]
        [Authorize]
        public async Task<ActionResult<GoodsRequestModel>> GetGoodsRequestById(int id)
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
            return await _goodsRequestService.Get(id);
        }


        [HttpPost]
        [Authorize]
        public async Task<ActionResult<GoodsRequestModel>> PostGoodsRequest()
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
            var goodsRequestModel = JsonSerializer.Deserialize<GoodsRequestModel>(requestBodyString);

            await _goodsRequestService.Add(goodsRequestModel);
            return goodsRequestModel;
        }


        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<ActionResult<GoodsRequestModel>> DeleteGoodsRequest(int id)
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
            var request = await _goodsRequestService.Get(id);
            await _goodsRequestService.Delete(id);
            return request;
        }
    }
}