'use client';
import { Button } from '@/components/ui/button';
import { cn, noteMap } from '@/lib/utils';
import { Github, Moon, PianoIcon, Sun } from 'lucide-react';
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
      <div className="flex flex-col gap-4 max-w-md mx-auto py-8">
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
        <div className="text-xs text-muted-foreground px-2 flex gap-2 items-center">
          <span>
            Desenvolvido por{' '}
            <a
              href="https://viniciusofp.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-black dark:hover:text-white"
            >
              Vinícius Pereira
            </a>
            , 2025.{' '}
          </span>
          <span>
            <a
              href="https://github.com/viniciusofp/harmonia"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-black dark:hover:text-white"
            >
              <svg
                height="32"
                aria-hidden="true"
                viewBox="0 0 24 24"
                version="1.1"
                width="32"
                data-view-component="true"
                className="fill-black size-5 hover:opacity-80"
              >
                <path d="M12 1C5.923 1 1 5.923 1 12c0 4.867 3.149 8.979 7.521 10.436.55.096.756-.233.756-.522 0-.262-.013-1.128-.013-2.049-2.764.509-3.479-.674-3.699-1.292-.124-.317-.66-1.293-1.127-1.554-.385-.207-.936-.715-.014-.729.866-.014 1.485.797 1.691 1.128.99 1.663 2.571 1.196 3.204.907.096-.715.385-1.196.701-1.471-2.448-.275-5.005-1.224-5.005-5.432 0-1.196.426-2.186 1.128-2.956-.111-.275-.496-1.402.11-2.915 0 0 .921-.288 3.024 1.128a10.193 10.193 0 0 1 2.75-.371c.936 0 1.871.123 2.75.371 2.104-1.43 3.025-1.128 3.025-1.128.605 1.513.221 2.64.111 2.915.701.77 1.127 1.747 1.127 2.956 0 4.222-2.571 5.157-5.019 5.432.399.344.743 1.004.743 2.035 0 1.471-.014 2.654-.014 3.025 0 .289.206.632.756.522C19.851 20.979 23 16.854 23 12c0-6.077-4.922-11-11-11Z"></path>
              </svg>
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
