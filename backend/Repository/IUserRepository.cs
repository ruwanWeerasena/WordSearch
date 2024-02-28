using backend.Entities;

namespace backend.Repository;

public interface IUserRepository
{
    Task<List<User>> GetAll();
    Task<User> Get(string email);
    Task<User> GetById(string id);
    Task Update(User user);
    Task DeleteById(string id);
    Task<User> Add(User user);
}
