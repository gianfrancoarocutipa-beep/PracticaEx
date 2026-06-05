using MongoDB.Bson.Serialization.Attributes;

namespace LaundryApi.Models;

public sealed class Address
{
    [BsonElement("street")]
    public string Street { get; set; } = string.Empty;

    [BsonElement("city")]
    public string City { get; set; } = string.Empty;

    [BsonElement("region")]
    public string Region { get; set; } = string.Empty;

    [BsonElement("country")]
    public string Country { get; set; } = string.Empty;
}
