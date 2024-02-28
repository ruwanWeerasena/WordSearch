using System.ComponentModel.DataAnnotations;

namespace backend.Entities;

public class Word
{
    public int? Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string? Example1 { get; set; }
    public string? Example2 { get; set; }
    public byte[]? Voice { get; set; }
    public string UserId { get; set; }
    public string UserName { get; set; }


}
