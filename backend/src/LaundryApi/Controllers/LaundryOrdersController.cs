using LaundryApi.Models;
using LaundryApi.Requests;
using LaundryApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace LaundryApi.Controllers;

[ApiController]
[Route("laundry-orders")]
public sealed class LaundryOrdersController : ControllerBase
{
    private readonly ILaundryOrderService _service;

    public LaundryOrdersController(ILaundryOrderService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<IActionResult> CreateOrder([FromBody] LaundryOrderCreateRequest request)
    {
        var order = new LaundryOrder
        {
            CustomerId = request.CustomerId,
            Items = request.Items,
            PickupSchedule = request.PickupSchedule,
            DeliverySchedule = request.DeliverySchedule
        };

        var created = await _service.CreateOrderAsync(order);
        return CreatedAtAction(nameof(GetOrderById), new { id = created.Id }, created);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetOrderById(string id)
    {
        var order = await _service.GetOrderByIdAsync(id);
        return order is null ? NotFound() : Ok(order);
    }

    [HttpPost("{id}/pickup")]
    public async Task<IActionResult> SchedulePickup(string id, [FromBody] PickupRequest request)
    {
        var updated = await _service.SchedulePickupAsync(id, request.Schedule);
        return updated is null ? NotFound() : Ok(updated);
    }

    [HttpPost("{id}/delivery")]
    public async Task<IActionResult> ScheduleDelivery(string id, [FromBody] DeliveryRequest request)
    {
        var updated = await _service.ScheduleDeliveryAsync(id, request.Schedule);
        return updated is null ? NotFound() : Ok(updated);
    }

    [HttpPost("{id}/status")]
    public async Task<IActionResult> UpdateStatus(string id, [FromBody] StatusUpdateRequest request)
    {
        var updated = await _service.UpdateStatusAsync(id, request.Status);
        return updated is null ? NotFound() : Ok(updated);
    }
}
