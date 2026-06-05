using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace LaundryApi.Models;

public sealed class LaundryOrder
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("customerId")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string CustomerId { get; set; } = string.Empty;

    [BsonElement("items")]
    public List<string> Items { get; set; } = new();

    [BsonElement("pickupSchedule")]
    public PickupSchedule? PickupSchedule { get; set; }

    [BsonElement("deliverySchedule")]
    public DeliverySchedule? DeliverySchedule { get; set; }

    [BsonElement("status")]
    public OrderStatus Status { get; set; } = OrderStatus.Registered;

    [BsonElement("createdAt")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
