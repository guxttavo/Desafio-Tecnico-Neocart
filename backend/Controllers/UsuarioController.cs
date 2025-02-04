using Core.Models;
using Microsoft.AspNetCore.Mvc;
using backend.Core.Interfaces;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;

        public UsuarioController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [HttpPost]
        public async Task<IActionResult> CadastrarUsuario([FromBody] Usuario usuario)
        {
            if (usuario == null)
            {
                return BadRequest("Usuário inválido.");
            }

            try
            {
                await _usuarioService.CadastrarAsync(usuario);
                return Ok("Usuário cadastrado com sucesso.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao cadastrar usuário: {ex.Message}");
            }
        }
    }
}
