import React, { ComponentPropsWithoutRef } from 'react'

export function FormGroup(FormProps: ComponentPropsWithoutRef<"div">) {
  const { children, ...props } = FormProps;
  return (
    <div {...props} className={`flex flex-col mb-3 ${props.className}`}>{children}</div>
  )
}