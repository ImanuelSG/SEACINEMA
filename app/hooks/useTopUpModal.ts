import { create } from 'zustand' ;

interface TopUpModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose : () => void;

}

const useTopUpModal = create <TopUpModalStore>((set) => ({
    isOpen : false,
    onOpen: () => set({ isOpen: true}),
    onClose : () => set({ isOpen: false}),
}));

export default useTopUpModal;