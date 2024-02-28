using backend.Entities;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace backend.Repository;

public class WordDbContext :  DbContext
{
    public WordDbContext(DbContextOptions<WordDbContext> options) : base(options)
    {
        
    }

    public DbSet<Word> Words { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
       

        var wordfiletext = File.ReadAllText("words.json");
        var words = JsonSerializer.Deserialize<List<Word>>(wordfiletext, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true,

        });

       
        modelBuilder.Entity<Word>().HasData(words);
    }
}
