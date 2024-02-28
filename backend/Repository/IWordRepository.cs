using backend.Entities;

namespace backend.Repository;

public interface IWordRepository 
{
    Task<List<Word>> GetAll();
    List<Word> Get(string searchtext);
    Task<Word> GetById(int id);
    Task Update(Word word);
    Task DeleteById(int id);
    Task Add(Word word);
    void TestAdd(List<Word> word);
}
