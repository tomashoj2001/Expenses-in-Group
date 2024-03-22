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
import { Transfer as TransfersType } from "@/hooks/useClosure";
import SelectParticipant from "../SelectParticipant";
import { Participants } from "@/hooks/useParticipants";

type IndividualTransfer = Omit<TransfersType, "id">;

interface NewTransferProps {
  participants: Participants[] | undefined;
  transfers: TransfersType[] | undefined;
  setTransfers: (newValue: TransfersType[]) => void;
}

export default function NewTransfer({ participants, transfers, setTransfers }: NewTransferProps) {
  const [expense, setTransfer] = useState<IndividualTransfer>({
    from: 0,
    amount: 0,
    to: 0,
  });
  const [from, setFrom] = useState<string>();
  const [to, setTo] = useState<string>();

  const handleNewTransfer = () => {
    const newTransfer: TransfersType = {
      ...expense,
      id: Math.round(Math.random() * 100000),
      from: Number(from),
      to: Number(to),
    };

    if (transfers) {
      setTransfers([...transfers, newTransfer]);
    } else {
      setTransfers([newTransfer]);
    }
  };

  const handleExpense = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setTransfer((curr) => ({
      ...curr,
      [name]: value,
    }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size={"sm"}>
          Nueva Transferencia
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] sm:max-w-[425px]">
        <section className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="from" className="text-right">
              De
            </Label>
            <SelectParticipant
              participants={participants}
              value={from}
              setValue={setFrom}
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
            <Label htmlFor="to" className="text-right">
              Para
            </Label>
            <SelectParticipant
              participants={participants}
              value={to}
              setValue={setTo}
            />
          </div>
        </section>
        <DialogFooter>
          <Button type="submit" onClick={handleNewTransfer}>
            Agregar Amigo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
