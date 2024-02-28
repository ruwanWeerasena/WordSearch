using backend.Entities;
using backend.Services;
using Lucene.Net.Util.Fst;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Numerics;

namespace backend.Repository;

public class WordRepository : IWordRepository
{
    private readonly WordDbContext _wordDbContext;
    private readonly IWordSearchEngine _wordSearchEngine;

    public WordRepository( IWordSearchEngine wordSearchEngine, WordDbContext wordDbContext)
    {
        _wordSearchEngine = wordSearchEngine;
        _wordDbContext = wordDbContext;
    }
    public async Task DeleteById(int id)
    {
        var affected = _wordSearchEngine.RemoveWordById(id);
       if(affected)
       {
           var word =await _wordDbContext.Words.FindAsync(id);
            if(word != null)
            {
                _wordDbContext.Words.Remove(word);

            }
            await _wordDbContext.SaveChangesAsync();
       }
    }

    public   List<Word> Get(string searchtext)
    {
        var list =  _wordSearchEngine.Search(searchtext);
        return list;
    }

    public Task<List<Word>> GetAll()
    {
       return _wordDbContext.Words.ToListAsync();
    }

    public async Task<Word> GetById(int id)
    {
        return await _wordDbContext.Words.FindAsync(id);
    }

    public async Task Update(Word word)
    {
        if (_wordSearchEngine.RemoveWordById((int)word.Id))
        {
            _wordSearchEngine.AddWordToIndex(word);
        }
        var existingword = await _wordDbContext.Words.FindAsync(word.Id);
        if (existingword != null)
        {
            existingword.Name = word.Name;
            existingword.Description = word.Description;
            existingword.Example1 = word.Example1;
            existingword.Example2 = word.Example2;
            existingword.Voice = word.Voice;
            await _wordDbContext.SaveChangesAsync();
        }


    }
    public async Task Add(Word word)
    {

        try
        {
            await _wordDbContext.Words.AddAsync(word);
            await _wordDbContext.SaveChangesAsync();
            _wordSearchEngine.AddWordToIndex(word);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error adding Word: {ex.Message}");
        }
       
    }

    public  void TestAdd(List<Word> words)
    {
        try
        {
            
            _wordSearchEngine.testAdd(words);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error adding Word: {ex.Message}");
        }
    }
}
