using LaundryApi.Models;

namespace LaundryApi.Requests;

public sealed class PickupRequest
{
    public PickupSchedule Schedule { get; set; } = new();
}
