using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Backend.Data.EFCore
{
    public class RepositoryBase<T> : IRepository<T>
        where T : class
    {
        private readonly DbContext context;
        public RepositoryBase(DbContext context)
        {
            this.context = context;
        }
        public async Task<T> Add(T entity)
        {
             context.Set<T>().Add(entity);
            await context.SaveChangesAsync();
            return entity;
        }

        public async Task<T> Delete(int id)
        {
            var entity = await context.Set<T>().FindAsync(id);
            if (entity == null)
            {
                return entity;
            }

            context.Set<T>().Remove(entity);
            await context.SaveChangesAsync();

            return entity;
        }

        public async Task<T> Get(int id)
        {
            return await context.Set<T>().FindAsync(id);
        }

        public async Task<List<T>> GetAll()
        {
            return await context.Set<T>().ToListAsync();
        }

        public async Task<List<T>> GetAll(Expression<Func<T, bool>> whereCondition)
        {
            return await context.Set<T>().Where(whereCondition).ToListAsync();
        }

        public Task<T> GetSingle(Expression<Func<T, bool>> whereCondition)
        {
            throw new NotImplementedException();
        }

        public async Task<T> Update(T entity)
        {
            context.Entry(entity).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return entity;
        }

    }
}
