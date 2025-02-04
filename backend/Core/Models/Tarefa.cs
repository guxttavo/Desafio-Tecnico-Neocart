using System.Text.Json.Serialization;

namespace Core.Models
{
    public enum StatusTarefa
    {
        Pendente,
        EmAndamento,
        Concluida
    }

    public class Tarefa
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public DateTime Data { get; set; }
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public StatusTarefa Status { get; set; }
        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; }
    }
}
