import { useEffect, useState } from "react";

export type Expenses = {
  id: number;
  description: string;
  amount: number;
  by: number;
};

export default function useExpenses() {
  const [expenses, setExpensesState] = useState<Expenses[]>();

  const setExpenses = (newValue: Expenses[]) => {
    setExpensesState(newValue);
    localStorage.setItem("expenses", JSON.stringify(newValue));
  };

  const getExpenses = () => {
    if (typeof window === "undefined" || !window.localStorage) return;

    const isExpenses = localStorage.getItem("expenses");
    if (isExpenses && isExpenses !== "undefined") {
      setExpensesState(JSON.parse(isExpenses));
    }
  };

  useEffect(() => {
    getExpenses();
  }, []);

  return { expenses, setExpenses, getExpenses };
}
