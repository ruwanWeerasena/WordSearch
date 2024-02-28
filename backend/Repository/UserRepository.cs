using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository;

public class UserRepository : IUserRepository
{
    private readonly WordDbContext _context;

    public UserRepository(WordDbContext context)
    {
        _context = context;
    }

    public Task<User> Add(User user)
    {
        throw new NotImplementedException();
    }

    public Task DeleteById(string id)
    {
        throw new NotImplementedException();
    }

    public Task<User> Get(string email)
    {
        throw new NotImplementedException();
    }

    public Task<List<User>> GetAll()
    {
        throw new NotImplementedException();
    }

    public Task<User> GetById(string id)
    {
        throw new NotImplementedException();
    }

    public Task Update(User user)
    {
        throw new NotImplementedException();
    }

    //public async Task<User> Add(User user)
    //{
    //    await _context.AddAsync(user);
    //    await _context.SaveChangesAsync();
    //    return user;
    //}

    //public async Task DeleteById(string id)
    //{
    //    var user = await _context.Users.FindAsync(id);
    //    if (user != null)
    //    {
    //     _context.Users.Remove(user);
    //      await _context.SaveChangesAsync();

    //    }
    //}

    //public async Task<User> Get(string email)
    //{
    //    return await _context.Users.FirstOrDefaultAsync(user=>user.Email==email);
    //}

    //public async Task<List<User>> GetAll()
    //{
    //    return await _context.Users.Select(u=>new User { Name = u.Name, Email=u.Email,Id=u.Id}).ToListAsync();

    //}

    //public async Task<User> GetById(string id)
    //{
    //    return await _context.Users.FindAsync(id);
    //}

    //public async Task Update(User user)
    //{
    //    var existingUser = await _context.Users.FindAsync(user.Id);
    //    if (existingUser != null)
    //    {
    //        existingUser.Name= user.Name;
    //        await _context.SaveChangesAsync();

    //    }
    //}
}
