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

## 4. Configuração do Banco de Dados (Supabase)
Para configurar o banco de dados corretamente, acesse o **SQL Editor** no seu painel do Supabase e execute o conteúdo do arquivo:
- **`database.sql`** (localizado na raiz deste projeto)

Este script irá:
1. Criar as tabelas `branding_configs`, `api_keys`, `generated_materials` e `prompt_library`.
2. Configurar as colunas necessárias (incluindo `system_prompt` e `description`).
3. Habilitar o **Row Level Security (RLS)** para garantir que cada usuário veja apenas seus próprios dados.
4. Criar índices para garantir a velocidade da plataforma.

## 5. Deploy
Clique em **"Deploy"**. A Vercel irá compilar o projeto e fornecer uma URL de produção.

---
*Desenvolvido para Conexão Sistemas de Prótese.*
