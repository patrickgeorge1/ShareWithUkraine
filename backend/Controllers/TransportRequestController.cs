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
    public class TransportRequestController : ControllerBase
    {
        private readonly IUserModelService _userService;
        private readonly IHandshakeService _handshakeService;
        private readonly ITransportRequestService _transportRequestService;
        public TransportRequestController(IUserModelService userService, ITransportRequestService transportRequestService, IHandshakeService handshakeService)
        {
            _userService = userService;
            _transportRequestService = transportRequestService;
            _handshakeService = handshakeService;
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
                    RealName = HttpContext.User.FindFirst("name")?.Value,
                    Username = username
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
                    RealName = HttpContext.User.FindFirst("name")?.Value,
                    Username = username
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
                    RealName = HttpContext.User.FindFirst("name")?.Value,
                    Username = username
                };
                await _userService.Add(userModel);
            }
            transportRequestModel.RefugeeId = userId;
            transportRequestModel.Timestamp = DateTime.UtcNow.ToString();
            return await _transportRequestService.Add(transportRequestModel);
        }

        [HttpPut("{requestId:int}")]
        [Authorize]
        public async Task<ActionResult<TransportRequestModel>> PutTransportRequest(int requestId)
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
            TransportRequestModel transportRequestModel = await _transportRequestService.Get(requestId);
            transportRequestModel.Accepted = true;
            HandshakeModel handshakeModel = new()
            {
                RefugeeId = transportRequestModel.RefugeeId,
                HelperId = userId,
                RequestType = "TransportRequest",
                RequestId = requestId
            };
            var refugee = await _userService.Get(transportRequestModel.RefugeeId);
            var helper = await _userService.Get(userId);

            await _handshakeService.Add(handshakeModel);

            await SendOrderRequest($"{{\"recipient\": \"{username}\"," +
                                     $" \"message\": \"You've just accepted a transport request. You will be contacted by the refugee.\"}}");
            await SendOrderRequest($"{{\"recipient\": \"{refugee.Username}\"," +
                                      $"\"message\": \"Your transport request has been accepted. You can contact your helper at {username} or {helper.Phone}\"}}");
            return await _transportRequestService.Update(transportRequestModel);
        }

        [HttpGet("byUserId/{id:int}")]
        [Authorize]
        public async Task<ActionResult<List<TransportRequestModel>>> GetTransportRequestByUserId(int id)
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
            return await _transportRequestService.GetAll(goodsRequest => goodsRequest.RefugeeId == id);
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
                    RealName = HttpContext.User.FindFirst("name")?.Value,
                    Username = username
                };
                await _userService.Add(userModel);
                userId = await _userService.GetByUsername(username);
            }
            var request = await _transportRequestService.Get(id);
            await _transportRequestService.Delete(id);
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
