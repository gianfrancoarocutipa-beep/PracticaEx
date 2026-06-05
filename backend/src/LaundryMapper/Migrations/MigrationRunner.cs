using MongoDB.Driver;

namespace LaundryMapper.Migrations;

public sealed class MigrationRunner
{
    private const string MigrationCollectionName = "_migrations";
    private readonly IMongoDatabase _database;

    public MigrationRunner(IMongoDatabase database)
    {
        _database = database;
    }

    public async Task<List<MigrationMetadata>> GetAppliedMigrationsAsync()
    {
        var collection = _database.GetCollection<MigrationMetadata>(MigrationCollectionName);
        return await collection.Find(FilterDefinition<MigrationMetadata>.Empty).SortBy(x => x.Version).ToListAsync();
    }

    public async Task ApplyMigrationsAsync(IEnumerable<IMigration> migrations)
    {
        var collection = _database.GetCollection<MigrationMetadata>(MigrationCollectionName);
        var applied = await GetAppliedMigrationsAsync();
        var pending = migrations.OrderBy(x => x.Version).Where(x => applied.All(a => a.Version != x.Version));

        foreach (var migration in pending)
        {
            await migration.UpAsync(_database);
            await collection.InsertOneAsync(new MigrationMetadata
            {
                Version = migration.Version,
                Description = migration.Description,
                AppliedAt = DateTime.UtcNow
            });
        }
    }

    public async Task RollbackAsync(int targetVersion, IEnumerable<IMigration> migrations)
    {
        var applied = await GetAppliedMigrationsAsync();
        var collection = _database.GetCollection<MigrationMetadata>(MigrationCollectionName);
        var toRollback = applied.Where(x => x.Version > targetVersion).OrderByDescending(x => x.Version).ToList();

        foreach (var metadata in toRollback)
        {
            var migration = migrations.FirstOrDefault(x => x.Version == metadata.Version);
            if (migration is null)
            {
                continue;
            }

            await migration.DownAsync(_database);
            await collection.DeleteOneAsync(x => x.Version == metadata.Version);
        }
    }
}
