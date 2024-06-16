import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

//interface
interface Props {
    formHeading: string,
    values: {
        id?: number,
        name: string,
        regNo: string,
        fatherName: string,
        dateOfBirth: string
    },
    btnLabel: string,
    onSubmit: (data: any) => void
}

//component
const StudentForm = ({formHeading, values, btnLabel, onSubmit} : Props) => {

  //errors
  const [errors, setErrors] = useState({name: '', regNo: '', fatherName: '', dateOfBirth: ''});

  //default object
  const [student, setStudent] = useState(values);

  useEffect(() => {
    setStudent(values)
  }, [values])
  
  //handle change
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = event.target;
    setStudent({...student, [name]: value});

  }

  //handle submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //validation
    const validationErrors = {name: '', regNo: '', fatherName: '', dateOfBirth: ''};
    const { name, regNo, fatherName, dateOfBirth } = student;

    //name
    if (!name.trim()) {
      validationErrors.name = 'Name is required.'
    } else if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
      validationErrors.name = 'Invalid name.'
    }

    //reg no
    if (!regNo.trim()) {
      validationErrors.regNo = 'Registration number is required.'
    } else if (!/^\d{3}$/.test(regNo.trim())) {
      validationErrors.regNo = 'Invalid registration number.'
    }

    //father name
    if (!fatherName.trim()) {
      validationErrors.fatherName = "Father's name is required."
    } else if (!/^[a-zA-Z\s]+$/.test(fatherName.trim())) {
      validationErrors.fatherName = "Invalid father's name."
    }

    //date of birth
    if (!dateOfBirth) {
      validationErrors.dateOfBirth = 'Date of birth is required.'
    } else if (parseInt(dateOfBirth.slice(0, 4)) < 1990 || parseInt(dateOfBirth.slice(0,4)) > 2007) {
      validationErrors.dateOfBirth = "Invalid date of birth. Must be between 1990 and 2007."
    }

    //result if valid
    setErrors(validationErrors);
    console.log(validationErrors)
    if (validationErrors.name === '' && validationErrors.regNo === '' &&
      validationErrors.fatherName === '' && validationErrors.dateOfBirth === ''
    ) {
      onSubmit(student);
    }
    
  }

  //return
  return (
    <form className='text-center' onSubmit={handleSubmit}>

      <h1 className='m-4'>{formHeading}</h1>

      <div className='w-50 m-auto border border-black p-2'>

        <div className='entry text-center row'>
          <label className='col-sm-6 fw-bold'>Name:</label>
          <input className='col-sm-6 w-40' type='text' defaultValue={values.name} 
                  name='name' placeholder="e.g. Yamin"
                  onChange={handleInput} />
          {errors.name && <span className="text-danger">{errors.name}</span>}
        </div>

        <div className='entry text-center row'>
          <label className='col-sm-6 fw-bold'>Reg No:</label>
          <input className='col-sm-6 w-40' type='text' defaultValue={values.regNo} 
                  name='regNo' placeholder="e.g. 027"
                   onChange={handleInput} />
          {errors.regNo && <span className="text-danger">{errors.regNo}</span>}
        </div>

        <div className='entry text-center row'>
          <label className='col-sm-6 fw-bold'>Father's Name:</label>
          <input className='col-sm-6 w-40' type='text' defaultValue={values.fatherName} 
                  name='fatherName' placeholder="e.g. Ali"
                  onChange={handleInput} />
          {errors.fatherName && <span className="text-danger">{errors.fatherName}</span>}
        </div>

        <div className='entry text-center row'>
          <label className='col-sm-6 fw-bold'>Date of Birth:</label>
          <input className='col-sm-6 w-40' type='date' defaultValue={values.dateOfBirth} 
                  name='dateOfBirth' onChange={handleInput} />
          {errors.dateOfBirth && <span className="text-danger">{errors.dateOfBirth}</span>}
        </div>

        <button type="submit" className='btn btn-primary'>
          {btnLabel}
        </button>

        <div>
          <NavLink className='btn btn-primary m-2' to='/'>Go to Home Page</NavLink>
        </div>

      </div>

    </form>
  );

}

export default StudentForm