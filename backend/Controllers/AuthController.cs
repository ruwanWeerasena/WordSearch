using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using backend.Repository;
using backend.Entities;
using Google.Apis.Auth;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IUserRepository _userRepository;
    private readonly IAuthenticationSchemeProvider _authenticationSchemeProvider;

    public AuthController(IUserRepository userRepository, IAuthenticationSchemeProvider authenticationSchemeProvider)
    {
        _userRepository = userRepository;
        _authenticationSchemeProvider = authenticationSchemeProvider;
    }

    //[HttpGet("login")]
    //public IActionResult Login()
    //{
    //    var properties = new AuthenticationProperties()
    //    {
    //        RedirectUri = Url.Action("Callback"),

    //    };

    //    return Challenge(properties, GoogleDefaults.AuthenticationScheme);
    //}

    [HttpPost("login/google")]
    public async Task<IActionResult> LoginGoogle([FromBody] GoogleToken token)
    {
        var validPayload = await GoogleJsonWebSignature.ValidateAsync(token.Token);
        
        var isexistingUser = await _userRepository.GetById(validPayload.Subject);
        if (isexistingUser == null )
        {
             isexistingUser = await _userRepository.Add(new User
            {
                Id = validPayload.Subject,
                Email = validPayload.Email,
                Name = validPayload.Name
            });
        }

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, validPayload.Subject),
            new Claim(ClaimTypes.Name, validPayload.Name),
            new Claim(ClaimTypes.Email, validPayload.Email),
            new Claim(ClaimTypes.Actor,"User" )
        };

        var jwttoken = GenerateJwtToken(claims);
        return Ok(new { user = isexistingUser,token=jwttoken });

    }

   




    private string GenerateJwtToken(List<Claim> claims)
    {
        var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK")); // Replace with your secret key
        var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

        var tokenOptions = new JwtSecurityToken(
            issuer: "wordsearch.com",
            audience: "wordsearch.com",
            claims: claims,
            expires: DateTime.UtcNow.AddSeconds(20),
            signingCredentials: signingCredentials
        );

        return new JwtSecurityTokenHandler().WriteToken(tokenOptions);
    }

    public class GoogleToken
    {
        public string Token { get; set; }
    }
}
