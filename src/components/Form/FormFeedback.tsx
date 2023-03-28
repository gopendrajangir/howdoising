import React, { ComponentPropsWithoutRef } from 'react'

export function FormFeedback(feedbackProps: ComponentPropsWithoutRef<"div"> & { show: boolean | string | null }) {
  const { children, show, ...props } = feedbackProps;
  return (
    <>
      {
        show ?
          <div {...props} className={`text-red-500 text-xs mt-1 ${props.className}`}>{children}</div>
          : null
      }
    </>
  )
}