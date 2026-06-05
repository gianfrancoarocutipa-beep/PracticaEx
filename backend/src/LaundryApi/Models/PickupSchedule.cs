using MongoDB.Bson.Serialization.Attributes;

namespace LaundryApi.Models;

public sealed class PickupSchedule
{
    [BsonElement("date")]
    public DateTime Date { get; set; }

    [BsonElement("timeSlot")]
    public string TimeSlot { get; set; } = string.Empty;

    [BsonElement("address")]
    public Address Address { get; set; } = new();
}
