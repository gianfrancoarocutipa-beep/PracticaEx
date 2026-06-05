using LaundryApi.Models;
using LaundryApi.Repositories;

namespace LaundryApi.Services;

public sealed class CustomerService : ICustomerService
{
    private readonly ICustomerRepository _repository;

    public CustomerService(ICustomerRepository repository)
    {
        _repository = repository;
    }

    public async Task<Customer> CreateCustomerAsync(Customer customer)
    {
        return await _repository.CreateAsync(customer);
    }

    public async Task<Customer?> GetCustomerByIdAsync(string id)
    {
        return await _repository.GetByIdAsync(id);
    }
}
