using LaundryApi.Models;
using LaundryApi.Repositories;
using LaundryApi.Services;
using Moq;
using Xunit;

namespace LaundryApi.Tests.Services;

public class LaundryOrderServiceTests
{
    [Fact]
    public async Task CreateOrderAsync_ShouldThrowWhenCustomerMissing()
    {
        var order = new LaundryOrder { CustomerId = "1", Items = new List<string> { "Shirt" } };
        var orderRepository = new Mock<ILaundryOrderRepository>();
        var customerRepository = new Mock<ICustomerRepository>();
        customerRepository.Setup(x => x.GetByIdAsync("1")).ReturnsAsync((Customer?)null);

        var service = new LaundryOrderService(orderRepository.Object, customerRepository.Object);

        await Assert.ThrowsAsync<InvalidOperationException>(() => service.CreateOrderAsync(order));
    }

    [Fact]
    public async Task SchedulePickupAsync_ShouldUpdatePickupSchedule()
    {
        var order = new LaundryOrder { Id = "1", CustomerId = "1", Status = OrderStatus.Registered };
        var schedule = new PickupSchedule { Date = DateTime.UtcNow, TimeSlot = "10:00-12:00", Address = new Address { Street = "Av. Lima", City = "Tacna", Region = "Tacna", Country = "Peru" } };
        var orderRepository = new Mock<ILaundryOrderRepository>();
        orderRepository.Setup(x => x.GetByIdAsync("1")).ReturnsAsync(order);
        orderRepository.Setup(x => x.UpdateAsync(It.IsAny<LaundryOrder>())).ReturnsAsync((LaundryOrder o) => o);
        var customerRepository = new Mock<ICustomerRepository>();

        var service = new LaundryOrderService(orderRepository.Object, customerRepository.Object);
        var result = await service.SchedulePickupAsync("1", schedule);

        Assert.NotNull(result);
        Assert.Equal(OrderStatus.Picked, result.Status);
        Assert.Equal(schedule.TimeSlot, result.PickupSchedule?.TimeSlot);
    }
}
