'use client'

import axios from 'axios';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/input';
import { toast } from 'react-hot-toast';
import useLoginModal from '@/app/hooks/useLoginModal';
import Router from 'next/navigation';
import { useRouter } from 'next/navigation';


const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } =
    useForm<FieldValues>({
      defaultValues: {
        username: '',
        password: '',
        name: '',
        age: '',
      },
    });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    toast.promise(
      axios.post('/api/register', data),
      {
        loading: 'Submitting...',
        success: 'Registration successful!',
        error: 'Something went wrong.',
      }
    )
      .then(() => {
        registerModal.onClose();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
        router.refresh()
      
        
      });
  };

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='Welcome to SEACINEMA' subtitle='Create an account!' center />
      <Input
        id="username"
        label="Username"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type='password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="age"
        label="Age"
        type='number'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      <div className='text-neutral-500 text-center mt-4 font-light'>
        <div className='justify-center flex flex-row items-center gap-2'>
          <div>Already have an account?</div>
          <div onClick={() => {registerModal.onClose();loginModal.onOpen();} }className='text-neutral-800 cursor-pointer hover:underline'>Log in.</div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel='Continue'
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
