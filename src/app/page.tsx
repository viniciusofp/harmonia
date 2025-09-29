import Explainer from './components/Explainer';
import Piano from './components/Piano';
import Scales from './components/Scales';
import ToneSelect from './components/ToneSelect';

export default function Home() {
  return (
    <div className="flex flex-col gap-4 max-w-sm mx-auto py-4">
      <h1 className="px-2 text-lg leading-none font-bold">
        Colinha de Harmonia Musical
      </h1>
      {/* <Piano /> */}
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
        , 2025
      </div>
      <Explainer />
    </div>
  );
}
