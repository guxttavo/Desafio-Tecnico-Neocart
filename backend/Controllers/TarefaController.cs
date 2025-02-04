using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Data;
using Core.Models;

namespace Controllers
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
        public async Task<ActionResult<IEnumerable<Tarefa>>> GetTarefas()
        {
            var tarefas = await _context.Tarefas.Include(t => t.Usuario).ToListAsync();

            return Ok(tarefas);
        }
    }
}
