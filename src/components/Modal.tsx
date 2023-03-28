import React, { PropsWithChildren } from 'react'

interface ModalProps extends PropsWithChildren {
  modalShow: boolean
}

function Modal({ children, modalShow }: ModalProps) {
  return (
    modalShow ?
      <div className="w-screen h-screen min-h-screen fixed top-0 left-0 bg-slate-900 bg-opacity-50 z-50 flex justify-center items-center">
        {children}
      </div> : null
  )
}

export default Modal