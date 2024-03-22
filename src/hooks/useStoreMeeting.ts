import { create } from "zustand";

interface MeetingState {
  storedMeeting: string | null;
  setStoredMeeting: (newMeeting: string | null) => void;
}

const useMeetingStore = create<MeetingState>()((set) => ({
  storedMeeting: null,
  setStoredMeeting: (newMeeting) => set(() => ({ storedMeeting: newMeeting })),
}));

export default useMeetingStore;
