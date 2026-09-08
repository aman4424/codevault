import React from 'react'

const Input = (props) => {
   
  return (
    <div className="w-full ">
      <p className='text-[var(--text)] text-base'> {props.fieldName}:</p>

      <div className=' mt-1 bg-surface rounded p-1 outline-0 focus-within:outline-border focus-within:outline-3'>
      
      <input
        type={props.type}
        className='bg-surface rounded w-full p-1 outline-0 text-sm'
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
      

      
    </div>
    </div>
  )
}

export default Input
