namespace Project3.Backend.Models;

public class GreetingResponse
{
    public string Message { get; set; } = string.Empty;
}

public class HealthResponse
{
    public string Status { get; set; } = "UP";
    public string Description { get; set; } = string.Empty;
}

public class EchoRequest
{
    public string Message { get; set; } = string.Empty;
}

public class EchoResponse
{
    public string Response { get; set; } = string.Empty;
}
