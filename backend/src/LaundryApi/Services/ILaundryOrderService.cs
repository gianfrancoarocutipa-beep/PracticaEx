using LaundryApi.Models;

namespace LaundryApi.Services;

public interface ILaundryOrderService
{
    Task<LaundryOrder> CreateOrderAsync(LaundryOrder order);
    Task<LaundryOrder?> GetOrderByIdAsync(string id);
    Task<List<LaundryOrder>> GetOrdersByCustomerIdAsync(string customerId);
    Task<LaundryOrder?> SchedulePickupAsync(string id, PickupSchedule schedule);
    Task<LaundryOrder?> ScheduleDeliveryAsync(string id, DeliverySchedule schedule);
    Task<LaundryOrder?> UpdateStatusAsync(string id, OrderStatus status);
}
