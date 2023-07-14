'use client'

import useTopUpModal from "../hooks/useTopUpModal";
import useWithdrawModal from "../hooks/useWithdrawModal";


const BalanceClient = () => {
    const withdrawmodal = useWithdrawModal();
    const TopUpModal = useTopUpModal();
    return (          <div className="flex flex-row justify-center ">
    <button onClick={withdrawmodal.onOpen} className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-1 text-center mr-2 mb-2">Withdraw</button>
    <button onClick={TopUpModal.onOpen} className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Top Up</button>
 </div> );
}
 
export default BalanceClient;