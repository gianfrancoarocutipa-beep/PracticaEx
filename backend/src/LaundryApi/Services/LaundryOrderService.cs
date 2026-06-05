using LaundryApi.Models;
using LaundryApi.Repositories;

namespace LaundryApi.Services;

public sealed class LaundryOrderService : ILaundryOrderService
{
    private readonly ILaundryOrderRepository _repository;
    private readonly ICustomerRepository _customerRepository;

    public LaundryOrderService(ILaundryOrderRepository repository, ICustomerRepository customerRepository)
    {
        _repository = repository;
        _customerRepository = customerRepository;
    }

    public async Task<LaundryOrder> CreateOrderAsync(LaundryOrder order)
    {
        var customer = await _customerRepository.GetByIdAsync(order.CustomerId);
        if (customer is null)
        {
            throw new InvalidOperationException("Customer not found.");
        }

        order.Status = OrderStatus.Registered;
        order.CreatedAt = DateTime.UtcNow;
        return await _repository.CreateAsync(order);
    }

    public async Task<LaundryOrder?> GetOrderByIdAsync(string id)
    {
        return await _repository.GetByIdAsync(id);
    }

    public async Task<List<LaundryOrder>> GetOrdersByCustomerIdAsync(string customerId)
    {
        return await _repository.GetByCustomerIdAsync(customerId);
    }

    public async Task<LaundryOrder?> SchedulePickupAsync(string id, PickupSchedule schedule)
    {
        var order = await _repository.GetByIdAsync(id);
        if (order is null)
        {
            return null;
        }

        order.PickupSchedule = schedule;
        order.Status = order.Status == OrderStatus.Registered ? OrderStatus.Picked : order.Status;
        return await _repository.UpdateAsync(order);
    }

    public async Task<LaundryOrder?> ScheduleDeliveryAsync(string id, DeliverySchedule schedule)
    {
        var order = await _repository.GetByIdAsync(id);
        if (order is null)
        {
            return null;
        }

        order.DeliverySchedule = schedule;
        if (order.Status == OrderStatus.Ready || order.Status == OrderStatus.Processing)
        {
            order.Status = OrderStatus.Shipped;
        }

        return await _repository.UpdateAsync(order);
    }

    public async Task<LaundryOrder?> UpdateStatusAsync(string id, OrderStatus status)
    {
        var order = await _repository.GetByIdAsync(id);
        if (order is null)
        {
            return null;
        }

        order.Status = status;
        return await _repository.UpdateAsync(order);
    }
}
