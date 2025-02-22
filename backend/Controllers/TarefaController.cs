using backend.Core.Interfaces;
using backend.Core.Models;
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

        [HttpGet("listarTarefas")]
        public async Task<ActionResult<IEnumerable<Tarefa>>> ListarTarefas()
        {
            var tarefas = await _tarefaService.ListarTarefas();

            if (tarefas == null || !tarefas.Any())
                return NotFound("Nenhuma tarefa encontrada.");

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

        [HttpGet("buscarTarefaPorId/{id}")]
        public async Task<ActionResult<Tarefa>> BuscarTarefaPorId(int id)
        {
            var tarefa = await _tarefaService.BuscarTarefaPorId(id);

            if (tarefa == null)
                return NotFound("Tarefa não encontrada.");

            return Ok(tarefa);
        }

        [HttpPut("editarTarefa/{id}")]
        public async Task<ActionResult<Tarefa>> EditarTarefa(int id, [FromBody] Tarefa tarefa)
        {
            if (id != tarefa.Id)
                return BadRequest("O ID da tarefa não corresponde ao parâmetro informado.");

            if (tarefa == null)
                return BadRequest("Os dados da tarefa são inválidos.");

            var tarefaAtualizada = await _tarefaService.EditarTarefa(tarefa);
            if (tarefaAtualizada == null)
                return NotFound("Tarefa não encontrada.");

            return Ok(tarefaAtualizada);
        }

        [HttpDelete("excluirTarefa/{id}")]
        public async Task<IActionResult> ExcluirTarefa(int id)
        {
            var tarefaExistente = await _tarefaService.BuscarTarefaPorId(id);

            if (tarefaExistente == null)
                return NotFound("Tarefa não encontrada.");

            var tarefaExcluida = await _tarefaService.ExcluirTarefa(id);

            if (!tarefaExcluida)
                return NotFound("Tarefa não encontrada.");

            return NoContent();
        }
    }
}
