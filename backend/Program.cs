using System.Text;
using System.Text.Json.Serialization;
using backend;
using Core.Models;
using Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http.Json;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(
    options => options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
);

builder
    .Services.AddIdentity<Usuario, IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();

builder
    .Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])
            )
        };

        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                context.Response.Headers.Add(
                    "Access-Control-Allow-Origin",
                    "http://localhost:4200"
                );
                return Task.CompletedTask;
            }
        };
    });

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

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
