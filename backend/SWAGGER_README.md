# Swagger/OpenAPI Documentation

This Spring Boot project has been configured with Swagger/OpenAPI documentation using SpringDoc OpenAPI.

## Accessing Swagger UI

Once the application is running, you can access the Swagger UI at:

- **Swagger UI**: http://localhost:8585/swagger-ui.html
- **OpenAPI JSON**: http://localhost:8585/api-docs

**Note**: Swagger UI is publicly accessible without authentication.

## Features

- **Interactive API Documentation**: Browse and test all API endpoints
- **Public Access**: No authentication required to access Swagger UI
- **JWT Authentication Support**: Configured to work with Bearer token authentication for API testing
- **Request/Response Examples**: See example requests and responses
- **API Testing**: Test endpoints directly from the Swagger UI

## Configuration

The Swagger configuration is located in:
- `OpenApiConfig.java` - Main configuration class
- `application.properties` - Swagger UI settings
- `SecurityConfig.java` - Security configuration (Swagger endpoints are public)

## Adding Documentation to Controllers

To add Swagger documentation to your controllers, use these annotations:

### Class-level annotations:
```java
@Tag(name = "Controller Name", description = "Description of the controller")
@SecurityRequirement(name = "Bearer Authentication")
```

### Method-level annotations:
```java
@Operation(
    summary = "Short description",
    description = "Detailed description of the endpoint"
)
@ApiResponses(value = {
    @ApiResponse(responseCode = "200", description = "Success"),
    @ApiResponse(responseCode = "400", description = "Bad Request"),
    @ApiResponse(responseCode = "401", description = "Unauthorized"),
    @ApiResponse(responseCode = "403", description = "Forbidden")
})
```

### Parameter annotations:
```java
@Parameter(description = "Parameter description", required = true)
@RequestBody YourDto dto

@Parameter(description = "Hidden parameter", hidden = true)
Authentication authentication
```

## Example Usage

1. Start your Spring Boot application
2. Open http://localhost:8585/swagger-ui.html in your browser
3. Browse all available API endpoints (no login required)
4. For testing protected endpoints, click "Authorize" and enter your JWT token (without "Bearer " prefix)

## Security

- **Swagger UI Access**: Public (no authentication required)
- **API Endpoints**: Protected endpoints still require JWT authentication

When testing protected endpoints:

1. Click the "Authorize" button in Swagger UI
2. Enter your JWT token (without the "Bearer " prefix)
3. Click "Authorize"
4. Now you can test protected endpoints

## Customization

You can customize the Swagger configuration by modifying the `OpenApiConfig.java` file:

- Change API title, description, and version
- Add contact information
- Modify security schemes
- Add server configurations
- Customize response examples

## Dependencies

The following dependency has been added to `pom.xml`:
```xml
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.5.0</version>
</dependency>
``` 