import React from 'react'

const Button = (props) => {
  return (
    <div>
      <button className='bg-primary rounded px-1 py-0.5 cursor-pointer   hover:outline-solid hover:outline-1 active:scale-95'>
        {props.value}
      </button>
    </div>
  )
}

export default Button
