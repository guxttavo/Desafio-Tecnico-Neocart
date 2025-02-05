using backend.Core.Interfaces.Repositories;
using backend.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Data.Repositories
{
    public class TarefaRepository : ITarefaRepository
    {
        private readonly AppDbContext _context;

        public TarefaRepository(AppDbContext context)
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

        public async Task<bool> ExcluirTarefa(int id)
        {
            var tarefa = await _context.Tarefas.FindAsync(id);
            if (tarefa == null)
                return false;

            _context.Tarefas.Remove(tarefa);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
