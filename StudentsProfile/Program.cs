using Microsoft.EntityFrameworkCore;
using StudentsProfile.Data;
using StudentsProfile.EndPoints;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("Students");
builder.Services.AddSqlite<StudentContext>(connectionString);

builder.Services.AddCors(options => {
    options.AddPolicy(name: "AllowOrigin", builder => {
        builder.WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddControllers();

var app = builder.Build();

app.UseCors("AllowOrigin");

app.MapEndPoints();

app.MapControllers();

await app.MigrateDbAsync();

app.Run();
