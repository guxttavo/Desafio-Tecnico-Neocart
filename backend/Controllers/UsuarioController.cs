using backend.Core.Interfaces;
using Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace Controllers
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

        [HttpPost("cadastrarUsuario")]
        public async Task<IActionResult> CadastrarUsuario([FromBody] Usuario usuario)
        {
            if (usuario == null)
            {
                return BadRequest(); 
            }

            try
            {
                await _usuarioService.CadastrarAsync(usuario);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500); 
            }
        }
    }
}
