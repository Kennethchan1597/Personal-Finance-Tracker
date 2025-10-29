import React, { createContext, useContext, useEffect, useState } from "react";
import { transactionAxios } from "../api/transactionsApi";

type TransContextType = {
  date: string,
  amount: string,
  category: string,
  description: string,
  balance: string,
  transactions: Transaction[]
  error: string,
  setDate: React.Dispatch<React.SetStateAction<string>>,
  setCategory: React.Dispatch<React.SetStateAction<string>>,
  setAmount: React.Dispatch<React.SetStateAction<string>>,
  setDescription: React.Dispatch<React.SetStateAction<string>>,
  refreshTransactions: () => void,
}

const TransContext = createContext<TransContextType>({
  date: "",
  amount: "",
  category: "",
  description: "",
  balance: "",
  transactions: [],
  error: "",
  setDate: () => { },
  setCategory: () => { },
  setAmount: () => { },
  setDescription: () => { },
  refreshTransactions: () => { },
});

type Transaction = {
  id: number;
  amount: string;
  description: string;
  date: string;
  category: string;
  type: "INCOME" | "EXPENSE";
};

export const TransProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [date, setDate] = useState<string>("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [balance, setBalance] = useState<string>("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionUpdated, setTransactionUpdated] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const getBalance = async () => {
    try {
      const response = await transactionAxios.get("/balance")
      setBalance(response.data)
    } catch (error: any) {
      setError(error.response.data.message)
    }
  }

  const getAlltransactions = async () => {
    try {
      const response = await transactionAxios.get<Transaction[]>("");
      setTransactions(response.data);
    } catch (error: any) {
      setError(error.response.data.message)
    }
  }

  const refreshTransactions = () => {
    setTransactionUpdated(prev => !prev);
  };

  useEffect(() => {
    getBalance();
    getAlltransactions();
  }, [transactionUpdated])

  return (
    <TransContext.Provider value={{ date, category, amount, description, balance, transactions, error, setDate, setCategory, setAmount, setDescription, refreshTransactions }}>
      {children}
    </TransContext.Provider>
  );
}

export const useTransaction = () => useContext(TransContext);

{/* getAlltransactions, return json array -> const transactions = [{...amount}] Flatlist data key render = () => {retuurn component} */ }