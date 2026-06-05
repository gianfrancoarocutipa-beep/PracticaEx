using LaundryApi.Models;

namespace LaundryApi.Requests;

public sealed class CustomerCreateRequest
{
    public string Name { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public List<Address> Addresses { get; set; } = new();
}
