'use client';

import { Button } from '@/components/ui/button';
import { useToneStore } from '@/lib/store';
import {
  cn,
  createScale,
  getFrequency,
  noteMap,
  notesStartingByTone,
  sharpOrFlat
} from '@/lib/utils';
import { useEffect, useMemo, useState } from 'react';

export type PianoProps = {};

const tempo = 100;
const octaves = [0];
export default function Piano(props: PianoProps) {
  const { toneId, scaleName } = useToneStore();
  const [audioCtx, setAudioCtx] = useState<AudioContext>();
  const [oscillator, setOscillator] = useState<OscillatorNode>();
  useEffect(() => {
    if (typeof window !== undefined) {
      var ctx = new window.AudioContext();
      setAudioCtx(ctx);
    }
  }, []);
  function playNote(frequency: number, duration: number) {
    if (!audioCtx) return;
    // create Oscillator node
    console.log(frequency);
    var oscillator = audioCtx.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency; // value in hertz
    oscillator.connect(audioCtx.destination);
    oscillator.start();

    setTimeout(function () {
      oscillator.stop();
    }, (1000 * 256) / (duration * tempo));
  }

  const scale: number[] | undefined = useMemo(() => {
    if (scaleName === null || toneId === null) return [];
    return createScale(toneId, scaleName as string);
  }, [toneId, scaleName]);
  return (
    <>
      <div className="flex justify-center px-4">
        {notesStartingByTone(toneId || 0).map((note) => {
          return (
            <Button
              key={'note1' + note.id}
              variant={typeof note.name === 'string' ? 'outline' : 'default'}
              onClick={() => {
                playNote(getFrequency(note.distanceToA), 8);
              }}
              className={cn(
                'w-7 p-0 pb-1 h-32 text-xs items-end hover:bg-neutral-100 active:bg-neutral-200 duration-150 text-neutral-500 relative',
                typeof note.name !== 'string' &&
                  'w-6 h-20 -ml-3 -mr-3 z-2 border-white border hover:bg-neutral-800 active:bg-neutral-700'
              )}
            >
              {scale && scale.includes(note.id) && (
                <span
                  className={cn(
                    'size-6 rounded-full flex items-center justify-center shrink-0 text-white',

                    scaleName === 'Maior' ? 'bg-red-500/50' : 'bg-blue-500/50',
                    toneId === note.id &&
                      (scaleName === 'Maior' ? 'bg-red-500' : 'bg-blue-500')
                  )}
                >
                  {typeof note.symbol === 'string'
                    ? note.symbol
                    : note.symbol[
                        sharpOrFlat(toneId || 0, scaleName || 'Maior')
                      ]}
                </span>
              )}
            </Button>
          );
        })}
        {toneId !== null && (
          <Button
            variant={
              typeof noteMap[toneId].name === 'string' ? 'outline' : 'default'
            }
            onClick={() => {
              playNote(getFrequency(noteMap[toneId].distanceToA + 12), 8);
            }}
            className={cn(
              'w-7 p-0 pb-1 h-32 text-xs items-end  hover:bg-neutral-100 active:bg-neutral-200 duration-150 relative text-white',
              typeof noteMap[toneId].name !== 'string' &&
                'w-6 h-20 -ml-3 -mr-3 z-2 border-white border hover:bg-neutral-800 active:bg-neutral-700 '
            )}
          >
            <div
              className={cn(
                'size-6 rounded-full flex items-center justify-center shrink-0 text-white',
                scale && (scaleName === 'Maior' ? 'bg-red-500' : 'bg-blue-500')
              )}
            >
              {typeof noteMap[toneId].symbol === 'string'
                ? noteMap[toneId].symbol
                : noteMap[toneId].symbol[
                    sharpOrFlat(toneId || 0, scaleName || 'Maior')
                  ]}
            </div>
          </Button>
        )}
      </div>
    </>
  );
}
