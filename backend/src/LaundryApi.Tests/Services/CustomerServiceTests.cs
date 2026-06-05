using LaundryApi.Models;
using LaundryApi.Repositories;
using LaundryApi.Services;
using Moq;
using Xunit;

namespace LaundryApi.Tests.Services;

public class CustomerServiceTests
{
    [Fact]
    public async Task CreateCustomerAsync_ShouldReturnCreatedCustomer()
    {
        var customer = new Customer { Name = "Test", Phone = "999999999", Email = "test@example.com" };
        var repository = new Mock<ICustomerRepository>();
        repository.Setup(x => x.CreateAsync(It.IsAny<Customer>())).ReturnsAsync((Customer c) => c);

        var service = new CustomerService(repository.Object);
        var result = await service.CreateCustomerAsync(customer);

        Assert.Equal(customer.Name, result.Name);
        Assert.Equal(customer.Phone, result.Phone);
        Assert.Equal(customer.Email, result.Email);
    }

    [Fact]
    public async Task GetCustomerByIdAsync_ShouldReturnCustomerWhenExists()
    {
        var customer = new Customer { Id = "1", Name = "Test", Phone = "999999999", Email = "test@example.com" };
        var repository = new Mock<ICustomerRepository>();
        repository.Setup(x => x.GetByIdAsync("1")).ReturnsAsync(customer);

        var service = new CustomerService(repository.Object);
        var result = await service.GetCustomerByIdAsync("1");

        Assert.NotNull(result);
        Assert.Equal("1", result.Id);
    }
}
