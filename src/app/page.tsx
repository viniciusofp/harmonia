'use client';
import { Button } from '@/components/ui/button';
import { cn, noteMap } from '@/lib/utils';
import { Moon, PianoIcon, Sun } from 'lucide-react';
import { useState } from 'react';
import Explainer from './components/Explainer';
import Scales from './components/Scales';
import Share from './components/Share';
import ToneSelect from './components/ToneSelect';
import { Card, CardContent } from '@/components/ui/card';
import { useToneStore } from '@/lib/store';
import Piano from './components/Piano';

export default function Home() {
  const [showPiano, setShowPiano] = useState<boolean>(false);
  const [lightMode, setLightMode] = useState<'dark' | 'light'>('light');

  const { toneId, scaleName } = useToneStore();
  return (
    <div
      className={cn(
        'w-full min-h-svh bg-background text-foreground',
        lightMode
      )}
    >
      <div className="flex flex-col gap-4 max-w-sm mx-auto py-8">
        <h1 className="px-2 text-lg leading-none font-bold">
          Colinha de Harmonia Musical
        </h1>
        <ToneSelect />
        <div className="px-2">
          <Card className="py-2">
            <CardContent className="p-2">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center px-2">
                  <div
                    className="
                  "
                  >
                    <p className="font-bold text-xl">
                      {toneId !== null &&
                        (typeof noteMap[toneId].name === 'string'
                          ? noteMap[toneId].name
                          : noteMap[toneId].name.join('/'))}{' '}
                      {scaleName}
                    </p>
                    {toneId !== null && (
                      <p className="text-sm font-medium text-muted-foreground">
                        {scaleName !== 'Maior' &&
                          (typeof noteMap[(toneId! + 3) % 12].name === 'string'
                            ? noteMap[(toneId! + 3) % 12].name + ' Maior'
                            : noteMap[(toneId! + 3) % 12].name[1] + ' Maior')}
                        {scaleName === 'Maior' &&
                          (typeof noteMap[(toneId! + 9) % 12].name === 'string'
                            ? noteMap[(toneId! + 9) % 12].name + ' Menor'
                            : noteMap[(toneId! + 9) % 12].name[1] + ' Menor')}
                      </p>
                    )}
                  </div>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPiano((v) => !v)}
                  >
                    {showPiano ? 'Esconder' : 'Exibir'} piano <PianoIcon />
                  </Button>
                </div>
                {showPiano && (
                  <div className="mt-2">
                    <Piano />
                  </div>
                )}
                <Scales />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-between items-center gap-2 px-2">
          <div className="flex gap-2 items-center">
            <Explainer /> <Share />
          </div>
          <Button
            size="icon"
            onClick={() =>
              setLightMode((state) => (state === 'dark' ? 'light' : 'dark'))
            }
          >
            {' '}
            {lightMode === 'dark' ? <Sun /> : <Moon />}
          </Button>
        </div>
        <div className="text-xs text-muted-foreground px-2">
          Desenvolvido por{' '}
          <a
            href="https://viniciusofp.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-black dark:hover:text-white"
          >
            Vinícius Pereira
          </a>
          , 2025
        </div>
      </div>
    </div>
  );
}
