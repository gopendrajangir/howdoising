import React, { useRef, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';

import { FormGroup, FormInput, FormLabel, FormFeedback } from 'components/Form';

import Button from 'components/utils/Button';

import Sprite from 'assets/img/sprite.svg';

import { updateName } from 'actions/user/update';

import { useAppDispatch } from 'hooks/useAppDispatch';

function NameUpdater({ name: currentName }: { name: string }) {
  const { register, setValue, handleSubmit, formState: { errors } } = useForm()

  const [showForm, setShowForm] = useState(false);
  const [isUpdatingName, setIsUpdatingName] = useState(false);

  const dispatch = useAppDispatch();

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    }
  }, [])

  useEffect(() => {
    setValue('name', currentName);
  }, [currentName]);

  return (
    <div>
      {
        !showForm ?
          <div>
            <FormGroup>
              <FormLabel htmlFor="input_name">Name</FormLabel>
              <div className="flex">
                <FormInput disabled={true} id="input_name" value={currentName} />
                <Button className="ml-1 h-9 w-9 p-0 flex justify-center items-center" onClick={() => setShowForm(true)}>
                  <svg className="h-4 w-4 fill-white">
                    <use xlinkHref={`${Sprite}#icon-pencil`} />
                  </svg>
                </Button>
              </div>
            </FormGroup>
          </div>
          :
          <form onSubmit={handleSubmit((data) => {
            setIsUpdatingName(true);
            dispatch(updateName(data));
            if (isMounted.current) {
              setIsUpdatingName(false);
              setShowForm(false);
            }
          })}>
            <FormGroup>
              <FormLabel htmlFor="input_name">Name</FormLabel>
              <div className="flex">
                <div>
                  <FormInput autoFocus={true} id="input_name" {...register("name", { required: true, minLength: 5, maxLength: 20 })} name="name" type="text" placeholder="Enter Name" />
                  <FormFeedback show={errors.name}>
                    {
                      errors.name
                        ?
                        errors.name.type === 'required'
                          ?
                          "Please provide a name"
                          :
                          errors.name.type === 'minLength'
                            ?
                            "Title must be atleast 5 characters long"
                            :
                            errors.name.type === 'maxLength'
                              ?
                              "Title must be less than or equal to 20 characters"
                              :
                              null
                        :
                        null
                    }
                  </FormFeedback>
                </div>
                <Button type="submit" disabled={isUpdatingName}
                  className="ml-1 h-9 w-9 p-0 flex justify-center items-center"
                >
                  <svg className="h-4 w-4 fill-white">
                    <use xlinkHref={`${Sprite}#icon-checkmark`} />
                  </svg>
                </Button>
                <Button className="!bg-red-500 ml-1 ml-1 h-9 w-9 p-0 flex justify-center items-center" onClick={() => setShowForm(false)} type="button" disabled={isUpdatingName}>
                  <svg className="h-4 w-4 fill-white">
                    <use xlinkHref={`${Sprite}#icon-cross`} />
                  </svg>
                </Button>
              </div>
            </FormGroup>
          </form>
      }
    </div>
  )
}

export default NameUpdater;