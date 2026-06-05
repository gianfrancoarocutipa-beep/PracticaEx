using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;

namespace LaundryMapper.Seeds;

public static class SeedLoader
{
    public static async Task SeedCollectionAsync(IMongoCollection<BsonDocument> collection, string filePath)
    {
        if (!File.Exists(filePath))
        {
            throw new FileNotFoundException(filePath);
        }

        var text = await File.ReadAllTextAsync(filePath);
        var documents = BsonSerializer.Deserialize<BsonArray>(text)
            .OfType<BsonDocument>()
            .ToList();

        if (documents.Count == 0)
        {
            return;
        }

        await collection.DeleteManyAsync(FilterDefinition<BsonDocument>.Empty);
        await collection.InsertManyAsync(documents);
    }
}
