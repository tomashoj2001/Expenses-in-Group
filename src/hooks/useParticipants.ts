import { useEffect, useState } from "react";

export type Participants = {
  id: number;
  name: string;
};

export default function useParticipants() {
  const [participants, setParticipantsState] = useState<Participants[]>();

  const setParticipants = (newValue: Participants[]) => {
    setParticipantsState(newValue);
    localStorage.setItem("participants", JSON.stringify(newValue));
  };

  const getParticipants = () => {
    if (typeof window === "undefined" || !window.localStorage) return;

    const isParticipants = localStorage.getItem("participants");
    if (isParticipants && isParticipants !== "undefined") {
      setParticipantsState(JSON.parse(isParticipants));
    }
  };

  useEffect(() => {
    getParticipants();
  }, []);

  return { participants, setParticipants, getParticipants };
}
