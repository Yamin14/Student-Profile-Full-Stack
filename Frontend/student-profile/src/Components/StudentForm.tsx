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

  //default object
  const [student, setStudent] = useState(values);

  useEffect(() => {
    setStudent(values)
  }, [values])
  
  //handle change
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    //validation
    if (name === 'regNo') {

      const isValid = /^\d{0,3}$/.test(value);

      if (!isValid) {
        setStudent({...student, [name]: ''});
        alert("Registration number should only contain 3 digits.");
      } else {
        setStudent({...student, [name]: value});
      }
    }

    if (name === 'name') {

      const isValid = /^[a-zA-Z\s\b]*$/.test(value);

      if (!isValid) {
        setStudent({...student, [name]: ''});
        alert("Name should contain a valid name.");
      } else {
        setStudent({...student, [name]: value});
      }
    }

    if (name === 'fatherName') {

      const isValid = /^[a-zA-Z\s\b]*$/.test(value);

      if (!isValid) {
        setStudent({...student, [name]: ''});
        alert("Father's name should contain a valid name.");
      } else {
        setStudent({...student, [name]: value});
      }
    }

    if (name === 'dateOfBirth') {
      setStudent({...student, [name]: value});
    }

  }

  //handle submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const minDate = '1990';
    const maxDate = '2007';
    const value = student.dateOfBirth.substring(0,4);

    if ( value.substring(0, 4) < minDate || value.substring(0, 4) > maxDate) {
      setStudent({...student, ["dateOfBirth"]: ''});
      alert("Date of birth must be between the years 1990 and 2007.")
    } else {
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
                  name='name' placeholder="e.g. Yamin" minLength={2} maxLength={40}
                  onChange={handleInput} required />
        </div>

        <div className='entry text-center row'>
          <label className='col-sm-6 fw-bold'>Reg No:</label>
          <input className='col-sm-6 w-40' type='text' defaultValue={values.regNo} 
                  name='regNo' placeholder="e.g. 027" maxLength={3} minLength={3}
                   onChange={handleInput} required />
        </div>

        <div className='entry text-center row'>
          <label className='col-sm-6 fw-bold'>Father's Name:</label>
          <input className='col-sm-6 w-40' type='text' defaultValue={values.fatherName} 
                  name='fatherName' placeholder="e.g. Ali" minLength={2} maxLength={40}
                  onChange={handleInput} required />
        </div>

        <div className='entry text-center row'>
          <label className='col-sm-6 fw-bold'>Date of Birth:</label>
          <input className='col-sm-6 w-40' type='date' defaultValue={values.dateOfBirth} 
                  name='dateOfBirth' onChange={handleInput} required />
        </div>

        <input type="submit" className='btn btn-primary'
          value={btnLabel} />

        <div>
          <NavLink className='btn btn-primary m-2' to='/'>Go to Home Page</NavLink>
        </div>

      </div>

    </form>
  );

}

export default StudentForm