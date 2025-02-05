using backend.Core.DTO;
using backend.Core.Interfaces;
using backend.Core.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly TokenService _tokenService;
        private readonly IUsuarioService _usuarioService;

        public AuthController(TokenService tokenService, IUsuarioService usuarioService)
        {
            _tokenService = tokenService;
            _usuarioService = usuarioService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO model)
        {
            var usuario = await _usuarioService.BuscarUsuarioPorEmailAsync(model.Email);

            if (usuario == null || usuario.Senha != model.Senha)
                return Unauthorized(new { message = "E-mail ou senha inválidos." });

            var token = _tokenService.Generate(usuario);

            return Ok(new { token, usuario = new { usuario.Id, usuario.Nome } });
        }
    }
}
