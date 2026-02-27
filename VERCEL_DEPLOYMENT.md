# Guia de Implantação na Vercel - Hub Conexão Digital

Este guia detalha os passos necessários para colocar a plataforma Hub Conexão Digital em produção utilizando a Vercel.

## 1. Preparação do Repositório
Certifique-se de que seu código está em um repositório Git (GitHub, GitLab ou Bitbucket).

## 2. Configuração do Projeto na Vercel
1. Acesse o dashboard da [Vercel](https://vercel.com).
2. Clique em **"Add New"** > **"Project"**.
3. Importe o repositório do projeto.
4. Em **Build & Development Settings**, verifique se os padrões estão corretos:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

## 3. Variáveis de Ambiente (Essencial)
Você deve configurar as seguintes variáveis de ambiente na aba **Environment Variables** da Vercel:

| Variável | Descrição |
| :--- | :--- |
| `VITE_SUPABASE_URL` | URL do seu projeto Supabase. |
| `VITE_SUPABASE_ANON_KEY` | Chave anônima (anon key) do seu projeto Supabase. |
| `GEMINI_API_KEY` | Sua chave de API do Google Gemini (para funções de IA). |

> **Nota:** As variáveis do Supabase devem começar com `VITE_` para que o Vite as exponha ao front-end.

## 4. Configuração do Supabase (RLS)
Para que a persistência de dados funcione corretamente em produção, certifique-se de que as tabelas no Supabase possuem as políticas de **Row Level Security (RLS)** configuradas para permitir que o usuário autenticado (`hevertoneduardoperes@gmail.com`) possa ler e escrever em seus próprios registros.

## 5. Deploy
Clique em **"Deploy"**. A Vercel irá compilar o projeto e fornecer uma URL de produção.

---
*Desenvolvido para Conexão Sistemas de Prótese.*
