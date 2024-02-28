using backend.Entities;
using backend.Repository;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;
using System.Security.Claims;

namespace backend.Controllers;

[ApiController]

[Route("api/[controller]")]
[RequiredScope(RequiredScopesConfigurationKey = "AzureAd:scopes")]
//[Authorize(Roles ="Admin,User")]
public class WordController : ControllerBase
{
    private readonly IWordRepository _wordRepository;
    private readonly IWordSearchEngine _wordSearchEngine;
    public WordController(IWordRepository wordRepository, IWordSearchEngine wordSearchEngine)
    {
        _wordRepository = wordRepository;
        _wordSearchEngine = wordSearchEngine;
    }



    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var results = await _wordRepository.GetAll();


        return Ok(results);
    }

    [HttpGet("{text}")]
    public IActionResult Get(string text)
    {
        var results = _wordRepository.Get(text);


        return Ok(results);
    }
    [HttpGet("get/{Id}")]
    public async Task<IActionResult> GetById(int Id)
    {
        var results = await _wordRepository.GetById(Id);


        return Ok(results);
    }

    [HttpPost]
    [Authorize(Roles = "Admin,User")]
    public async Task<IActionResult> Post([FromBody] Word word)
    {
        var  claimsIdentity = HttpContext.User.Identity as ClaimsIdentity;
        var objectIdentifierClaim = claimsIdentity.FindFirst("http://schemas.microsoft.com/identity/claims/objectidentifier");
        if(objectIdentifierClaim is not null)
        {
            word.UserId = objectIdentifierClaim.Value;
        }
        else
        {
            Console.WriteLine(objectIdentifierClaim.Value);
        }
        await _wordRepository.Add(word);


        return NoContent();
    }

    [HttpDelete("{Id}")]
    [Authorize(Roles = "Admin,User")]
    public async Task<IActionResult> Delete(int Id)
    {
        var claimsIdentity = HttpContext.User.Identity as ClaimsIdentity;
        var objectIdentifierClaim = claimsIdentity.FindFirst("http://schemas.microsoft.com/identity/claims/objectidentifier");
        if (objectIdentifierClaim is not null)
        {
            var word = await _wordRepository.GetById(Id);
            if (word.UserId == objectIdentifierClaim.Value)
            {
                await _wordRepository.DeleteById(Id);
                return Ok();
            }
            else
            {
                return Unauthorized();
            }
        }
        return BadRequest();

    }

    [HttpPut]
    [Authorize(Roles = "Admin,User")]
    public async Task<IActionResult> Put([FromBody] Word word)
    {
        var claimsIdentity = HttpContext.User.Identity as ClaimsIdentity;
        var objectIdentifierClaim = claimsIdentity.FindFirst("http://schemas.microsoft.com/identity/claims/objectidentifier");
        if(objectIdentifierClaim is not null)
        {
            var existingWord = await _wordRepository.GetById((int)word.Id);
            if (existingWord.UserId == objectIdentifierClaim.Value)
            {
                word.UserId=objectIdentifierClaim.Value;
                await _wordRepository.Update(word);
                return Ok();
            }
            else
            {
                return Unauthorized();
            }
        }

        return BadRequest();
    }

    [HttpPost("test")]
    public async Task<IActionResult> Put([FromBody] List<Word> words)
    {
         _wordSearchEngine.testAdd(words);


        return NoContent();
    }

    



}