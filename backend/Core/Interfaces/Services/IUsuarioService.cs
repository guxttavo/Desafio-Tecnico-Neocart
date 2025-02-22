using backend.Core.Models;

namespace backend.Core.Interfaces
{
    public interface IUsuarioService
    {
        Task CadastrarUsuarioAsync(Usuario usuario);
        Task<Usuario> BuscarUsuarioPorEmailAsync(string email);
        Task<Usuario> BuscarUsuarioPorIdAsync(int id); 
    }
}
