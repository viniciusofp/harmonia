import Piano from './components/Piano';
import Scales from './components/Scales';
import ToneSelect from './components/ToneSelect';

export default function Home() {
  return (
    <div className="flex flex-col gap-4 max-w-sm mx-auto py-4">
      <h1 className="px-2 font-black text-lg">
        Guia Básico de Harmonia Musical
      </h1>
      <Piano />
      <ToneSelect />
      <div className="px-2">
        <Scales />
      </div>
      <div className="text-xs text-muted-foreground text-center">
        Desenvolvido por{' '}
        <a
          href="https://viniciusofp.com.br"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-black"
        >
          Vinícus Pereira
        </a>
        .
      </div>
    </div>
  );
}
