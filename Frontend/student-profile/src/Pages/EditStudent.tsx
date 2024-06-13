
import { useNavigate, useParams } from "react-router-dom"
import StudentForm from "../Components/StudentForm";
import { useEffect, useState } from "react";
import axios from 'axios';
import swal from "sweetalert";

const EditStudent = () => {

  //navigate
  const nav = useNavigate();

  //get id and student
  const { id } = useParams();
  const [student, setStudent] = useState({
    id: undefined,
    name: '',
    regNo: '',
    fatherName: '',
    dateOfBirth: ''
  });

  useEffect(() => {

    const url = `http://localhost:5198/students/${id}`;
    axios.get(url)
      .then(res => {
        const data = res.data;
        setStudent(data);
      })
      .catch(err => {
        console.log(err);
      });

  }, []);

  //handle edit
  const handleEdit = (updatedStudent: object) => {
    
    const url = `http://localhost:5198/students/${id}`;

    axios.put(url, updatedStudent)
      .then(() => {
        swal("Saved!", "Student has successfully been updated!", 'success');
        nav("/");
      })
      .catch(err => {
        console.log(err);
      });

  }

  //return
  return (

    <form>
      <StudentForm formHeading="Edit Student Data" 
                    values={student}
                    btnLabel="Save"
                    onSubmit={handleEdit} />
    </form>

  )
}

export default EditStudent