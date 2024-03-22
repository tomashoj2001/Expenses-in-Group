"use client";

import NewExpenses from "./NewExpenses";
import { Card } from "@/components/ui/card";
import useMeetingStore from "@/hooks/useStoreMeeting";
import { Expenses as ExpensesType } from "@/hooks/useExpenses";
import { Participants as ParticipantsType } from "@/hooks/useParticipants";
import { Trash } from "lucide-react";

export interface ExpensesProps {
  participants: ParticipantsType[] | undefined;
  expenses: ExpensesType[] | undefined;
  setExpenses: (newValue: ExpensesType[]) => void;
}

export default function Expenses({
  participants,
  expenses,
  setExpenses,
}: ExpensesProps) {
  const meeting = useMeetingStore((st) => st.storedMeeting);

  const totalPrice = expenses?.reduce((total, exp) => {
    return total + Number(exp.amount);
  }, 0);

  const totalByParticipant =
    typeof totalPrice === "number" &&
    participants &&
    Math.round(totalPrice / participants?.length);

  const deleteExpense = (expenseId: number) => {
    const newExpensesList = expenses?.filter(({ id }) => id !== expenseId);

    newExpensesList && setExpenses(newExpensesList);
  };

  return (
    <section className="w-[90vw] max-w-[425px]">
      <h1 className="text-center text-3xl font-semibold mb-4">{meeting}</h1>
      <Card className="w-full flex flex-col items-center p-4">
        <section className="flex w-full justify-between items-center">
          <h2 className="text-2xl font-semibold text-secondary-foreground">
            Gastos
          </h2>
          <NewExpenses
            participants={participants}
            expenses={expenses}
            setExpenses={setExpenses}
          />
        </section>
        <section className="w-full grid mt-4 mb-2 pb-2 border-b border-foreground">
          <header className="grid grid-cols-7 mb-2">
            <h3 className="font-medium col-span-2 text-left">Nombre</h3>
            <h3 className="font-medium col-span-2 text-left">Monto</h3>
            <h3 className="font-medium col-span-3 text-left">Descripción</h3>
          </header>
          {expenses ? (
            expenses.map((item, index) => {
              const name = participants?.find(({ id }) => item.by === id)?.name;
              return (
                <div
                  key={item.id}
                  className={`relative grid grid-cols-7 items-center py-1 px-2 rounded-md ${
                    index % 2 === 0 && "bg-muted"
                  }`}
                >
                  <p className="col-span-2 text-left">{name}</p>
                  <p className="col-span-2 text-left">$ {item.amount}</p>
                  <p className="col-span-3 text-left">{item.description}</p>
                  <button
                    onClick={() => deleteExpense(item.id)}
                    className="absolute right-1"
                  >
                    <Trash color="red" size={18} />
                  </button>
                </div>
              );
            })
          ) : (
            <p className="text-destructive text-center">
              Aún no se registraron gastos
            </p>
          )}
        </section>
        {expenses && (
          <section className="w-full">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Total</h3>
              <p>${totalPrice}</p>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Total por persona</h3>
              <p>${totalByParticipant}</p>
            </div>
          </section>
        )}
      </Card>
    </section>
  );
}
