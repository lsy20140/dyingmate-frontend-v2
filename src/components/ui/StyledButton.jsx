import React from 'react'

export default function StyledButton({width, text, textColor, btnColor, handleOnClick}) {
  const ButtonStyle = {
    width: `${width}`,
    color:  `${textColor}`,
    fontWeight: "700",
    borderRadius: "1.25rem",
    backgroundColor: `${btnColor}`,
    padding: "0.75rem 0",
    border: "none"
  }

  return (
    <button 
      style={ButtonStyle}
      onClick={(e) => {
        e.preventDefault()
        handleOnClick && handleOnClick()
      }}
    >
      {text}
    </button>
  )
}
