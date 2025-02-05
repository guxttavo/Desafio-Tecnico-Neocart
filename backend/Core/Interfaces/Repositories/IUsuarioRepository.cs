using backend.Core.Models;

namespace backend.Core.Interfaces.Repositories
{
    public interface IUsuarioRepository
    {
        Task CadastrarUsuarioAsync(Usuario usuario);
        Task<Usuario> BuscarUsuarioPorEmailAsync(string email);
        Task<Usuario> BuscarUsuarioPorIdAsync(int id);
    }
}
