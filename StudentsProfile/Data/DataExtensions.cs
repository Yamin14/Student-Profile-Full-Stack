using Microsoft.EntityFrameworkCore;

namespace StudentsProfile.Data;

public static class DataExtensions
{
    public static async Task MigrateDbAsync(this WebApplication app){
        
        using var scope = app.Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<StudentContext>();
        await dbContext.Database.MigrateAsync();

    }
}
