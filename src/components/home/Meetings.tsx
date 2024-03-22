"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import NewMeeting from "./NewMeeting";
import useMeetingStore from "@/hooks/useStoreMeeting";
import useDeleteLocalStorage from "@/hooks/useDeleteLocalStorage";
import { Trash } from "lucide-react";

interface MeetingsProps {
  changePage: (page: "participants") => void;
}

export default function Meetings({ changePage }: MeetingsProps) {
  const [meetings, setMeetings] = useState<string | null>();
  const setStoredMeeting = useMeetingStore((st) => st.setStoredMeeting);
  const { deleteAllLocalStorage } = useDeleteLocalStorage();

  useEffect(() => {
    if (typeof window === "undefined" || !window.localStorage) return;

    setMeetings(localStorage.getItem("meeting"));
  }, []);

  const saveMeeting = () => {
    if (typeof meetings === "string") {
      setStoredMeeting(meetings);
      changePage("participants");
    }
  };

  return (
    <Card className="max-w-[90vw] sm:max-w-[425px] flex flex-col items-center gap-8 p-4">
      <header className="flex justify-between items-center gap-8">
        <h2 className="text-xl font-mediumtext-secondary-foreground">
          Juntadas
        </h2>
        <NewMeeting />
      </header>
      {typeof meetings === "string" ? (
        <section className="flex justify-between items-center w-full bg-muted rounded-md pr-2">
          <Button
            variant={"link"}
            onClick={saveMeeting}
            className="underline text-lg"
          >
            {meetings}
          </Button>
          <button onClick={deleteAllLocalStorage}>
            <Trash color="red" />
          </button>
        </section>
      ) : (
        <p className="text-destructive text-center">
          No se encontraron registros de juntadas
        </p>
      )}
    </Card>
  );
}
