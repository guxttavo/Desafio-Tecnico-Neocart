using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace Core.Models
{
    public class Usuario : IdentityUser
    {
        public string? Nome { get; set; }
        public string Senha { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public ICollection<Tarefa> Tarefas { get; set; } = new List<Tarefa>();
    }
}
