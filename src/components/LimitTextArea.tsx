import React, { ComponentPropsWithoutRef, useEffect, useState } from 'react'
import { FieldValues, UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form';
import styled from 'styled-components';

const TextAreaWrapper = styled.div`
  width: 100%;
  height: 100px;
  margin-top: 10px;
  padding: 0;
  position: relative;
`
const CharacterLeftCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  font-size: 10px;
  color: #444;
  padding: 2px 5px;
  top: -20px;
  right: 2px;
`

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  border-radius: 3px;
  resize: none;
  font-size: 13px;
  padding: 8px 10px;
  border: none;
  outline: none;
  // background-color: transparent;
  border: 1px solid #ddd;
  color: #555;

  /* width */
  &::-webkit-scrollbar {
    width: 6px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #666;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #aaa;
  }
`

interface LimitTextAreaProps {
  register: () => UseFormRegisterReturn;
  value: string;
  type: string;
  limit: number;
  setValue: UseFormSetValue<FieldValues>;
  placeholder: string;
  disabled: boolean;
  id: string
}

function LimitTextArea({ register, value, type, setValue, placeholder, limit, disabled = false, id }: LimitTextAreaProps) {
  return (
    <TextAreaWrapper>
      <CharacterLeftCount>{limit - value.length}</CharacterLeftCount>
      <TextArea
        {...register()}
        id={id}
        onChange={(e: { target: { value: string } }) => {
          if (e.target.value.length <= 500) {
            e.target.value = e.target.value.substring(0, limit);
            setValue(type, e.target.value);
          } else {
            e.target.value = e.target.value.substring(0, limit);
          }
        }}
        name={type}
        as="textarea"
        placeholder={placeholder}
        draggable={false}
        disabled={disabled}
      />
    </TextAreaWrapper>
  )
}


export default LimitTextArea