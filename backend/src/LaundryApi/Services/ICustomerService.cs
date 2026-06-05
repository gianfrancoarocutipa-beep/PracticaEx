using LaundryApi.Models;

namespace LaundryApi.Services;

public interface ICustomerService
{
    Task<Customer> CreateCustomerAsync(Customer customer);
    Task<Customer?> GetCustomerByIdAsync(string id);
}
