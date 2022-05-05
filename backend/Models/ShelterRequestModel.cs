using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class ShelterRequestModel
    {
        public int Id { get; set; }
        public int RefugeeId { get; set; }
        public string HouseLocation { get; set; }
        public int AvailableSeats { get; set; }
        public bool TransportIncluded { get; set; }
        public bool Accepted { get; set; }
        public string Timestamp { get; set; }
        public string Details { get; set; }
    }
}
