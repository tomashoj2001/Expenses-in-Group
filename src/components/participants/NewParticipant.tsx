import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { useState } from "react";
import { ParticipantsProps } from "./Participants";

export default function NewParticipant({
  participants,
  setParticipants,
}: ParticipantsProps) {
  const [name, setName] = useState("");

  const handleNewParticipant = () => {
    const newFriend = {
      id: Math.round(Math.random() * 100000),
      name,
    };

    if (participants) {
      setParticipants([...participants, newFriend]);
    } else {
      setParticipants([newFriend]);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Nuevo Amigo</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Amigo</DialogTitle>
          <DialogDescription>
            Incluí a ese amigo rata así no se salva de poner plata.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nombre
            </Label>
            <Input
              id="name"
              placeholder="Bartolomé, Paco, Rosa, Clotilde, ..."
              className="col-span-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleNewParticipant}>
            Agregar Amigo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
