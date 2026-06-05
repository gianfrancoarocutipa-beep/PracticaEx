using System;

namespace LaundryMapper.Migrations;

public sealed class MigrationMetadata
{
    public int Version { get; set; }
    public string Description { get; set; } = string.Empty;
    public DateTime AppliedAt { get; set; }
}
