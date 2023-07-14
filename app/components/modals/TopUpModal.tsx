'use client'

import Modal from "./Modal";
import { useState } from "react";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import {toast} from "react-hot-toast"
import { useRouter } from "next/navigation";
import Heading from "../Heading";
import Input from "../inputs/input";
import useTopUpModal from "@/app/hooks/useTopUpModal";

const TopUpModal = ()=>{
    const router = useRouter();
    const TopUpModal = useTopUpModal();
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } =
    useForm<FieldValues>({
      defaultValues: {
        amount: '',
      },
    });
    const onTopUp : SubmitHandler<FieldValues> = async (data) => {
      try {
        setIsLoading (true);
        const toastId = toast.loading('Loading...')
        
            const response = await axios.post('/api/topups', data);
        
            if (response?.status ===200) {
              toast.dismiss(toastId);
                toast.success('Top Up successful');
                router.refresh();
                TopUpModal.onClose();
            } else {
              toast.dismiss(toastId);
              toast.error(response.data.error);
            }
            } catch (error : any) {
          toast.dismiss()
            toast.error(error.message);
            } finally {
            setIsLoading(false);
            }
        };
      const bodyContent = (
        <div className='flex flex-col gap-4'>
          <Heading title='Welcome to SEACINEMA' subtitle='Top Up right Now!' center />
          <Input
            id="amount"
            label="amount"
            type='number'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>
      );
      
  
      
return(
  <Modal
  disabled={isLoading}
  isOpen={TopUpModal.isOpen}
  title="Top Up"
  actionLabel='Top Up Now'
  onClose={TopUpModal.onClose}
  onSubmit={handleSubmit(onTopUp)}
  body={bodyContent}
/>
)
};
export default TopUpModal;