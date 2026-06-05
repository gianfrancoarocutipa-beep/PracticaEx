using System.Net.Http.Json;
using System.Text.Json;
using LaundryApi.Models;
using LaundryApi.Requests;
using LaundryApi.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using Xunit;

namespace LaundryApi.Tests.Integration;

public class ApiIntegrationTests : IClassFixture<ApiIntegrationTests.CustomWebApplicationFactory>
{
    private readonly HttpClient _client;

    public ApiIntegrationTests(CustomWebApplicationFactory factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task HealthEndpoint_ReturnsHealthy()
    {
        var response = await _client.GetAsync("/health");
        response.EnsureSuccessStatusCode();

        var json = await JsonSerializer.DeserializeAsync<JsonElement>(await response.Content.ReadAsStreamAsync());
        Assert.Equal("Healthy", json.GetProperty("status").GetString());
    }

    [Fact]
    public async Task CreateCustomer_ReturnsCreatedCustomer()
    {
        var request = new CustomerCreateRequest
        {
            Name = "Integration Test",
            Phone = "999999999",
            Email = "itest@example.com",
                Addresses = new List<Address> { new Address { Street = "Av. Bolognesi", City = "Tacna", Region = "Tacna", Country = "Peru" } }
        var created = await response.Content.ReadFromJsonAsync<JsonElement>();
        Assert.Equal("Integration Test", created.GetProperty("name").GetString());
    }

    public sealed class CustomWebApplicationFactory : WebApplicationFactory<Program>
    {
        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.ConfigureServices(services =>
            {
                services.RemoveAll(typeof(ICustomerService));
                services.RemoveAll(typeof(ILaundryOrderService));

                var customerService = new Mock<ICustomerService>();
                customerService.Setup(x => x.CreateCustomerAsync(It.IsAny<Customer>())).ReturnsAsync((Customer c) =>
                {
                    c.Id = "integration-customer-id";
                    return c;
                });
                customerService.Setup(x => x.GetCustomerByIdAsync(It.IsAny<string>())).ReturnsAsync((string id) => new Customer { Id = id, Name = "Customer", Phone = "999999999", Email = "test@example.com", Addresses = new List<Address>() });

                var orderService = new Mock<ILaundryOrderService>();
                orderService.Setup(x => x.GetOrdersByCustomerIdAsync(It.IsAny<string>())).ReturnsAsync(new List<LaundryOrder>());

                services.AddSingleton(customerService.Object);
                services.AddSingleton(orderService.Object);
            });
        }
    }
}
