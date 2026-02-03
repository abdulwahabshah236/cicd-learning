using Microsoft.AspNetCore.Mvc;
using Project3.Backend.Models;

namespace Project3.Backend.Controllers;

[ApiController]
[Route("api")]
public class GreetingController : ControllerBase
{
    private readonly ILogger<GreetingController> _logger;

    public GreetingController(ILogger<GreetingController> logger)
    {
        _logger = logger;
    }

    /// <summary>
    /// Get a greeting message
    /// </summary>
    /// <param name="name">Name to greet (default: World)</param>
    /// <returns>Greeting response</returns>
    [HttpGet("greeting")]
    public IActionResult GetGreeting([FromQuery] string name = "World")
    {
        _logger.LogInformation("Greeting endpoint called with name: {Name}", name);
        
        var response = new GreetingResponse
        {
            Message = $"Hello, {name}! Welcome to Project 3 (.NET Backend)."
        };
        
        return Ok(response);
    }

    /// <summary>
    /// Health check endpoint
    /// </summary>
    /// <returns>Health status</returns>
    [HttpGet("health")]
    public IActionResult GetHealth()
    {
        _logger.LogInformation("Health check endpoint called");
        
        var response = new HealthResponse
        {
            Status = "UP",
            Description = "Project 3 .NET Backend is running"
        };
        
        return Ok(response);
    }

    /// <summary>
    /// Echo a message back
    /// </summary>
    /// <param name="request">Message to echo</param>
    /// <returns>Echoed message</returns>
    [HttpPost("echo")]
    public IActionResult PostEcho([FromBody] EchoRequest request)
    {
        if (request == null || string.IsNullOrEmpty(request.Message))
        {
            _logger.LogWarning("Echo endpoint called with empty message");
            return BadRequest(new { error = "Message cannot be empty" });
        }

        _logger.LogInformation("Echo endpoint called with message: {Message}", request.Message);
        
        var response = new EchoResponse
        {
            Response = $"You said: {request.Message}"
        };
        
        return Ok(response);
    }
}
