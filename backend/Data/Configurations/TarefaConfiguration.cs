using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Configurations
{
    public class TarefaConfiguration : IEntityTypeConfiguration<Tarefa>
    {
        public void Configure(EntityTypeBuilder<Tarefa> builder)
        {
            builder.ToTable("tarefa");

            builder.HasKey(x => x.Id).HasName("pk_tarefa");

            builder.Property(x => x.Id).ValueGeneratedOnAdd().HasColumnName("id");
            builder.Property(x => x.Nome).HasColumnName("nome");
            builder.Property(x => x.Descricao).HasColumnName("descricao");
            builder.Property(x => x.Data).HasColumnName("data");
            builder.Property(t => t.Status).HasColumnName("status").HasConversion<string>(); 
            builder.Property(x => x.UsuarioId).HasColumnName("usuario_id");

            builder
                .HasOne(x => x.Usuario)
                .WithMany(x => x.Tarefas)
                .HasForeignKey(x => x.UsuarioId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
