using backend.Entities;

namespace backend.Services;

public interface IWordSearchEngine
{
    public void AddWordToIndex(Word word);
    public void testAdd(List<Word> word);
    public bool RemoveWordById(int wordId);
    public List<Word> Search(string searchTerm);
}