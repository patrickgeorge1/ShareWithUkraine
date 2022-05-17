using Backend.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class TransportRequestModel
    {
        public int Id { get; set; }
        public int RefugeeId { get; set; }
        public string FromWhere { get; set; }
        public string Destination { get; set; }
        public int AvailableSeats { get; set; }
        public string ArrivalTime { get; set; }
        public bool Accepted { get; set; }
        public string Timestamp { get; set; }
        public string Details { get; set; }

    }
}
