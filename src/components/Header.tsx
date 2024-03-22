import { PageProp } from "@/App";
import { Button } from "./ui/button";

interface HeaderProps {
  page: PageProp;
  changePage: (page: PageProp) => void;
}

export default function Header({ page, changePage }: HeaderProps) {
  return (
    <header className="flex container items-center justify-center py-4 bg-background/80 border-b border-accent">
      <ul className="flex gap-8">
        <button
          onClick={() => changePage("participants")}
          className={`text-center font-semibold text-lg underline transition-all ${
            page === "participants"
              ? "decoration-inherit"
              : "decoration-transparent"
          }`}
        >
          Amigos
        </button>
        <button
          onClick={() => changePage("expenses")}
          className={`text-center font-semibold text-lg underline transition-all ${
            page === "expenses"
              ? "decoration-inherit"
              : "decoration-transparent"
          }`}
        >
          Gastos
        </button>
        <button
          onClick={() => changePage("closure")}
          className={`text-center font-semibold text-lg underline transition-all ${
            page === "closure" ? "decoration-inherit" : "decoration-transparent"
          }`}
        >
          Cierre
        </button>
      </ul>
      <Button
        variant={"default"}
        size={"sm"}
        onClick={() => changePage("home")}
        className={`absolute bottom-4 right-4 transition-all ${
          page === "home" ? "scale-0" : "scale-100"
        }`}
      >
        Inicio
      </Button>
    </header>
  );
}
