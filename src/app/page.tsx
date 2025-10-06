'use client';
import { useState } from 'react';
import Explainer from './components/Explainer';
import Piano from './components/Piano';
import Scales from './components/Scales';
import ToneSelect from './components/ToneSelect';
import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Share from './components/Share';

export default function Home() {
  const [lightMode, setLightMode] = useState<'dark' | 'light'>('light');
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
        {/* <Piano /> */}
        <ToneSelect />
        <div className="px-2">
          <Scales />
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
