using Backend.Data;
using Backend.Data.EFCore;
using Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace backend.Data.Services
{
    public class ServiceBase<T> : IServiceBase<T>
        where T : class
    {
        IRepository<T> _repo;

        public ServiceBase(IRepository<T> repository)
        {
            _repo = repository;
        }
        public async Task<T> Add(T entity)
        {
            await _repo.Add(entity);
            return entity;
        }

        public async Task<int> Delete(int id)
        {
            await _repo.Delete(id);
            return 0;
        }

        public async Task<T> Get(int id)
        {
            return await _repo.Get(id); 
        }

        public Task<IEnumerable<T>> GetAll(Expression<Func<T, bool>> whereCondition)
        {
            throw new NotImplementedException();
        }

        public async Task<List<T>> GetAll()
        {
            var entities = await _repo.GetAll();
            return entities;
        }

        public Task<T> GetSingle(Expression<Func<T, bool>> whereCondition)
        {
            throw new NotImplementedException();
        }

        public Task<T> Update(T NewEntity)
        {
            throw new NotImplementedException();
        }
    }
}
