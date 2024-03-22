import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogFooter,
} from "../ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { useState } from "react";
import { Expenses as ExpensesType } from "@/hooks/useExpenses";
import SelectParticipant from "../SelectParticipant";
import { ExpensesProps } from "./Expenses";

type IndividualExpense = Omit<ExpensesType, "id">;

export default function NewExpenses({
  participants,
  expenses,
  setExpenses,
}: ExpensesProps) {
  const [expense, setExpense] = useState<IndividualExpense>({
    by: 0,
    amount: 0,
    description: "",
  });
  const [participant, setParticipant] = useState<string>();

  const handleNewExpenses = () => {
    const newExpense: ExpensesType = {
      ...expense,
      id: Math.round(Math.random() * 100000),
      by: Number(participant),
    };

    if (expenses) {
      setExpenses([...expenses, newExpense]);
    } else {
      setExpenses([newExpense]);
    }
  };

  const handleExpense = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setExpense((curr) => ({
      ...curr,
      [name]: value,
    }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size={"sm"}>
          Nuevo Gasto
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] sm:max-w-[425px]">
        <section className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Participante
            </Label>
            <SelectParticipant
              participants={participants}
              value={participant}
              setValue={setParticipant}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Monto
            </Label>
            <Input
              type="number"
              id="amount"
              name="amount"
              placeholder="$"
              className="col-span-3"
              value={expense.amount}
              onChange={handleExpense}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Descripción
            </Label>
            <Input
              id="name"
              name="description"
              placeholder="Bartolomé, Paco, Rosa, Clotilde, ..."
              className="col-span-3"
              value={expense.description}
              onChange={handleExpense}
            />
          </div>
        </section>
        <DialogFooter>
          <Button type="submit" onClick={handleNewExpenses}>
            Agregar Gasto
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
