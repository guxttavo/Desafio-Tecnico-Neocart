using backend.Core.Interfaces.Repositories;
using backend.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Data.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly AppDbContext _context;

        public UsuarioRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task CadastrarUsuarioAsync(Usuario usuario)
        {
            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();
        }

        public async Task<Usuario?> BuscarUsuarioPorEmailAsync(string email)
        {
            return await _context.Usuarios.FirstOrDefaultAsync(x => x.Email == email);
        }

        public async Task<Usuario> BuscarUsuarioPorIdAsync(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null)
            {
                throw new Exception("Usuário não encontrado");
            }
            return usuario;
        }
    }
}
