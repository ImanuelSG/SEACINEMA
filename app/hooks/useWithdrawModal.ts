import { create } from 'zustand' ;

interface WithdrawModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose : () => void;

}

const useWithdrawModal = create <WithdrawModalStore>((set) => ({
    isOpen : false,
    onOpen: () => set({ isOpen: true}),
    onClose : () => set({ isOpen: false}),
}));

export default useWithdrawModal;