using System.Text.Json.Serialization;

namespace api.Models
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }


        [JsonIgnore] // Evita o loop infinito na serialização
        public ICollection<Tarefa> Tarefas { get; set; }}
}
