

using backend.Entities;
using Lucene.Net.Analysis.Standard;
using Lucene.Net.Documents;
using Lucene.Net.Index;
using Lucene.Net.QueryParsers.Classic;
using Lucene.Net.Search;
using Lucene.Net.Store;
using Lucene.Net.Util;


namespace backend.Services;

public class WordSearchEngine : IWordSearchEngine
{
    private const LuceneVersion luceneVersion = LuceneVersion.LUCENE_48;
    private readonly StandardAnalyzer _analyzer;
    private readonly FSDirectory _directory;
    private readonly IndexWriter _writer;
    private int _documentCounter;
    private int CommitThreshold = 100;
    public WordSearchEngine()
    {

        _analyzer = new StandardAnalyzer(luceneVersion);
        _directory = FSDirectory.Open(@"C:\Users\RuwanWeerasena\Gampaha\WordSearch\backend\LuceneIndex");
        var config = new IndexWriterConfig(luceneVersion, _analyzer);
        _writer = new IndexWriter(_directory, config);

    }

    public void AddWordToIndex(Word word)
    {
        
        var document = new Lucene.Net.Documents.Document();
        Console.WriteLine("Word id is"+word.Id);

        document.Add(new StringField("Id", word.Id.ToString(), Field.Store.YES));
        document.Add(new TextField("Name", word.Name, Field.Store.YES));
        document.Add(new TextField("Description", word.Description, Field.Store.YES));

        _writer.AddDocument(document);
        //if (_documentCounter >= CommitThreshold)
        //{
        //    // Commit the changes and reset the counter
        //    _writer.Commit();
        //    _documentCounter = 0;
        //}
        _writer.Commit();
    }

    public  List<Word> Search(string searchTerm)
    {

        var directoryReader = DirectoryReader.Open(_directory);
        var indexSearcher = new IndexSearcher(directoryReader);

        string[] fields = { "Name", "Description" };
        var booleanQuery = new BooleanQuery();

        //var fuzzyquery = new FuzzyQuery(new Term("Name", searchTerm), 2);
        //booleanQuery.Add(fuzzyquery, Occur.SHOULD);

        var wildcardQuery = new WildcardQuery(new Term("Name", searchTerm.ToLower() + "*"));
        

        var queryParser = new MultiFieldQueryParser(luceneVersion, fields, _analyzer);
        var query = queryParser.Parse(searchTerm.ToLower());

        booleanQuery.Add(wildcardQuery, Occur.SHOULD);
        booleanQuery.Add(query, Occur.SHOULD);

        Console.WriteLine("Generated Lucene Query: " + booleanQuery.ToString());
        var hits = indexSearcher.Search(booleanQuery, 10).ScoreDocs;

        
        var resultwords = new List<Word>();
        foreach (var hit in hits)
        {
            var document = indexSearcher.Doc(hit.Doc);
            var id = document.Get("Id");
            var name = document.Get("Name");
            var description = document.Get("Description");

            resultwords.Add(new Word { Id = int.Parse(id), Name = name, Description = description });

        }
        
        return resultwords;
    }

    public bool RemoveWordById(int wordId)
    {
        var term = new Term("Id", wordId.ToString());

        try
        {
            _writer.DeleteDocuments(term);
            _writer.Commit();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error deleting document by ID {wordId}: {ex.Message}");
            return false;
        }
        return true;
    }

    public void testAdd(List<Word> words)
    {
        foreach (var word in words)
        {
            var document = new Lucene.Net.Documents.Document();

            document.Add(new StringField("Id", word.Id.ToString(), Field.Store.YES));
            document.Add(new TextField("Name", word.Name, Field.Store.YES));
            document.Add(new TextField("Description", word.Description, Field.Store.YES));

            _writer.AddDocument(document);
        }
        

        _writer.Commit();
    }
}
