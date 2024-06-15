import StudentForm from "../Components/StudentForm"
import axios from 'axios';
import swal from 'sweetalert';

const CreateStudent = () => {

  //default values
  const values = {
    name: '',
    regNo: '',
    fatherName: '',
    dateOfBirth: ''
  }

  //handle create logic
  const handleAdd = (newStudent: object) => {

    console.log(newStudent);

    axios.post(
      'http://localhost:5198/students',
      newStudent,
    )
      .then(() => {
        swal("Success!", "New student created successfully!", 'success');
      })
      .catch(err => {
        console.log(err);
      });

  }
  
  //return
  return (
    <StudentForm formHeading="Create New Student" 
                  values={values}
                  btnLabel="Add"
                  onSubmit={handleAdd} />
  )
}

export default CreateStudent