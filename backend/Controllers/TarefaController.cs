using backend.Core.Interfaces;
using Core.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

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

        [HttpPost("cadastrarTarefa")]
        public async Task<ActionResult<Tarefa>> CadastrarTarefa([FromBody] Tarefa tarefa)
        {
            if (tarefa == null)
                return BadRequest("Os dados da tarefa são inválidos.");

            var novaTarefa = await _tarefaService.CadastrarTarefa(tarefa);
            return CreatedAtAction(nameof(ListarTarefas), new { id = novaTarefa.Id }, novaTarefa);
        }
    }
}
