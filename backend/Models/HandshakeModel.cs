using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class HandshakeModel
    {
        public int Id { get; set; }
        public int RequestId { get; set; }
        public string RequestType { get; set; }
        public int HelperId { get; set; }
        public int RefugeeId { get; set; }
        public bool Accepted { get; set; }
        public string Timestamp { get; set; }
        public string Details { get; set; }
    }
}
