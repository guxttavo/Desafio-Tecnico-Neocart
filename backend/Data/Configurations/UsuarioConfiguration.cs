using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Configurations
{
    public class UsuarioConfiguration : IEntityTypeConfiguration<Usuario>
    {
        public void Configure(EntityTypeBuilder<Usuario> builder)
        {
            builder.ToTable("usuario");

            builder.HasKey(x => x.Id).HasName("pk_usuario");

            builder.Property(x => x.Id).ValueGeneratedOnAdd().HasColumnName("id");
            builder.Property(x => x.Nome).HasColumnName("nome");
            builder.Property(x => x.Email).HasColumnName("email");
            builder.Property(x => x.Senha).HasColumnName("senha");

            builder.HasMany(x => x.Tarefas).WithOne(t => t.Usuario).HasForeignKey(t => t.UsuarioId);
        }
    }
}
