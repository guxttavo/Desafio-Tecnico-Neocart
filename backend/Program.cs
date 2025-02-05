using System.Text.Json.Serialization;
using backend;
using backend.Core.Services;
using Data;
using Microsoft.AspNetCore.Http.Json;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(
    options => options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
);

builder.Services.AddTransient<TokenService>();

builder.Services.AddDependencies();

builder.Services.Configure<JsonOptions>(options =>
{
    options.SerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "PermitirTudo",
        policy =>
        {
            policy
                .WithOrigins("http://localhost:4200") // Permite apenas requisições do frontend
                .AllowAnyHeader() // Permite qualquer cabeçalho
                .AllowAnyMethod() // Permite qualquer método (GET, POST, etc.)
                .AllowCredentials(); // Permite credenciais (cookies, headers de autenticação, etc.)
        }
    );
});

var app = builder.Build();

app.UseCors("PermitirTudo");

app.MapControllers();

app.Run();
