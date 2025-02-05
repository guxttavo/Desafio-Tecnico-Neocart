using backend.Core.Interfaces;
using Core.Models;
using Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Core.Service
{
    public class UsuarioService : IUsuarioService
    {
        private readonly AppDbContext _context;

        public UsuarioService(AppDbContext context)
        {
            _context = context;
        }

        public async Task CadastrarAsync(Usuario usuario)
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
