namespace backend.Entities;

public class User
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public virtual ICollection<Word>? Words { get; set;}
}
