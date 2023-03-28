import React, { PropsWithChildren } from 'react'

interface PageSectionProps extends PropsWithChildren {
  className?: string;
  center?: boolean;
}

function PageSection(pageSectionProps: PageSectionProps) {
  const { center, ...props } = pageSectionProps;
  return (
    <div {...props} className={`h-full w-full flex flex-col ${center ? "justify-center items-center" : ""} ${props.className}`}>{props.children}</div>
  )
}

export default PageSection;