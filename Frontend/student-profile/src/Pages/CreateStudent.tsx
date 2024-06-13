import StudentForm from "../Components/StudentForm"
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";

const CreateStudent = () => {

  //navigate
  const nav = useNavigate();

  //default values
  const values = {
    name: '',
    regNo: '',
    fatherName: '',
    dateOfBirth: ''
  }

  //handle create logic
  const handleAdd = (newStudent: object) => {

    axios.post(
      'http://localhost:5198/students',
      newStudent,
    )
      .then(() => {
        swal("Success!", "New student created successfully!", 'success');
        nav("/");
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