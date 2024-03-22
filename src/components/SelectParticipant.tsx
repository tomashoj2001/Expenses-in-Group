import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Participants } from "@/hooks/useParticipants";

interface SelectParticipantProp {
  participants: Participants[] | undefined;
  value: string | undefined;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function SelectParticipant({
  participants,
  value,
  setValue,
}: SelectParticipantProp) {
  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="col-span-3">
        <SelectValue placeholder="Seleccioná un participante" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Participantes</SelectLabel>
          {participants?.map((item) => {
            return (
              <SelectItem key={item.id} value={item.id.toString()}>
                {item.name}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
