import React from 'react'

const Button = (props) => {
  return (
    <div>
      <button className='bg-primary rounded px-1 py-0.5 cursor-pointer border-2 border-hidden hover:border- active:scale-95'>
        {props.value}
      </button>
    </div>
  )
}

export default Button
