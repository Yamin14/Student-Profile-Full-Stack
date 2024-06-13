namespace StudentsProfile.Dtos;

public record class CreateStudentDto
(
    string Name,
    string RegNo,
    string FatherName,
    DateOnly DateOfBirth
);
