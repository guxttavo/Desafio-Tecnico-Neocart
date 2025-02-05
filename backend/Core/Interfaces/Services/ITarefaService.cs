using Core.Models;

namespace backend.Core.Interfaces
{
    public interface ITarefaService
    {
        Task<List<Tarefa>> ListarTarefas();
        Task<Tarefa> CadastrarTarefa(Tarefa tarefa);
        Task<Tarefa> BuscarTarefaPorId(int id);
        Task<Tarefa> EditarTarefa(Tarefa tarefa);
        Task<bool> ExcluirTarefa(int id);
    }
}
