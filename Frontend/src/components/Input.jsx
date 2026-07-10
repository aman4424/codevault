import React from 'react'

const Input = (props) => {
  return (
    <input
      type={props.type}
      className='bg-primary rounded w-full p-1 outline-0 focus:outline-2 focus:outline-offset-2 focus:outline-[var(--primary)]'
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
    />
  )
}

export default Input
