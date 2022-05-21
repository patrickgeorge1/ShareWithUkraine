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
using Confluent.Kafka;
using System.Net;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoodsRequestController : ControllerBase
    {
        private readonly IUserModelService _userService;
        private readonly IHandshakeService _handshakeService;
        private readonly IGoodsRequestService _goodsRequestService;
        public GoodsRequestController(IUserModelService userService, IGoodsRequestService goodsRequestService, IHandshakeService handshakeService)
        {
            _userService = userService;
            _goodsRequestService = goodsRequestService;
            _handshakeService = handshakeService;
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
                    RealName = HttpContext.User.FindFirst("name")?.Value,
                    Username = username
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
                    RealName = HttpContext.User.FindFirst("name")?.Value,
                    Username = username
                };
                await _userService.Add(userModel);
                userId = await _userService.GetByUsername(username);
            }
            return await _goodsRequestService.Get(id);
        }

        [HttpGet("byUserId/{id:int}")]
        [Authorize]
        public async Task<ActionResult<List<GoodsRequestModel>>> GetGoodsRequestByUserId(int id)
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
            return await _goodsRequestService.GetAll(goodsRequest => goodsRequest.RefugeeId == id);
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
                    RealName = HttpContext.User.FindFirst("name")?.Value,
                    Username = username
                };
                await _userService.Add(userModel);
                userId = await _userService.GetByUsername(username);
            }
            goodsRequestModel.RefugeeId = userId;
            goodsRequestModel.Timestamp = DateTime.UtcNow.ToString();
            await SendOrderRequest("{\"recipient\": \"patrionpatrick@gmail.com\", \"message\": \"ceeva\"}");
            return await _goodsRequestService.Add(goodsRequestModel);
        }

        [HttpPut("{requestId:int}")]
        [Authorize]
        public async Task<ActionResult<GoodsRequestModel>> PutGoodsRequest(int requestId)
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
            GoodsRequestModel goodsRequestModel = await _goodsRequestService.Get(requestId);
            goodsRequestModel.Accepted = true;
            HandshakeModel handshakeModel = new()
            {
                RefugeeId = goodsRequestModel.RefugeeId,
                HelperId = userId,
                RequestType = "GoodsRequest",
                RequestId = requestId
            };
            await _handshakeService.Add(handshakeModel);
            return await _goodsRequestService.Update(goodsRequestModel);
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
                    RealName = HttpContext.User.FindFirst("name")?.Value,
                    Username = username
                };
                await _userService.Add(userModel);
                userId = await _userService.GetByUsername(username);
            }
            var request = await _goodsRequestService.Get(id);
            await _goodsRequestService.Delete(id);
            return request;
        }

        private async Task<bool> SendOrderRequest(string message)
        {
            ProducerConfig config = new ProducerConfig
            {
                BootstrapServers = "broker:9092",
                ClientId = Dns.GetHostName()
            };

            try
            {
                using (var producer = new ProducerBuilder
                <Null, string>(config).Build())
                {
                    var result = await producer.ProduceAsync
                    ("email-tasks", new Message<Null, string>
                    {
                        Value = message
                    });

                    return await Task.FromResult(true);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error occured: {ex.Message}");
            }

            return await Task.FromResult(false);
        }
    }
}
