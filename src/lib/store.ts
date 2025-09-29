import { create } from 'zustand';
import { createScale, modes } from './utils';

interface ToneState {
  toneId: number | null;
  setToneId: (toneId: number) => void;
  scaleName: string | null;
  setScaleName: (name: string) => void;
}

export const useToneStore = create<ToneState>()((set) => ({
  toneId: 0,
  setToneId: (id) => set((state) => ({ ...state, toneId: id })),
  scaleName: 'Maior',
  setScaleName: (name) => set((state) => ({ ...state, scaleName: name }))
}));
