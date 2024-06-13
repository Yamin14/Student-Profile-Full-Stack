
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { nanoid } from 'nanoid';
import swal from 'sweetalert';

const HomePage = () => {

  //students
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = () => {

      axios.get("http://localhost:5198/students")
        .then(res => {

          const data = res.data;

          setStudents(data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });

  }

  useEffect(() => {
    fetchStudents();
  }, []);

  //handle delete
  const handleDelete = (id: number) => {

    const confirmDelete = confirm(`Are you sure you want to delete the data of student with Id ${id}?`)

    if (confirmDelete) {
      axios.delete(`http://localhost:5198/students/${id}`);
      swal("Deleted!", "Student data has successfully been deleted!", 'success');
      setStudents(students.filter(student => student.id !== id));
    }

  };

  //return if loading
  if (loading)
    return <div>Loading. Please Wait...</div>

  //return
  return (
    <div>
      <header className='h1 p-2 border-bottom border-black'>Students Profile</header>

      <div className='p-2 text-center'>
        <NavLink to='/create-student' className='btn btn-primary text-decoration-none'>Add New Student</NavLink>
      </div>

      { students.length == 0
        ? <p className='text-center m-4'>There are currently no students enrolled.</p>

        : <table className='table'>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Reg No.</th>
            <th>Father Name</th>
            <th>Date Of Birth</th>
            <th></th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {students.map(student => {
            return (
              <tr key={nanoid()}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.regNo}</td>
                <td>{student.fatherName}</td>
                <td>{student.dateOfBirth}</td>

                <td><Link className='text-black' to={`/students/${student.id}`} state={{student: student}}>
                  <i className='fa fa-edit'></i>
                </Link></td>

                <td><button onClick={() => handleDelete(student.id)}>
                  <i className='fa fa-trash'></i>
                </button></td>

              </tr>
            );
          })}
        </tbody>
        
      </table>}
      
    </div>
  )
}

export default HomePage