using LaundryApi.Models;
using MongoDB.Driver;

namespace LaundryApi.Repositories;

public sealed class LaundryOrderRepository : ILaundryOrderRepository
{
    private readonly IMongoCollection<LaundryOrder> _collection;

    public LaundryOrderRepository(IMongoDatabase database)
    {
        _collection = database.GetCollection<LaundryOrder>("laundry_orders");
    }

    public async Task<LaundryOrder> CreateAsync(LaundryOrder order)
    {
        await _collection.InsertOneAsync(order);
        return order;
    }

    public async Task<LaundryOrder?> GetByIdAsync(string id)
    {
        return await _collection.Find(x => x.Id == id).FirstOrDefaultAsync();
    }

    public async Task<List<LaundryOrder>> GetByCustomerIdAsync(string customerId)
    {
        return await _collection.Find(x => x.CustomerId == customerId).ToListAsync();
    }

    public async Task<LaundryOrder> UpdateAsync(LaundryOrder order)
    {
        var result = await _collection.ReplaceOneAsync(x => x.Id == order.Id, order);
        return order;
    }
}
