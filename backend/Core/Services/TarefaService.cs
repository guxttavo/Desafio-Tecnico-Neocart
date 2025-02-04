using Core.Models;
using Data;
using backend.Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Core.Service
{
    public class TarefaService : ITarefaService
    {
        private readonly AppDbContext _context;

        public TarefaService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Tarefa>> ListarTarefas()
        {
            return await _context.Tarefas.ToListAsync();
        }
    }
}
