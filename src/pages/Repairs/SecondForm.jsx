import React from 'react'
import { TextAreaInput } from '../../assets/Inputs/TextAreaInput'

const SecondForm = () => {
  return (
    <div className="bg-white  rounded-xl p-6 shadow-2xl">
      <h3 className="text-lg font-semibold mb-4">مرحله دو — شرح موضوع</h3>
      <hr className='mb-7  border-purple-400'/>
      <TextAreaInput label="شرح مشکل" name="issue" placeholder="یادداشت کنید" />
    </div>
  )
}

export default SecondForm