using backend.Core.Interfaces;
using backend.Core.Interfaces.Repositories;
using backend.Core.Models;

namespace backend.Core.Services
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IUsuarioRepository _usuarioRepository;

        public UsuarioService(IUsuarioRepository usuarioRepository)
        {
            _usuarioRepository = usuarioRepository;
        }

        public async Task CadastrarUsuarioAsync(Usuario usuario)
        {
            await _usuarioRepository.CadastrarUsuarioAsync(usuario);
        }

        public async Task<Usuario?> BuscarUsuarioPorEmailAsync(string email)
        {
            return await _usuarioRepository.BuscarUsuarioPorEmailAsync(email);
        }

        public async Task<Usuario?> BuscarUsuarioPorIdAsync(int id)
        {
            return await _usuarioRepository.BuscarUsuarioPorIdAsync(id);
        }
    }
}
