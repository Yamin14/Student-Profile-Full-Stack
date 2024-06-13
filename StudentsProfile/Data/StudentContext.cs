using Microsoft.EntityFrameworkCore;
using StudentsProfile.Entities;

namespace StudentsProfile.Data;

public class StudentContext(DbContextOptions<StudentContext> options) : DbContext(options)
{
    public DbSet<Student> Students => Set<Student>();

}
