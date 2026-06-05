using System;

namespace LaundryMapper.Attributes;

[AttributeUsage(AttributeTargets.Class, AllowMultiple = false)]
public sealed class MongoCollectionAttribute : Attribute
{
    public string Name { get; }

    public MongoCollectionAttribute(string name)
    {
        Name = name;
    }
}
