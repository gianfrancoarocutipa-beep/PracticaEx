using LaundryApi.Models;

namespace LaundryApi.Repositories;

public interface ICustomerRepository
{
    Task<Customer> CreateAsync(Customer customer);
    Task<Customer?> GetByIdAsync(string id);
}
