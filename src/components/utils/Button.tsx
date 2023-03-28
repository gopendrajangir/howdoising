import React, { ComponentPropsWithoutRef } from 'react'
import { ThreeDots } from 'react-loader-spinner';

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  disableOnly?: boolean
}

function Button(buttonProps: ButtonProps) {
  const { children, disableOnly, ...props } = buttonProps;
  return (
    <button disabled={props.disabled || disableOnly} className={`flex items-center justify-center bg-slate-700 hover:bg-slate-600 ${(props.disabled || disableOnly) && "bg-slate-600"} text-white text-xs p-3 rounded ${props.className ? props.className : ''}`} onClick={props.onClick}>
      {
        props.disabled && !disableOnly ?
          <span>
            <ThreeDots color="#cbd5e1" height={16} width={30} />
          </span>
          :
          <span>
            {children}
          </span>
      }
    </button>
  )
}

export default Button