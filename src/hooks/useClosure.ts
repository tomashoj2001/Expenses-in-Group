import { useEffect, useState } from "react";

export type Transfer = {
  id: number;
  from: number;
  amount: number;
  to: number;
};

export default function useClosure() {
  const [transfers, setTransfersState] = useState<Transfer[]>();

  const setTransfers = (newValue: Transfer[]) => {
    setTransfersState(newValue);
    localStorage.setItem("transfer", JSON.stringify(newValue));
  };

  const getTransfers = () => {
    if (typeof window === "undefined" || !window.localStorage) return;

    const isTransfer = localStorage.getItem("transfer");
    if (isTransfer && isTransfer !== "undefined") {
      setTransfersState(JSON.parse(isTransfer));
    }
  };

  useEffect(() => {
    getTransfers();
  }, []);

  return { transfers, setTransfers };
}
