using Core.Models;

namespace backend.Core.Interfaces
{
    public interface IUsuarioService
    {
        Task CadastrarAsync(Usuario usuario);
        Task<Usuario> BuscarUsuarioPorEmailAsync(string email);
    }
}
