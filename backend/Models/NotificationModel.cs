using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class NotificationModel
    {
        public int Id { get; set; }
        public int TargetUserId { get; set; }
        public int HandshakeId { get; set; }
        public string ArrivalTime { get; set; }
        public bool Status { get; set; }
        public string Message { get; set; }
        public string Timestamp { get; set; }
    }
}
