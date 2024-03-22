"use client";

import { Card } from "@/components/ui/card";
import useMeetingStore from "@/hooks/useStoreMeeting";
import NewTransfer from "./NewTransfer";
import { Participants as ParticipantsType } from "@/hooks/useParticipants";
import { Expenses as ExpensesType } from "@/hooks/useExpenses";
import { Transfer as TransferType } from "@/hooks/useClosure";

export interface ClosureProps {
  participants: ParticipantsType[] | undefined;
  expenses: ExpensesType[] | undefined;
  transfers: TransferType[] | undefined;
  setTransfers: (newValue: TransferType[]) => void;
}

export default function Closure({
  participants,
  expenses,
  transfers,
  setTransfers,
}: ClosureProps) {
  const meeting = useMeetingStore((st) => st.storedMeeting);

  const totalPrice = expenses?.reduce((total, exp) => {
    return total + Number(exp.amount);
  }, 0);

  const totalByParticipant: number =
    typeof totalPrice === "number" && participants
      ? Math.round(totalPrice / participants?.length)
      : 0;

  return (
    <main className="w-[90vw] max-w-[425px]">
      <h1 className="text-center text-3xl font-semibold mb-4">{meeting}</h1>
      <Card className="w-full flex flex-col items-center p-4">
        <section className="flex w-full justify-between items-center">
          <h2 className="text-2xl font-semibold text-secondary-foreground">
            Balance
          </h2>
          <NewTransfer
            participants={participants}
            transfers={transfers}
            setTransfers={setTransfers}
          />
        </section>
        <section className="w-full grid mt-4 mb-2 pb-2 border-b border-foreground">
          <header className="grid grid-cols-3 mb-2">
            <h3 className="font-medium">Nombre</h3>
            <h3 className="font-medium">Pagado</h3>
            <h3 className="font-medium">Saldo</h3>
          </header>
          {participants && expenses ? (
            participants.map((item, index) => {
              const total = expenses.reduce((total, exp) => {
                return Number(exp.by) === item.id
                  ? total + Number(exp.amount)
                  : total;
              }, 0);

              const balance = total - totalByParticipant;

              return (
                <div
                  key={item.id}
                  className={`grid grid-cols-3 py-1 px-2 rounded-md ${
                    index % 2 === 0 && "bg-muted"
                  }`}
                >
                  <p>{item.name}</p>
                  <p>$ {total}</p>
                  <p
                    className={balance > 0 ? "text-green-600" : "text-red-600"}
                  >
                    $ {balance.toString().slice(balance > 0 ? 0 : 1)}
                  </p>
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
    </main>
  );
}
