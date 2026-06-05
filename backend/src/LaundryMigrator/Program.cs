using LaundryMapper.Migrations;
using LaundryMapper.Seeds;
using MongoDB.Bson;
using MongoDB.Driver;

var connectionString = Environment.GetEnvironmentVariable("MONGODB_URI") ?? "mongodb://localhost:27017";
var databaseName = Environment.GetEnvironmentVariable("MONGODB_DB") ?? "LaundryDb";
var rollbackArg = args.FirstOrDefault(arg => arg.StartsWith("--rollback", StringComparison.OrdinalIgnoreCase));

var client = new MongoClient(connectionString);
var database = client.GetDatabase(databaseName);
var runner = new MigrationRunner(database);
var migrations = new IMigration[]
{
    new CreateInitialCollectionsMigration()
};

if (rollbackArg is not null)
{
    var parts = rollbackArg.Split('=', 2);
    var version = parts.Length == 2 && int.TryParse(parts[1], out var v) ? v : 0;
    await runner.RollbackAsync(version, migrations);
    Console.WriteLine($"Rolled back to version {version}.");
    return;
}

await runner.ApplyMigrationsAsync(migrations);
await SeedDataAsync(database);
Console.WriteLine("Migrations and seeds completed.");

static async Task SeedDataAsync(IMongoDatabase database)
{
    var seedFolder = FindSeedFolder();
    var customersPath = Path.Combine(seedFolder, "customers.json");
    var ordersPath = Path.Combine(seedFolder, "laundry_orders.json");

    await SeedLoader.SeedCollectionAsync(database.GetCollection<BsonDocument>("customers"), customersPath);
    await SeedLoader.SeedCollectionAsync(database.GetCollection<BsonDocument>("laundry_orders"), ordersPath);
}

static string FindSeedFolder()
{
    var current = Directory.GetCurrentDirectory();
    var candidates = new[]
    {
        Path.Combine(current, "backend", "seeds"),
        Path.Combine(current, "seeds"),
        Path.Combine(current, "..", "backend", "seeds"),
        Path.Combine(current, "..", "seeds"),
        Path.Combine(current, "..", "..", "backend", "seeds")
    };

    foreach (var candidate in candidates)
    {
        var full = Path.GetFullPath(candidate);
        if (Directory.Exists(full))
        {
            return full;
        }
    }

    throw new DirectoryNotFoundException("Could not locate the seeds folder.");
}

public sealed class CreateInitialCollectionsMigration : IMigration
{
    public int Version => 1;
    public string Description => "Create initial laundry collections.";

    public async Task UpAsync(IMongoDatabase database)
    {
        await database.CreateCollectionAsync("customers");
        await database.CreateCollectionAsync("laundry_orders");
    }

    public async Task DownAsync(IMongoDatabase database)
    {
        await database.DropCollectionAsync("customers");
        await database.DropCollectionAsync("laundry_orders");
    }
}
