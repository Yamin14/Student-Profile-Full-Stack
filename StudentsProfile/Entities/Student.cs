namespace StudentsProfile.Entities;

public class Student
{

    public int Id { get; set; }
    public required string Name { get; set; }
    public required string RegNo { get; set; }
    public string? FatherName { get; set; }
    public DateOnly DateOfBirth { get; set; }

}
