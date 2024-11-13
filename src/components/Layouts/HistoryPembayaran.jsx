import React from 'react'

const BtnHistory = ({onClick, text}) => {
  return (
    <div>
      <button className='btn bg-primary text-white' onClick={onClick}>{text}</button>
    </div>
  )
}

export default BtnHistory