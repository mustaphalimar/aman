import { create } from "zustand";

export interface UseDeviceId {
  deviceId: string;
  setDeviceId: (dId: string) => void;
}

export const useDeviceId = create<UseDeviceId>((set) => ({
  deviceId: "",

  setDeviceId: (dId: string) => set({ deviceId: dId }),
}));
