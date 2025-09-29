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
      <div className="flex justify-center px-4 gap-0.5">
        {octaves.map((octave) => {
          return notesStartingByTone(toneId || 0).map((note) => {
            return (
              <Button
                key={JSON.stringify(octave) + 'note1' + note.id}
                variant={typeof note.name === 'string' ? 'outline' : 'default'}
                onClick={() => {
                  playNote(getFrequency(note.distanceToA + octave), 8);
                }}
                className={cn(
                  'w-[calc(100%/8)] h-56 text-xs items-end hover:bg-neutral-100 active:bg-neutral-200 duration-150 text-neutral-500 relative',
                  typeof note.name !== 'string' &&
                    'w-[calc(80%/8)] h-36 -ml-[calc(40%/8)] -mr-[calc(40%/7.5)] z-2 border-white border hover:bg-neutral-800 active:bg-neutral-700'
                )}
              >
                {scale && scale.includes(note.id) && (
                  <span
                    className={cn(
                      'h-8 w-8 rounded-full flex items-center justify-center shrink-0 text-white',

                      scaleName === 'Maior'
                        ? 'bg-red-500/50'
                        : 'bg-blue-500/50',
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
          });
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
              'w-[calc(100%/7.5)] h-56 text-xs items-end  hover:bg-neutral-100 active:bg-neutral-200 duration-150 relative text-white',
              typeof noteMap[toneId].name !== 'string' &&
                'w-[calc(80%/7.5)] h-36 -ml-[calc(40%/7.5)] -mr-[calc(40%/7.5)] z-2 border-white border hover:bg-neutral-800 active:bg-neutral-700 '
            )}
          >
            <div
              className={cn(
                'h-8 w-8 rounded-full flex items-center justify-center shrink-0 text-white',
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
