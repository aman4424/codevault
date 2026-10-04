import React from 'react'

const Button = (props) => {
  //  const disable=props.disabled;
  return (
   


    <div>
      <button className='bg-primary rounded px-1 py-0.5 cursor-pointer   disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-hover enabled:hover:scale-105 enabled:hover:outline-1 enabled:active:scale-95'  onClick={props.onClickAction}  disabled={props.disabled}>
        {props.value}
      </button>
    </div>
  )
}

export default Button
