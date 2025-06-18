import React from 'react'
import ButtonField from './ButtonField.tsx'

const ViewModel = () => {
  return (
    <div className='  fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50 bg-gray-900 pt-10 pb-10 w-96 mx-96 my-60 rounded-md'>
      <div className='flex flex-col'>
                <h2 className='text-white'>Are you Sure you want to delete ?</h2>
                <div className='flex flex-row gap-2'>
                                <ButtonField buttonName={"Confirm"}/>
                                <ButtonField buttonName={"Cancel"}/>
                </div>
        </div>
    </div>
  )
}

export default ViewModel
