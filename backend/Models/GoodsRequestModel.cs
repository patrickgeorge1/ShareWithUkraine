using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class GoodsRequestModel
    {
        public int Id { get; set; }
        public int RefugeeId { get; set; }
        public string GoodName { get; set; }
        public int Quantity { get; set; }
        public string DeliveryAddress { get; set; }
        public bool Accepted { get; set; }
        public string Timestamp { get; set; }
        public string Details { get; set; }
    }
}
