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

export default function NewMeeting() {
  const [name, setName] = useState("");

  const handleNewMeeting = () => {
    localStorage.setItem("meeting", name);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Nueva Juntada</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Juntada</DialogTitle>
          <DialogDescription>
            Creá una nueva juntada para registrar los gastos y divisiones entre
            todos los participantes.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nombre
            </Label>
            <Input
              id="name"
              placeholder="Asado con los pibes, Bowling, ..."
              className="col-span-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleNewMeeting}>
            Crear Juntada
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
