import React from 'react'
import styled from 'styled-components'
import { variantStyles } from './styles'

export default function Button({
  type = 'button',
  variant = 'primary',
  disabled = false,
  onClick,
  className,
  children
}) {
  return (
    <StyledButton
      className={className}
      type={type}
      variant={variant}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  width: 100%;
${props => variantStyles[props.variant]}
  border: none;
  border-radius: 1.25rem;

  &:hover,
  &:active {
    filter: brightness(1.1);
  }

  &:disabled {
    cursor: default;
    opacity: 0.7;
    filter: none;
  }
`