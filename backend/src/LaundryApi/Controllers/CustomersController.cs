using LaundryApi.Models;
using LaundryApi.Requests;
using LaundryApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace LaundryApi.Controllers;

[ApiController]
[Route("customers")]
public sealed class CustomersController : ControllerBase
{
    private readonly ICustomerService _customerService;
    private readonly ILaundryOrderService _laundryOrderService;

    public CustomersController(ICustomerService customerService, ILaundryOrderService laundryOrderService)
    {
        _customerService = customerService;
        _laundryOrderService = laundryOrderService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateCustomer([FromBody] CustomerCreateRequest request)
    {
        var customer = new Customer
        {
            Name = request.Name,
            Phone = request.Phone,
            Email = request.Email,
            Addresses = request.Addresses
        };

        var created = await _customerService.CreateCustomerAsync(customer);
        return CreatedAtAction(nameof(GetCustomerById), new { id = created.Id }, created);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetCustomerById(string id)
    {
        var customer = await _customerService.GetCustomerByIdAsync(id);
        return customer is null ? NotFound() : Ok(customer);
    }

    [HttpGet("{id}/laundry-orders")]
    public async Task<IActionResult> GetLaundryOrders(string id)
    {
        var customer = await _customerService.GetCustomerByIdAsync(id);
        if (customer is null)
        {
            return NotFound();
        }

        var orders = await _laundryOrderService.GetOrdersByCustomerIdAsync(id);
        return Ok(orders);
    }
}
