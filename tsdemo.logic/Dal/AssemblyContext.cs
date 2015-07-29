using Microsoft.Data.Entity;
using Microsoft.Framework.Configuration;
using System.IO;
using tsdemo.logic.Entity;

namespace tsdemo.logic.Dal
{
    public class AssemblyContext : DbContext
    {
        protected override void OnConfiguring(EntityOptionsBuilder eob)
        {
            if (!eob.IsConfigured)
            {
                // find configuration for command line EF tool
                var builder = new ConfigurationBuilder("../tsdemo.ui/")
                    .AddJsonFile("config.json")
                    .AddEnvironmentVariables();
                IConfiguration configuration = builder.Build();
                // setup server connection string
                var connString = configuration["ConnectionString:localhost"];
                eob.UseSqlServer(connString);
            }
            base.OnConfiguring(eob);
        }
        protected override void OnModelCreating(ModelBuilder mb)
        {
            mb.Entity<ProductLine>().Key(x => new { x.ProductId, x.LineId });
            base.OnModelCreating(mb);
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Line> Lines { get; set; }
        public DbSet<Operation> Operations { get; set; }
        public DbSet<Status> Statuses { get; set; }
    }
}
