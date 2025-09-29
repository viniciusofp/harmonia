'use client';

import { Card, CardContent } from '@/components/ui/card';
import { useToneStore } from '@/lib/store';
import {
  cn,
  createScale,
  graus_romano,
  modes,
  noteMap,
  roman_numbers,
  sharpOrFlat
} from '@/lib/utils';
import { find } from 'lodash';
import { useMemo } from 'react';

export type ScalesProps = {};

export default function Scales(props: ScalesProps) {
  const { toneId, scaleName } = useToneStore();
  if (toneId === null) return;
  const chords = useMemo(() => {
    const mode = find(modes, { name: scaleName });
    if (mode) {
      // @ts-ignore
      return mode.chords;
    } else {
      return [];
    }
  }, [scaleName]);
  const scale: number[] = useMemo(() => {
    return createScale(toneId, scaleName as string);
  }, [toneId, scaleName]);
  if (toneId === null || scaleName === null) return null;
  return (
    <Card className="py-2">
      <CardContent className="p-2">
        <div className="flex flex-col gap-2">
          <div className="px-2">
            <p className="font-bold text-xl">
              {toneId !== null &&
                (typeof noteMap[toneId].name === 'string'
                  ? noteMap[toneId].name
                  : noteMap[toneId].name.join('/'))}{' '}
              {scaleName}
              {toneId !== null && (
                <span className="text-sm font-medium text-muted-foreground pl-2">
                  (
                  {scaleName !== 'Maior' &&
                    (typeof noteMap[(toneId! + 3) % 12].name === 'string'
                      ? noteMap[(toneId! + 3) % 12].name + ' Maior'
                      : noteMap[(toneId! + 3) % 12].name[1] + ' Maior')}
                  {scaleName === 'Maior' &&
                    (typeof noteMap[(toneId! + 9) % 12].name === 'string'
                      ? noteMap[(toneId! + 9) % 12].name + ' Menor'
                      : noteMap[(toneId! + 9) % 12].name[1] + ' Menor')}
                  )
                </span>
              )}
            </p>
          </div>
          <hr className="my-2" />
          <p className="text-[10px] uppercase text-muted-foreground">
            Campo Harmônico
          </p>
          <div className="grid grid-cols-7 gap-1 w-full">
            {typeof scale !== null &&
              scale?.map((id, index) => {
                const note = noteMap[id];
                return (
                  <div
                    key={'scaleewe' + id}
                    className="font-bold flex items-center justify-center  text-sm text-muted-foreground"
                  ></div>
                );
              })}
          </div>
          <div className="grid grid-cols-7 divide-x w-full items-start">
            {typeof scale !== null &&
              scale!.map((id, index) => {
                const note = noteMap[id];
                return (
                  <div
                    key={'scaleewe' + id}
                    className="font-bold flex flex-col items-center justify-center text-base rounded gap-2 px-1"
                  >
                    <div
                      className={cn(
                        'text-center w-full px-3 py-1 rounded text-xs tracking-wide',
                        index === 0 && 'bg-blue-200',
                        [2, 5].includes(index) && 'bg-blue-100',
                        index === 3 && 'bg-amber-200',
                        [1].includes(index) && 'bg-amber-100',
                        index === 4 && 'bg-red-200',
                        [6].includes(index) && 'bg-red-100'
                      )}
                    >
                      {roman_numbers[index]}
                    </div>
                    <p className="leading-tight text-center">
                      <span className="tracking-wide font-bold">
                        {typeof note.symbol === 'string'
                          ? note.symbol
                          : note.symbol[sharpOrFlat(toneId, scaleName)]}
                        {chords[index]}
                      </span>
                      {scaleName === 'Menor' && index === 4 && (
                        <span className="tracking-wide font-bold">
                          {' '}
                          (
                          {typeof note.symbol === 'string'
                            ? note.symbol
                            : note.symbol[sharpOrFlat(toneId, scaleName)]}
                          7)
                        </span>
                      )}
                    </p>
                  </div>
                );
              })}
          </div>
          <p className="text-[10px] uppercase text-muted-foreground mt-5">
            DOIS CADENCIAL
          </p>
          {
            /* Dois cadencial MAIOR */
            scaleName === 'Maior' && (
              <div className="grid grid-cols-7 w-full divide-x ">
                <div></div>
                {[1, 2, 3, 4, 5].map((n) => {
                  const currentTone = noteMap[scale[n]];
                  const isMinor = chords[n].includes('m');
                  const relToneId = isMinor
                    ? noteMap[(scale[n] + 3) % 12].id
                    : noteMap[scale[n]].id;
                  const relScale = createScale(relToneId, 'Maior');
                  return (
                    <div
                      key={'cadenciais' + n}
                      className="font-semibold tracking-wide flex flex-col items-center justify-center text-lg px-1"
                    >
                      <p className="text-muted-foreground text-base">
                        {typeof noteMap[relScale[isMinor ? 6 : 1]].symbol ===
                        'string'
                          ? noteMap[relScale[isMinor ? 6 : 1]].symbol
                          : noteMap[relScale[isMinor ? 6 : 1]].symbol[
                              sharpOrFlat(relToneId, 'Maior')
                            ]}
                        {chords[isMinor ? 6 : 1]}
                      </p>
                      <p className="text-muted-foreground text-base">
                        {typeof noteMap[relScale[isMinor ? 6 : 1]].symbol ===
                        'string'
                          ? noteMap[relScale[isMinor ? 2 : 4]].symbol
                          : noteMap[relScale[isMinor ? 2 : 4]].symbol[
                              sharpOrFlat(relToneId, 'Maior')
                            ]}
                        7
                      </p>
                    </div>
                  );
                })}
              </div>
            )
          }
          {
            /* Dois cadencial MENOR */
            scaleName === 'Menor' && (
              <div className="grid grid-cols-7 w-full divide-x ">
                {[0, 1, 2, 3, 4, 5, 6].map((n) => {
                  const currentTone = noteMap[scale[n]];
                  const isMinor = chords[n].includes('m');
                  const relToneId = isMinor
                    ? noteMap[(scale[n] + 3) % 12].id
                    : noteMap[scale[n]].id;
                  const relScale = createScale(relToneId, 'Maior');
                  if (n === 1) return <div></div>;
                  return (
                    <div
                      key={'cadenciais' + n}
                      className="font-semibold tracking-wide flex flex-col items-center justify-center text-lg gap-2"
                    >
                      <p className="text-muted-foreground text-base">
                        {typeof noteMap[relScale[isMinor ? 6 : 1]].symbol ===
                        'string'
                          ? noteMap[relScale[isMinor ? 6 : 1]].symbol
                          : noteMap[relScale[isMinor ? 6 : 1]].symbol[
                              sharpOrFlat(relToneId, 'Maior')
                            ]}
                        {chords[isMinor ? 1 : 0]}
                      </p>
                      <p className="text-muted-foreground text-base">
                        {typeof noteMap[relScale[isMinor ? 2 : 4]].symbol ===
                        'string'
                          ? noteMap[relScale[isMinor ? 2 : 4]].symbol
                          : noteMap[relScale[isMinor ? 2 : 4]].symbol[
                              sharpOrFlat(relToneId, 'Maior')
                            ]}
                        7
                      </p>
                    </div>
                  );
                })}
              </div>
            )
          }
          <p className="text-[10px] uppercase text-muted-foreground mt-5">
            Campo Harmônico {scaleName === 'Maior' ? 'Menor' : 'Maior'}
          </p>
          <div className="grid grid-cols-7 gap-1 w-full">
            {typeof scale !== null &&
              scale?.map((id, index) => {
                const note = noteMap[id];
                return (
                  <div
                    key={'scaleewe' + id}
                    className="font-bold flex items-center justify-center  text-sm text-muted-foreground"
                  ></div>
                );
              })}
          </div>
          <div className="grid grid-cols-7  divide-x w-full items-start">
            {typeof scale !== null &&
              createScale(
                toneId,
                scaleName === 'Maior' ? 'Menor' : 'Maior'
              ).map((id, index) => {
                const note = noteMap[id];
                return (
                  <div
                    key={'scaleewe' + id}
                    className="font-bold flex flex-col items-center justify-center text-base rounded px-1 gap-2"
                  >
                    <div
                      className={cn(
                        'text-center w-full px-3 py-1 rounded text-xs tracking-wide border'
                      )}
                    >
                      {roman_numbers[index]}
                    </div>
                    <p className="leading-tight text-center text-sm">
                      <span className="tracking-wide font-semibold">
                        {typeof note.symbol === 'string'
                          ? note.symbol
                          : note.symbol[
                              sharpOrFlat(
                                toneId,
                                scaleName === 'Maior' ? 'Menor' : 'Maior'
                              )
                            ]}
                        {
                          find(modes, {
                            name: scaleName === 'Maior' ? 'Menor' : 'Maior'
                          })?.chords[index]
                        }
                      </span>
                      {scaleName === 'Maior' && index === 4 && (
                        <span className="tracking-wide font-semibold">
                          {' '}
                          (
                          {typeof note.symbol === 'string'
                            ? note.symbol
                            : note.symbol[sharpOrFlat(toneId, 'Menor')]}
                          7)
                        </span>
                      )}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
