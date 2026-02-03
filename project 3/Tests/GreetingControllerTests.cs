using Xunit;
using Microsoft.AspNetCore.Mvc.Testing;
using System.Net.Http.Json;
using Project3.Backend.Models;

namespace Project3.Backend.Tests;

public class GreetingControllerTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly WebApplicationFactory<Program> _factory;
    private readonly HttpClient _client;

    public GreetingControllerTests(WebApplicationFactory<Program> factory)
    {
        _factory = factory;
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task GetGreeting_WithName_ReturnsOkAndMessage()
    {
        // Arrange
        var name = "TestUser";

        // Act
        var response = await _client.GetAsync($"/api/greeting?name={name}");
        var content = await response.Content.ReadFromJsonAsync<GreetingResponse>();

        // Assert
        Assert.True(response.IsSuccessStatusCode);
        Assert.NotNull(content);
        Assert.Contains(name, content.Message);
        Assert.Contains("Welcome to Project 3", content.Message);
    }

    [Fact]
    public async Task GetGreeting_WithoutName_ReturnsDefaultGreeting()
    {
        // Act
        var response = await _client.GetAsync("/api/greeting");
        var content = await response.Content.ReadFromJsonAsync<GreetingResponse>();

        // Assert
        Assert.True(response.IsSuccessStatusCode);
        Assert.NotNull(content);
        Assert.Contains("World", content.Message);
    }

    [Fact]
    public async Task GetHealth_ReturnsOkAndUpStatus()
    {
        // Act
        var response = await _client.GetAsync("/api/health");
        var content = await response.Content.ReadFromJsonAsync<HealthResponse>();

        // Assert
        Assert.True(response.IsSuccessStatusCode);
        Assert.NotNull(content);
        Assert.Equal("UP", content.Status);
        Assert.Contains(".NET", content.Description);
    }

    [Fact]
    public async Task PostEcho_WithMessage_ReturnsEchoedMessage()
    {
        // Arrange
        var request = new EchoRequest { Message = "Hello Backend" };

        // Act
        var response = await _client.PostAsJsonAsync("/api/echo", request);
        var content = await response.Content.ReadFromJsonAsync<EchoResponse>();

        // Assert
        Assert.True(response.IsSuccessStatusCode);
        Assert.NotNull(content);
        Assert.Contains("Hello Backend", content.Response);
        Assert.Contains("You said:", content.Response);
    }

    [Fact]
    public async Task PostEcho_WithEmptyMessage_ReturnsBadRequest()
    {
        // Arrange
        var request = new EchoRequest { Message = "" };

        // Act
        var response = await _client.PostAsJsonAsync("/api/echo", request);

        // Assert
        Assert.Equal(System.Net.HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task PostEcho_WithNullRequest_ReturnsBadRequest()
    {
        // Act
        var response = await _client.PostAsJsonAsync<EchoRequest?>("/api/echo", null);

        // Assert
        Assert.Equal(System.Net.HttpStatusCode.BadRequest, response.StatusCode);
    }
}
