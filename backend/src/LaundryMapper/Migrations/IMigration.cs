using MongoDB.Driver;

namespace LaundryMapper.Migrations;

public interface IMigration
{
    int Version { get; }
    string Description { get; }
    Task UpAsync(IMongoDatabase database);
    Task DownAsync(IMongoDatabase database);
}
