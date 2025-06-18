import React from 'react'
import ViewModel from './ViewModel.tsx';

const EllipsesModel= () => {
  return (
    <div className="flex flex-row">
        <button className='text-white p-2 rounded-md bg-gray-600 mx-2' onClick={()=><ViewModel/>}>View</button>
        <ViewModel/>
       <button className='text-white  p-2 rounded-md bg-gray-600 mx-2' onClick={()=>alert('delete button clicked')}>Delete</button>
       <button className='text-white  p-2 rounded-md bg-gray-600 mx-2' onClick={()=>alert('update button clicked')}>Update</button>
    </div>
  )
}

export default EllipsesModel;
