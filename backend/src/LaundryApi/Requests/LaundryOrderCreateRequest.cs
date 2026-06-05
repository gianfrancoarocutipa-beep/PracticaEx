using LaundryApi.Models;

namespace LaundryApi.Requests;

public sealed class LaundryOrderCreateRequest
{
    public string CustomerId { get; set; } = string.Empty;
    public List<string> Items { get; set; } = new();
    public PickupSchedule? PickupSchedule { get; set; }
    public DeliverySchedule? DeliverySchedule { get; set; }
}
