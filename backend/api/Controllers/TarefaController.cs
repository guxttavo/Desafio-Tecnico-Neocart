using api.Banco;
using api.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TarefaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TarefaController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TarefaDTO>>> GetTarefas()
        {
            var tarefas = await _context
                .Tarefas.Select(
                    t =>
                        new TarefaDTO
                        {
                            Id = t.Id,
                            Nome = t.Nome,
                            Descricao = t.Descricao
                        }
                )
                .ToListAsync();

            return Ok(tarefas);
        }
    }
}
