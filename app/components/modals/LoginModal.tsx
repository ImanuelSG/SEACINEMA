'use client'

import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/input';
import { toast } from 'react-hot-toast';
import useLoginModal from '@/app/hooks/useLoginModal';
import {signIn} from 'next-auth/react'
import { useRouter } from 'next/navigation';

const LoginModal = () => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } =
    useForm<FieldValues>({
      defaultValues: {
        username: '',
        password: '',
      },
    });

  
const onSubmit: SubmitHandler<FieldValues> = (data) => {
  setIsLoading(true);
  toast.loading("Loading...")
    signIn('credentials', {
      ...data,
      redirect: false,
    })
    
    .then((callback) => {
      toast.dismiss();
      setIsLoading(false);
      
      if (callback?.ok) {
        toast.success("Logged in");
        router.refresh();
        
      }
      if (callback?.error){
        toast.error(callback.error)
      }
      loginModal.onClose();
    })
    .catch((error) => {
      console.error(error);
      setIsLoading(false);
    });
};

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='Welcome to SEACINEMA' subtitle='Login to your account!' center />
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
    </div>
  );

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      <div className='text-neutral-500 text-center mt-4 font-light'>
        <div className='justify-center flex flex-row items-center gap-2'>
          <div>Dont have an account?</div>
          <div onClick={() => {loginModal.onClose();registerModal.onOpen();
  
}} className='text-neutral-800 cursor-pointer hover:underline'>Register.</div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel='Log In'
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
