using LaundryApi.Models;

namespace LaundryApi.Requests;

public sealed class StatusUpdateRequest
{
    public OrderStatus Status { get; set; }
}
