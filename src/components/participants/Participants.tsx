"use client";
import { Card } from "@/components/ui/card";
import NewParticipant from "./NewParticipant";
import useMeetingStore from "@/hooks/useStoreMeeting";
import { Participants as ParticipantsType } from "@/hooks/useParticipants";
import { Trash } from "lucide-react";

export interface ParticipantsProps {
  participants: ParticipantsType[] | undefined;
  setParticipants: (newValue: ParticipantsType[]) => void;
}

export default function Participants({
  participants,
  setParticipants,
}: ParticipantsProps) {
  const meeting = useMeetingStore((st) => st.storedMeeting);

  const deleteParticipant = (participantId: number) => {
    const newParticipantsList = participants?.filter(
      ({ id }) => id !== participantId
    );

    newParticipantsList && setParticipants(newParticipantsList);
  };

  return (
    <>
      <h1 className="text-center text-3xl font-semibold mb-4">{meeting}</h1>
      <Card className="w-[90vw] max-w-[425px] flex flex-col items-center p-4">
        <header className="w-full flex justify-between items-center">
          <h2 className="text-xl font-mediumtext-secondary-foreground">
            Participantes
          </h2>
          <NewParticipant
            participants={participants}
            setParticipants={setParticipants}
          />
        </header>
        <section className="w-full grid gap-2 my-2">
          {participants ? (
            participants.map((item, index) => (
              <div
                key={item.id}
                className={`flex justify-between items-center py-1 px-2 rounded-md ${
                  index % 2 === 0 && "bg-muted"
                }`}
              >
                <p>{item.name}</p>
                <button onClick={() => deleteParticipant(item.id)}>
                  <Trash color="red" size={18} />
                </button>
              </div>
            ))
          ) : (
            <p className="text-destructive text-center">
              No se encontraron amigos :(
            </p>
          )}
        </section>
      </Card>
    </>
  );
}
