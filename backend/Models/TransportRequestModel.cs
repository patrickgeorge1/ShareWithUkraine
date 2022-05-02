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
        [Required]
        public int RefugeeId { get; set; }
        [Required]
        public string FromWhere { get; set; }
        [Required]
        public string Destination { get; set; }
        [Required]
        public int AvailableSeats { get; set; }
        [Required]
        public string ArrivalTime { get; set; }
        public bool Accepted { get; set; }
        public string Timestamp { get; set; }
        public string Details { get; set; }

    }
}
