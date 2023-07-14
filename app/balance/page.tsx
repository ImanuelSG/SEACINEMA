import getCurrentUser from "@/app/actions/getCurrentUser";
import { redirect } from "next/navigation";
import BalanceClient from "./BalanceClient";
import getTransaction from "../actions/getTransaction";

const formatReserveDate = (date : any) => {
  const options = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

const BalancePage = async () => {
  const user = await getCurrentUser();
  const transactions = await getTransaction();
  if (!user || user.balance == null || !transactions) {
    redirect("/");
  }
  const formattedBalance = user.balance.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <>
      <div className="text-center pt-10">
        <div className="font-extrabold text-3xl">Hi, {user.name} </div>
        <div className="text-lg mt-5 mb-5">Your balance :</div>
        <div className="text-xl font-semibold text-red-500 mb-5">{formattedBalance}</div>
        <BalanceClient />
        {Array.isArray(transactions) ? (
          <table className="border-2 border-slate-950 mx-auto mt-5">
            <thead>
              <tr>
                <th className="border-2 border-slate-950 py-2 px-4">Transaction ID</th>
                <th className="border-2 border-slate-950 py-2 px-4">Transaction Date</th>
                <th className="border-2 border-slate-950 py-2 px-4">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="border-2 border-slate-950 py-2 px-4">{transaction.id}</td>
                  <td className="border-2 border-slate-950 py-2 px-4">
                    {formatReserveDate(transaction.reservedate)}
                  </td>
                  <td
                    className={`border-2 border-slate-950 py-2 px-4 ${
                      transaction.amount >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {transaction.totalprice==0 || transaction.totalprice==null?(transaction.amount.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })):(transaction.totalprice.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="">No transactions found.</div>
        )}
      </div>{" "}
    </>
  );
};

export default BalancePage;
