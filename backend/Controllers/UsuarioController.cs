using backend.Core.Interfaces;
using backend.Core.Models;
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
                return BadRequest("Os dados do usuário são inválidos.");

            try
            {
                await _usuarioService.CadastrarUsuarioAsync(usuario);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Erro interno ao cadastrar usuário.");
            }
        }

        [HttpGet("buscarPorId/{id}")]
        public async Task<IActionResult> BuscarPorId(int id)
        {
            try
            {
                var usuario = await _usuarioService.BuscarUsuarioPorIdAsync(id);
                return Ok(usuario);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Erro interno ao buscar usuário.");
            }
        }
    }
}
