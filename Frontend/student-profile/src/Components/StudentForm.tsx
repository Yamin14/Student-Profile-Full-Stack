import { useEffect, useState } from "react";

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
    setStudent({...student, [name]: value});
  }

  //return
  return (
    <form className='text-center'>

      <h1 className='m-4'>{formHeading}</h1>

      <div className='w-50 m-auto border border-black p-2'>

        <div className='entry text-center row'>
          <label className='col-sm-6 fw-bold'>Name:</label>
          <input className='col-sm-6 w-40' type='text' defaultValue={values.name} 
                  name='name' onChange={handleInput} required />
        </div>

        <div className='entry text-center row'>
          <label className='col-sm-6 fw-bold'>Reg No:</label>
          <input className='col-sm-6 w-40' type='text' defaultValue={values.regNo} 
                  name='regNo' onChange={handleInput} required />
        </div>

        <div className='entry text-center row'>
          <label className='col-sm-6 fw-bold'>Father's Name:</label>
          <input className='col-sm-6 w-40' type='text' defaultValue={values.fatherName} 
                  name='fatherName' onChange={handleInput} required />
        </div>

        <div className='entry text-center row'>
          <label className='col-sm-6 fw-bold'>Date of Birth:</label>
          <input className='col-sm-6 w-40' type='date' defaultValue={values.dateOfBirth} 
                  name='dateOfBirth' onChange={handleInput} required />
        </div>

        <input type="button" className='btn btn-primary' 
                value={btnLabel} onClick={() => onSubmit(student)} />

      </div>

    </form>
  );

}

export default StudentForm