import React from 'react'

export default function IconStyledButton({width, text, fontSize, fontWeight, color, btnColor, icon, handleOnClick}) {
  const ButtonStyle = {
    width: `${width}`,
    color: `${color}`,
    fontWeight: `${fontWeight}`,
    borderRadius: "0.75rem",
    backgroundColor: `${btnColor}`,
    padding: "1rem 0",
    border: "none",
    display: 'flex',
    gap: '0.75rem',
    justifyContent: 'center',
    fontSize:`${fontSize}`,
  }

  return (
    <button 
      style={ButtonStyle}
      onClick={(e) => {
        e.preventDefault()
        handleOnClick && handleOnClick()
      }}
    >
      <p>{text}</p>
      {icon}
    </button>
  )
}
