using backend.Core.Interfaces;
using backend.Core.Interfaces.Repositories;
using backend.Core.Services;
using Data;
using Repositories;

namespace backend
{
    public static class DependencyInjection
    {
        public static void AddDependencies(this IServiceCollection services)
        {
            services.AddScoped<AppDbContext>();

            services.AddScoped<IUsuarioService, UsuarioService>();
            services.AddScoped<ITarefaService, TarefaService>();
            services.AddScoped<ITarefaRepository, TarefaRepository>();
        }
    }
}
