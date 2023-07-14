'use client'

import Modal from "./Modal";
import { useState } from "react";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import {toast} from "react-hot-toast"
import { useRouter } from "next/navigation";
import Heading from "../Heading";
import Input from "../inputs/input";

import useWithdrawModal from "@/app/hooks/useWithdrawModal";

const WithdrawModal = ()=>{
    const router = useRouter();
    const withdrawmodal = useWithdrawModal();
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } =
    useForm<FieldValues>({
      defaultValues: {
        amount: '',
      },
    });
    const onWithdraw : SubmitHandler<FieldValues> = async (data) => {
      
        const amountValue = parseFloat(data.amount);
        if (isNaN(amountValue)) {
          toast.error('Withdraw Failed');
          return;
        }
        if (amountValue > 500000) {
          toast.error('Withdraw exceeds 500,000');
          return;
        }
        try {
        setIsLoading(true);
        const toastId = toast.loading('Loading...');
        
        data.amount = -amountValue; // Convert the value to negative
        const response = await axios.post('/api/withdraw', data);
    
        if (response?.status === 200) {
          toast.dismiss(toastId);
          toast.success('Withdraw successful');
          router.refresh();
          withdrawmodal.onClose();
        } else {
          toast.dismiss(toastId);
          toast.error(response.data.error);
        }
      } catch (error : any) {
        toast.dismiss()
        toast.error("Insufficient Balance");
      } finally {
        setIsLoading(false);
      }
    };
          const bodyContent = (
            <div className='flex flex-col gap-4'>
              <Heading title='Welcome to SEACINEMA' subtitle='Withdraw ( Maximum Rp 500.000 rupiah )' center />
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
  isOpen={withdrawmodal.isOpen}
  title="Withdraw"
  actionLabel='Withdraw'
  onClose={withdrawmodal.onClose}
  onSubmit={handleSubmit(onWithdraw)}
  body={bodyContent}
/>
)
};
export default WithdrawModal;