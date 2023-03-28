import React, { ComponentPropsWithoutRef } from 'react'

export function FormLabel(labelProps: ComponentPropsWithoutRef<"label">) {
  const { children, ...props } = labelProps;
  return (
    <label {...props} className={`text-md text-slate-800 mb-1 ${props.className}`}>{children}</label>
  )
}