"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import NewMeeting from "./NewMeeting";
import useMeetingStore from "@/hooks/useStoreMeeting";

interface MeetingsProps {
  changePage: (page: "participants") => void;
}

export default function Meetings({ changePage }: MeetingsProps) {
  const [meetings, setMeetings] = useState<string | null>();
  const setStoredMeeting = useMeetingStore((st) => st.setStoredMeeting);

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
    <>
      <h1 className="text-center text-3xl font-semibold mb-4">Juntadas</h1>
      <Card className="max-w-[90vw] sm:max-w-[425px] flex flex-col items-center p-4">
        <h2 className="text-xl font-mediumtext-secondary-foreground">
          Juntadas Existentes
        </h2>
        {typeof meetings === "string" ? (
          <Button variant={"link"} onClick={saveMeeting}>
            {meetings}
          </Button>
        ) : (
          <p className="text-destructive text-center">
            No se encontraron registros de juntadas
          </p>
        )}
        <div className="mt-4">
          <NewMeeting />
        </div>
      </Card>
    </>
  );
}
