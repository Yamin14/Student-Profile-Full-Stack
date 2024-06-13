using Microsoft.EntityFrameworkCore;
using StudentsProfile.Data;
using StudentsProfile.Entities;
using StudentsProfile.Dtos;
using System.Linq;

namespace StudentsProfile.EndPoints;

public static class EndPoints
{

    public static RouteGroupBuilder MapEndPoints (this WebApplication app)
    {
        var group = app.MapGroup("/students");

        //map get all
        group.MapGet("/", async (StudentContext dbContext) => {
            return await dbContext.Students.ToListAsync();
        });

        //map get one
        _ = group.MapGet("/{id}", async (int id, StudentContext dbContext) =>
        {
            Student? student = await dbContext.Students.FindAsync(id);

            return student is null ? Results.NotFound() : Results.Ok(student);
        });

        //map add new
        group.MapPost("/", async (StudentContext dbContext, CreateStudentDto newStudentDto) => {

            int maxId = dbContext.Students.Max(s => s.Id) + 1;

            if (!dbContext.Students.Any(s => s.Id == maxId)) {
                maxId = maxId;
            } else {
                maxId = maxId + 1;
            }

            Student newStudent = new Student {
                Id = maxId,
                Name = newStudentDto.Name,
                RegNo = newStudentDto.RegNo,
                FatherName = newStudentDto.FatherName,
                DateOfBirth = newStudentDto.DateOfBirth
            };
            
            dbContext.Add(newStudent);
            await dbContext.SaveChangesAsync();

            return Results.Ok(newStudent);

        });

        //map update
        group.MapPut("/{id}", async (int id, Student updatedStudent, StudentContext dbContext) => {
            Student? existingStudent = dbContext.Students.Find(id);

            if (existingStudent is null) {
                return Results.NotFound();
            }

            dbContext.Entry(existingStudent)
                .CurrentValues
                .SetValues(updatedStudent);

            await dbContext.SaveChangesAsync();

            return Results.NoContent();

        });

        //map delete
        group.MapDelete("/{id}", async (int id, StudentContext dbContext) => {
            await dbContext.Students.Where(student => student.Id == id)
                    .ExecuteDeleteAsync();

            return Results.NoContent();
        });

        return group;
    }

}
