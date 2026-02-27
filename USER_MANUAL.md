# Manual de Instruções - Hub Conexão Digital

Bem-vindo ao Hub Conexão Digital. Esta plataforma foi desenvolvida para automatizar a criação de páginas de destino (landing pages) técnicas e multilíngues para a Conexão Sistemas de Prótese.

## Fluxo de Trabalho

### 1. Configuração de Branding
- Acesse a aba **Branding**.
- Defina as cores principais (Azul e Dourado).
- Faça o upload do manual de identidade visual em PDF (opcional, mas recomendado).
- Salve as configurações para que a IA utilize estas diretrizes em todas as gerações.

### 2. Chaves de API
- Acesse a aba **API Keys**.
- Insira sua chave do Google Gemini (obrigatória para as funções principais).
- O acesso é restrito ao usuário mestre. Seus dados são salvos de forma segura no Supabase.

### 3. Conversor (Texto para Markdown)
- Cole qualquer texto bruto (notas, rascunhos, textos de catálogos).
- Clique em **"Converter para Markdown"**.
- A IA estruturará o texto automaticamente com títulos, listas e tabelas.

### 4. Editor (Markdown para HTML)
- Refine o texto Markdown se necessário.
- Escolha o **Modelo de IA** desejado.
- Selecione o **Idioma** (PT-BR, EN-US, ES-ES ou os três simultaneamente).
- **Biblioteca de Prompts:** Use o dropdown para selecionar instruções pré-salvas. Isso carregará automaticamente as configurações de design e comportamento no campo de prompt.
- **Salvar na Biblioteca:** Se você criar um prompt novo e útil, clique em "Salvar na Biblioteca" para usá-lo em gerações futuras.
- Defina o nome do arquivo e clique em **"Gerar Página Interativa"**.

### 5. Preview e Download
- Visualize a página gerada em tempo real.
- Clique em **"Baixar HTML"** para obter o arquivo pronto para uso.

### 6. Gestão de Materiais
- Na aba **Materiais**, você encontra o histórico de tudo o que foi gerado.
- **Editar Nome:** Clique no ícone de lápis ao lado do nome do arquivo para renomeá-lo.
- **Excluir:** Clique na lixeira para remover um material (requer confirmação).
- **Download Rápido:** Baixe qualquer arquivo do histórico diretamente desta aba.

---
## Suporte Técnico
Para questões sobre o banco de dados ou chaves de API, consulte o administrador do Supabase.
