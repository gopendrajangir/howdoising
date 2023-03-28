import React from 'react'

export const FormInput = React.forwardRef<any, any>((props, ref) => {
  return <input {...props} ref={ref} className={`border border-slate-300 h-9 focus:outline outline-2 focus:outline-slate-400 rounded pl-2 ${props.className}`} />
})