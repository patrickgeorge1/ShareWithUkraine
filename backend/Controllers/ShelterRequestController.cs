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
            var refugee = await _userService.Get(shelterRequestModel.RefugeeId);
            var helper = await _userService.Get(userId);

            await _handshakeService.Add(handshakeModel);

            await SendOrderRequest($"{{\"recipient\": \"{username}\"," +
                                     $" \"message\": \"You've just accepted a shelter request. You will be contacted by the refugee.\"}}");
            await SendOrderRequest($"{{\"recipient\": \"{refugee.Username}\"," +
                                      $"\"message\": \"Your shelter request has been accepted. You can contact your helper at {username} or {helper.Phone}\"}}");
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
