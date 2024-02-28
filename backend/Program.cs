using backend.Repository;
using backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));
   

//builder.Services.AddAuthorization(opt =>
//{

//    opt.AddPolicy("userpolicy", pb =>
//    {
//        pb.RequireAuthenticatedUser().RequireClaim(ClaimTypes.Actor, "User");
//    });
//});

builder.Services.AddCors();

builder.Services.AddDbContext<WordDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("Default")));
builder.Services.AddScoped<IWordRepository,WordRepository>();
builder.Services.AddScoped<IUserRepository,UserRepository>();
builder.Services.AddSingleton<IWordSearchEngine,WordSearchEngine>();

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(o=>o.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
app.UseAuthentication();
app.UseAuthorization();
app.UseHttpsRedirection();



app.MapControllers();




app.Run();
