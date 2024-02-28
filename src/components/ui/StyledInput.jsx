import React from 'react'

export default function StyledInput({placeholder, handleOnChange, value}) {
  const InputStyle = {
    width: "100%",
    backgroundColor: "#f3f3f3",
    color: "#7E8489",
    borderRadius: "1.25rem"
  }
  return (
    <input
      style={InputStyle}
      type = "text"
      placeholder={placeholder}
      onChange={handleOnChange}
      value={value}
    />
  )
}
