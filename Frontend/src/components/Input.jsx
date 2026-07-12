import React from 'react'

const Input = (props) => {
   
  return (
    <div className='w-full bg-primary rounded p-1 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--primary)]'>
      <input
        type={props.type}
        className='bg-primary rounded w-full p-1 outline-0 focus:outline-2 focus:outline-offset-2 focus:outline-[var(--primary)]'
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
      

      
    </div>
  )
}

export default Input
