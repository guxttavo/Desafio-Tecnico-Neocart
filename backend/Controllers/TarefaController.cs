using backend.Core.Interfaces;
using Core.Models;
using Data;
using Microsoft.AspNetCore.Mvc;

namespace Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TarefaController : ControllerBase
    {
        private readonly ITarefaService _tarefaService;

        public TarefaController(ITarefaService tarefaService)
        {
            _tarefaService = tarefaService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tarefa>>> ListarTarefas()
        {
            var tarefas = await _tarefaService.ListarTarefas();

            return Ok(tarefas);
        }
    }
}
