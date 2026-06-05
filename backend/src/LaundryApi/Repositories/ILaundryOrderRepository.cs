using LaundryApi.Models;

namespace LaundryApi.Repositories;

public interface ILaundryOrderRepository
{
    Task<LaundryOrder> CreateAsync(LaundryOrder order);
    Task<LaundryOrder?> GetByIdAsync(string id);
    Task<List<LaundryOrder>> GetByCustomerIdAsync(string customerId);
    Task<LaundryOrder> UpdateAsync(LaundryOrder order);
}
