# Escola Montessori — Landing Page

Landing page construída com React 19, TypeScript, TanStack Start/Router, Vite 8 e Tailwind CSS 4.

## Requisitos

- Node.js 22 ou mais recente
- pnpm 11 ou mais recente

## Executar localmente

```sh
pnpm install
pnpm dev
```

Por padrão, o servidor do projeto usa `http://localhost:8080`. Se a porta estiver ocupada:

```sh
pnpm exec vite dev --host 127.0.0.1 --port 4174 --strictPort
```

## Assets gerenciados pelo Lovable

O arquivo exportado pelo Lovable contém metadados `.asset.json`, mas não inclui os binários de várias imagens e fontes. Para que esses assets carreguem durante o desenvolvimento local, copie `.env.example` para `.env.local` e informe o host de preview do projeto no Lovable, sem `https://`:

```dotenv
LOVABLE_PREVIEW_HOST=id-preview--project-id.lovable.app
```

Não há outras variáveis de ambiente, banco de dados ou chaves de API exigidas pelo código atual.

## Validação

```sh
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

O projeto não possui suíte de testes automatizados configurada no momento.

## Produção

`pnpm build` gera a aplicação em `.output/`. A configuração atual usa Nitro com preset padrão para Cloudflare, podendo ser direcionada por variáveis/preset da plataforma de hospedagem na próxima etapa.

Este projeto permanece conectado ao Lovable. Não reescreva o histórico Git publicado; commits enviados à branch conectada sincronizam com o editor Lovable.
