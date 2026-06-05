using LaundryApi.Models;

namespace LaundryApi.Requests;

public sealed class DeliveryRequest
{
    public DeliverySchedule Schedule { get; set; } = new();
}
