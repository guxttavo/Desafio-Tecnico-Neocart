using backend.Core.Interfaces;
using backend.Core.Service;
using Data;

namespace backend
{
    public static class DependencyInjection
    { 
        public static void AddDependencies(this IServiceCollection services)
        {
            services.AddScoped<AppDbContext>();

            services.AddScoped<IUsuarioService, UsuarioService>();
            services.AddScoped<ITarefaService, TarefaService>();
        }
    }
}
