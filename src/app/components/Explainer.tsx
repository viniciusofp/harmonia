'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

export type ExplainerProps = {};

export default function Explainer(props: ExplainerProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={'sm'}
          variant="outline"
          className="w-fit mx-auto bg-transparent text-xs text-muted-foreground"
        >
          O que é isto?
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Colinha de harmonia musical</DialogTitle>
          <DialogDescription className="grid gap-4">
            <p>
              Criei esse app como forma de me auxiliar no meu estudo de harmonia
              musical, cujo principal motivo é tocar samba. Tentei resumir em um
              quadro simples os principais elementos harmônicos para tocar boa
              parte do que se vê por ai.
            </p>
            <p>
              Não sou músico profissional ou de formação, então caso tenha
              encontrado alguma coisa errada e queira me dar um toque enviando
              um email para viniciusofp@gmail.com, eu agradeço.
            </p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
