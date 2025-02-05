using backend.Core.Interfaces;
using Core.Models;
using Data;
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

        public async Task<Tarefa> CadastrarTarefa(Tarefa tarefa)
        {
            _context.Tarefas.Add(tarefa);
            await _context.SaveChangesAsync();
            return tarefa;
        }

        public async Task<Tarefa> BuscarTarefaPorId(int id)
        {
            return await _context.Tarefas.FindAsync(id);
        }

        public async Task<Tarefa> EditarTarefa(Tarefa tarefa)
        {
            var tarefaExistente = await _context.Tarefas.FindAsync(tarefa.Id);
            if (tarefaExistente == null)
                return null;

            tarefaExistente.Nome = tarefa.Nome;
            tarefaExistente.Descricao = tarefa.Descricao;
            tarefaExistente.Data = tarefa.Data;
            tarefaExistente.Status = tarefa.Status;

            tarefaExistente.Data = DateTime.SpecifyKind(tarefa.Data, DateTimeKind.Utc);
            await _context.SaveChangesAsync();

            return tarefaExistente;
        }
    }
}
