using System.Text.Json.Serialization;

namespace backend.Core.Models
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public ICollection<Tarefa> Tarefas { get; set; } = new List<Tarefa>();
    }
}
