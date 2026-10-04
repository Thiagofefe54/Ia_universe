# AI Universe

Portal em português para explorar ferramentas e conceitos de inteligência artificial.

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-blue?style=flat-square)

**Tecnologias:** Next.js · React · JavaScript · CSS · Supabase

## Proposta

Reunir catálogo, comparações, história, glossário, quiz e uma calculadora ilustrativa em uma experiência acessível. **O projeto não está finalizado.** Preços, notas e percentuais são dados ilustrativos e precisam de fontes e atualização.

## Versões do projeto

- **Next.js:** pastas `app/`, `components/` e `lib/`. O catálogo desta versão contém dez ferramentas; os votos usam Supabase.
- **Estática:** `index.html`, `pages/`, `css/` e `js/`. Pode ser aberta no navegador ou via Live Server; guarda votos apenas no navegador.

As duas versões ainda não têm todos os dados e comportamentos alinhados.

## Executar a versão Next.js

Use Node.js compatível com Next.js 16 (20.9 ou superior) e npm.

```sh
git clone https://github.com/Thiagofefe54/Ia_universe.git
cd Ia_universe
npm ci
```

Copie `.env.example` para `.env.local` e configure as variáveis antes de iniciar:

```sh
npm run dev
```

Abra http://localhost:3000. Para verificações: `npm run lint` e `npm run build`.

## Supabase

O cliente espera `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` de um projeto próprio. O catálogo consulta e insere registros na tabela `votes`, usando o campo `ai_id`. A definição da tabela, migrações e políticas ainda não estão incluídas. Configure as permissões e RLS antes de disponibilizar votos. Nunca coloque uma chave `service_role` em variáveis públicas.

A marcação de voto no navegador não impede duplicações no banco. A integração ainda precisa de validação.

## Próximos passos

- [ ] Definir uma versão principal e alinhar as duas implementações.
- [ ] Documentar esquema, políticas e configuração dos votos.
- [ ] Ajustar a quantidade anunciada de IAs ao catálogo real.
- [ ] Revisar preços, câmbio, estatísticas e comparações com fontes e datas.
- [ ] Melhorar acessibilidade, validações e testes.

---

Projeto de [Thiago Feijó](https://github.com/Thiagofefe54).
