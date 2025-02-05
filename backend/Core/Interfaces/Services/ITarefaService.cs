using Core.Models;

namespace backend.Core.Interfaces
{
    public interface ITarefaService
    {
        Task<List<Tarefa>> ListarTarefas();
        Task<Tarefa> CadastrarTarefa(Tarefa tarefa);
    }
}
