using backend.Core.Interfaces;
using backend.Core.Interfaces.Repositories;
using backend.Core.Models;

namespace backend.Core.Services
{
    public class TarefaService : ITarefaService
    {
        private readonly ITarefaRepository _tarefaRepository;

        public TarefaService(ITarefaRepository tarefaRepository)
        {
            _tarefaRepository = tarefaRepository;
        }

        public async Task<List<Tarefa>> ListarTarefas()
        {
            return await _tarefaRepository.ListarTarefas();
        }

        public async Task<Tarefa> CadastrarTarefa(Tarefa tarefa)
        {
            return await _tarefaRepository.CadastrarTarefa(tarefa);
        }

        public async Task<Tarefa> BuscarTarefaPorId(int id)
        {
            return await _tarefaRepository.BuscarTarefaPorId(id);
        }

        public async Task<Tarefa> EditarTarefa(Tarefa tarefa)
        {
            return await _tarefaRepository.EditarTarefa(tarefa);
        }

        public async Task<bool> ExcluirTarefa(int id)
        {
            return await _tarefaRepository.ExcluirTarefa(id);
        }
    }
}
