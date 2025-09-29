'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useToneStore } from '@/lib/store';
import { modes, noteMap, notes } from '@/lib/utils';

export type ToneSelectProps = {};

export default function ToneSelect(props: ToneSelectProps) {
  const { setToneId, toneId, setScaleName, scaleName } = useToneStore();
  return (
    <div className="grid grid-cols-2 gap-2 px-2">
      <Select
        value={(toneId || 0).toString() || '0'}
        onValueChange={(v) => {
          setToneId(parseInt(v));
        }}
      >
        <SelectTrigger className="bg-white w-full">
          <SelectValue placeholder="Tom" />
        </SelectTrigger>
        <SelectContent>
          {notes.map((note) => {
            return (
              <SelectItem key={'select' + note.id} value={note.id.toString()}>
                {typeof note.symbol === 'string' ? note.symbol : note.symbol[1]}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <Select
        value={scaleName || 'Maior'}
        onValueChange={(v) => {
          setScaleName(v);
        }}
      >
        <SelectTrigger className="bg-white w-full">
          <SelectValue placeholder="Escala" />
        </SelectTrigger>
        <SelectContent>
          {modes.map((mode) => {
            return (
              <SelectItem key={'scale' + mode.name} value={mode.name}>
                {mode.name}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
