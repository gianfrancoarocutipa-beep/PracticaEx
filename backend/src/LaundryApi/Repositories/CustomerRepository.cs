using LaundryApi.Models;
using MongoDB.Driver;

namespace LaundryApi.Repositories;

public sealed class CustomerRepository : ICustomerRepository
{
    private readonly IMongoCollection<Customer> _collection;

    public CustomerRepository(IMongoDatabase database)
    {
        _collection = database.GetCollection<Customer>("customers");
    }

    public async Task<Customer> CreateAsync(Customer customer)
    {
        await _collection.InsertOneAsync(customer);
        return customer;
    }

    public async Task<Customer?> GetByIdAsync(string id)
    {
        return await _collection.Find(x => x.Id == id).FirstOrDefaultAsync();
    }
}
