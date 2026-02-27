-- SCRIPT PARA INSERIR OS 11 MODELOS DE DESIGN NA BIBLIOTECA
-- Substitua 'SEU_USER_ID_AQUI' pelo seu ID de usuário do Supabase (encontrado em Authentication > Users)
-- Ou execute este script se você quiser que os modelos apareçam para o seu usuário logado.

INSERT INTO public.prompt_library (user_id, title, description, content)
VALUES 
(
    'SEU_USER_ID_AQUI', 
    'Neobrutalismo + Pastel Pop', 
    'Estilo de alto contraste com bordas pretas espessas, sombras sólidas (Shadow-Pop) e paleta pastel vibrante. Ideal para fintechs e ferramentas modernas.',
    'Gere um ÚNICO arquivo HTML autônomo e responsivo (HTML5, Tailwind CSS via CDN e Lucide Icons).

Diretrizes de Design & Sofisticação:
- Estética Neobrutalista: Utilize bordas pretas sólidas e espessas (border-2 ou border-4 border-black). Remova arredondamentos excessivos em favor de cantos vivos ou levemente arredondados (rounded-none ou rounded-lg).
- Sombras Hard-Edge: Implemente o efeito ''Shadow-Pop''. Em vez de sombras suaves e esfumaçadas, use sombras sólidas e deslocadas (box-shadow: 8px 8px 0px 0px #000;) que não possuem desfoque.
- Paleta Pastel Pop: Combine um fundo off-white (bg-[#f4f4f0]) com elementos em cores pastéis vibrantes e saturadas (Amarelo #FFD100, Rosa #FF90E8, Verde Menta #B1F1CB).
- Tipografia e Peso: Use a fonte ''Inter'' ou ''Lexend'' via Google Fonts. Títulos devem ter peso font-black (900) e letras levemente comprimidas (tracking-tighter).
- Interatividade: Use GSAP para criar animações de ''mola'' (spring). Ao passar o mouse (hover), os elementos devem se deslocar na direção oposta da sombra, simulando um clique físico real.
- Estrutura: Layout estilo ''Service Grid'' ou ''Feature List'', com ícones Lucide grandes, sempre dentro de containers com bordas pretas.

Restrições Técnicas:
NÃO inclua cabeçalhos/rodapés externos. O arquivo deve ser 100% auto-contido. Retorne APENAS o código HTML completo, sem blocos de código markdown (```html).'
),
(
    'SEU_USER_ID_AQUI', 
    'Bento Grid + Glassmorphism', 
    'Organização modular inspirada na Apple com efeitos de vidro, desfoque e profundidade. Layout assimétrico e moderno.',
    'Gere um ÚNICO arquivo HTML autônomo e responsivo (HTML5, Tailwind CSS via CDN e Lucide Icons).

Diretrizes de Design & Sofisticação:
- Estrutura Bento Grid: Utilize um layout grid de 4 ou 6 colunas com auto-rows. Os cards devem ter tamanhos variados (col-span-1, col-span-2, row-span-2) para criar um ritmo visual assimétrico e moderno.
- Estética Glassmorphism: Aplique backdrop-blur-xl e fundos semi-transparentes (bg-white/5 ou bg-white/10). O segredo está na borda: use uma borda fina de 1px com transparência (border-white/20) para simular a quina de um vidro lapidado.
- Profundidade Visual: Use camadas de sombras muito suaves e amplas (shadow-[0_20px_50px_rgba(0,0,0,0.3)]). Os cards devem parecer flutuar sobre o fundo.
- Liquid Background Animado: Crie um fundo escuro profundo (bg-[#0a0a0c]) com pelo menos dois ''blobs'' de gradiente orgânico (um ciano e um violeta) que se movam lentamente usando animate-pulse ou Keyframes CSS personalizados com blur(100px).
- Tipografia e Ícones: Use a fonte ''Plus Jakarta Sans'' via Google Fonts. Os títulos devem ser font-bold e os ícones Lucide devem estar dentro de círculos ou quadrados de vidro com opacidade reduzida.
- Interatividade: Use GSAP para uma animação de ''Stagger'' (entrada em cascata) onde os cards aparecem um após o outro com um leve movimento de baixo para cima e escala.

Restrições Técnicas:
NÃO inclua cabeçalhos/rodapés externos. O arquivo deve ser 100% auto-contido. Retorne APENAS o código HTML completo, sem blocos de código markdown (```html).'
),
(
    'SEU_USER_ID_AQUI', 
    'Aurora UI + Minimalismo Orgânico', 
    'Elegância etérea com fundos dinâmicos de gradiente suave e tipografia serifada premium.',
    'Gere um ÚNICO arquivo HTML autônomo e responsivo (HTML5, Tailwind CSS via CDN e Lucide Icons).

Diretrizes de Design & Sofisticação:
- Estética Aurora: Crie um fundo dinâmico usando 3 ou 4 esferas de gradiente (blur-[120px]) com cores análogas (ex: Índigo, Violeta e fúcsia) que se movem lentamente em órbitas irregulares via CSS Keyframes. O fundo base deve ser um cinza quase preto (bg-[#050505]).
- Minimalismo Orgânico: Use tipografia serifada premium para títulos (Google Fonts ''Playfair Display'' ou ''Instrument Serif'') e sans-serif para corpo (''Inter''). Garanta um letter-spacing negativo nos títulos (tracking-tighter).
- Contraste de Superfície: O conteúdo principal deve flutuar em um container central com bg-white/[0.02] e backdrop-blur-3xl. As bordas devem ser quase invisíveis (border-white/5).
- Interatividade & Animações: Use GSAP para um efeito de ''Reveal'' suave no carregamento (opacity 0 para 1 com deslocamento de 20px no eixo Y). Adicione um cursor personalizado que reage ao passar sobre elementos clicáveis (escala e mudança de mix-blend-mode).
- Estrutura: Layout de ''Landing Page Hero'' ultra-clean, com um CTA central minimalista e ícones Lucide com traço fino (stroke-width: 1px).

Restrições Técnicas:
NÃO inclua cabeçalhos/rodapés externos. O arquivo deve ser 100% auto-contido. Retorne APENAS o código HTML completo, sem blocos de código markdown (```html).'
),
(
    'SEU_USER_ID_AQUI', 
    'Claymorphism + Soft 3D', 
    'Interfaces táteis e amigáveis que parecem feitas de argila ou plástico macio, com cores pastéis.',
    'Gere um ÚNICO arquivo HTML autônomo e responsivo (HTML5, Tailwind CSS via CDN e Lucide Icons).

Diretrizes de Design & Sofisticação:
- Estética Claymorphism: Os elementos devem parecer feitos de argila ou plástico macio. Utilize border-radius extremo (rounded-[3rem]) e uma combinação de box-shadow externa suave com duas sombras internas (inset) — uma clara no topo esquerdo e uma escura no canto inferior direito — para criar volume 3D tátil.
- Paleta de Cores: Use tons pastéis ''doces'' (ex: Azul bebê #A5D8FF, Rosa chiclete #FFD6E8, Lilás #E5DBFF). O fundo deve ser um gradiente radial muito suave entre duas cores pastéis próximas.
- Profundidade e Camadas: Implemente o efeito de flutuação. Use GSAP para criar uma animação de ''Floating'' contínua (bobbing) nos elementos principais, fazendo-os subir e descer levemente em tempos diferentes.
- Tipografia: Use a fonte ''Outfit'' ou ''Quicksand'' via Google Fonts para manter o aspecto amigável e arredondado. Títulos em font-bold e cores de texto em tons de cinza azulado escuro (text-slate-700).
- Interatividade: Adicione um efeito de ''Squeeze'' (compressão) no clique via CSS active:scale-95 e transições de hover:scale-105 extremamente suaves.
- Estrutura: Layout estilo ''Onboarding Cards'' ou ''Feature Showcase'' com ícones Lucide estilizados com traços grossos e cores vibrantes.

Restrições Técnicas:
NÃO inclua cabeçalhos/rodapés externos. O arquivo deve ser 100% auto-contido. Retorne APENAS o código HTML completo, sem blocos de código markdown (```html).'
),
(
    'SEU_USER_ID_AQUI', 
    'Retro-Futurismo Synthwave + Clean Cyberpunk', 
    'Nostalgia tecnológica com acabamento premium, luzes neon refinadas e tipografia monospace.',
    'Gere um ÚNICO arquivo HTML autônomo e responsivo (HTML5, Tailwind CSS via CDN e Lucide Icons).

Diretrizes de Design & Sofisticação:
- Estética Retro-Futurista Clean: Combine o estilo noir tecnológico com elegância moderna. Utilize um fundo sólido ultra-escuro (bg-[#020205]) com uma grade de perspectiva (CSS grid floor) no rodapé que desaparece no horizonte com mask-image linear-gradient.
- Neon Refinado: Evite o excesso de brilho. Use cores neon (Ciano #00f3ff e Magenta #ff00ff) apenas como luzes de contorno (border com drop-shadow de 5px) e detalhes em pequenos LEDs indicadores.
- Tipografia Monospace & Display: Use a fonte ''Space Mono'' para dados e labels, e ''Syncopate'' ou ''Orbitron'' via Google Fonts para títulos principais. Aplique um efeito sutil de ''flicker'' (piscar) via CSS Keyframes em elementos de destaque.
- Interatividade & Efeitos de Vidro Negro: Utilize containers com bg-black/60 e backdrop-blur-lg. Ao passar o mouse, a borda neon do elemento deve aumentar de intensidade e o texto deve ganhar um efeito de ''glitch'' controlado e rápido.
- Animações: Use GSAP para criar uma linha de ''scanline'' que percorre a tela verticalmente e animações de entrada estilo ''terminal boot'' (texto surgindo caractere por caractere).
- Estrutura: Layout de ''Command Center'' ou ''Tech Dashboard'', com ícones Lucide estilizados em modo duotone usando as cores neon da paleta.

Restrições Técnicas:
NÃO inclua cabeçalhos/rodapés externos. O arquivo deve ser 100% auto-contido. Retorne APENAS o código HTML completo, sem blocos de código markdown (```html).'
),
(
    'SEU_USER_ID_AQUI', 
    'Skeuomorph Moderno (Neuomorphism 2.0)', 
    'Realismo tátil minimalista com sombras duplas precisas e sofisticação monocromática.',
    'Gere um ÚNICO arquivo HTML autônomo e responsivo (HTML5, Tailwind CSS via CDN e Lucide Icons).

Diretrizes de Design & Sofisticação:
- Estética Neuomorphism 2.0: Diferente da primeira versão, esta deve ser refinada. Utilize uma cor de base única para fundo e elementos (ex: Cinza Suave #E0E5EC ou Azul Gelo #E2E8F0). Crie volume usando sombras duplas precisas: uma sombra clara (white) no topo/esquerda e uma sombra escura (rgba(163,177,198,0.6)) na base/direita.
- Textura e Material: Adicione uma leve curvatura côncava ou convexa aos cards usando gradientes lineares quase imperceptíveis que seguem a direção da luz.
- Acentos de Cor: Escolha uma única cor de destaque vibrante (ex: Azul Elétrico ou Verde Esmeralda) apenas para estados ativos, indicadores de Toggle ou ícones principais, quebrando a monocromia.
- Tipografia: Use a fonte ''Inter'' ou ''Satoshi'' com pesos variados. Títulos devem ter baixo contraste de cor com o fundo para manter a estética minimalista, mas com font-bold para legibilidade.
- Interatividade & Micro-animações: Use GSAP para animar a transição entre estados. Quando um botão for clicado, ele deve trocar as sombras externas por sombras internas (inset), simulando o movimento físico de ser pressionado para dentro do material.
- Estrutura: Layout de ''Smart Home Controller'' ou ''Music Player'', com botões circulares, sliders personalizados e ícones Lucide que parecem gravados na superfície.

Restrições Técnicas:
NÃO inclua cabeçalhos/rodapés externos. O arquivo deve ser 100% auto-contido. Retorne APENAS o código HTML completo, sem blocos de código markdown (```html).'
),
(
    'SEU_USER_ID_AQUI', 
    'Maximalismo Tipográfico + Dark Mode', 
    'Impacto visual extremo através de fontes gigantes, alto contraste e composições dinâmicas.',
    'Gere um ÚNICO arquivo HTML autônomo e responsivo (HTML5, Tailwind CSS via CDN e Lucide Icons).

Diretrizes de Design & Sofisticação:
- Estética Maximalista: O texto deve ser o elemento estrutural. Utilize fontes ''Display'' de impacto (Google Fonts ''Syne'' ou ''Bricolage Grotesque''). Títulos principais devem ser gigantes (text-7xl ou text-8xl), com letter-spacing extremamente reduzido (tracking-tighter) e pesos variando entre font-black e font-thin.
- Dark Mode de Alto Contraste: Fundo preto absoluto (bg-[#000000]) com texto em branco puro (text-white). Intercale frases com o efeito text-transparent e -webkit-text-stroke: 1px white para criar camadas de profundidade visual apenas com glifos.
- Composição Dinâmica: Quebre o alinhamento padrão. Use textos rotacionados (-rotate-90), textos que se repetem em faixas horizontais (estilo marquee) e sobreposições ousadas onde o texto passa por trás ou pela frente de ícones e botões.
- Animações de Scroll & Reveal: Use GSAP e ScrollTrigger (via CDN) para criar animações de texto que deslizam de direções opostas conforme o usuário rola a página. Adicione um efeito de ''Staggered Letter Reveal'' no carregamento inicial.
- Interatividade: Implemente um ''Magnetic Button'' para o CTA principal: o botão deve ser atraído sutilmente pelo cursor do mouse usando JS suave.
- Estrutura: Layout de ''Digital Agency Portfolio'' ou ''Event Editorial'', focado em impacto visual imediato com ícones Lucide agindo apenas como acentos minimalistas.

Restrições Técnicas:
NÃO inclua cabeçalhos/rodapés externos. O arquivo deve ser 100% auto-contido. Retorne APENAS o código HTML completo, sem blocos de código markdown (```html).'
),
(
    'SEU_USER_ID_AQUI', 
    'Grainy Textures + Mono-Chrome', 
    'Visual analógico, editorial e cinematográfico com texturas de ruído e tipografia clássica.',
    'Gere um ÚNICO arquivo HTML autônomo e responsivo (HTML5, Tailwind CSS via CDN e Lucide Icons).

Diretrizes de Design & Sofisticação:
- Estética Grainy (Ruído): Aplique um overlay de textura de ruído analógico em toda a página. Use um filtro de ruído SVG feTurbulence dentro de um rect absoluto com opacidade baixa (opacity-20) e pointer-events-none. O visual deve remeter a papel impresso ou fotografia de grão fino.
- Paleta Monocromática Sofisticada: Use uma escala rigorosa de cinzas e pretos, fugindo do branco puro. Fundo em cinza médio-quente (bg-[#1a1a1a]) e elementos em tons contrastantes. Utilize mix-blend-mode (como difference ou overlay) para criar interações visuais ricas entre o texto e o fundo.
- Minimalismo Editorial: Use tipografia serifada de alta classe (Google Fonts ''Cormorant Garamond'' ou ''Fraunces'') para corpo de texto e uma sans-serif geométrica (''Inter'') para metadados. Mantenha grandes margens e muito respiro (whitespace).
- Profundidade Cinematográfica: Utilize imagens ou placeholders com filtros grayscale(100%) e contrast(120%). As transições entre seções devem ser suaves, simulando um ''fade out'' de cinema.
- Interatividade & Animações: Use GSAP para criar um efeito de ''Lens Blur'' ou ''Focus In'' (o conteúdo começa desfocado e ganha nitidez ao entrar no viewport). O cursor deve ser um círculo simples que inverte as cores do que está por baixo.
- Estrutura: Layout estilo ''Luxury Lookbook'' ou ''Architecture Portfolio'', com grid ortogonal e ícones Lucide com stroke-width: 0.75px para máxima elegância.

Restrições Técnicas:
NÃO inclua cabeçalhos/rodapés externos. O arquivo deve ser 100% auto-contido. Retorne APENAS o código HTML completo, sem blocos de código markdown (```html).'
),
(
    'SEU_USER_ID_AQUI', 
    'Bauhaus Modernizado', 
    'Geometria pura, funcionalismo histórico e paleta primária sobre fundo papel.',
    'Gere um ÚNICO arquivo HTML autônomo e responsivo (HTML5, Tailwind CSS via CDN e Lucide Icons).

Diretrizes de Design & Sofisticação:
- Estética Bauhaus Contemporânea: Baseie o design em formas geométricas puras (círculos, quadrados e triângulos perfeitos). Utilize um grid ortogonal rigoroso com divisórias sólidas de 1px (border-slate-900/10).
- Paleta Primária Sofisticada: Use a tríade clássica (Amarelo #F4D03F, Vermelho #E74C3C, Azul #2E86C1), mas aplicadas sobre um fundo ''Papel'' (bg-[#FDFCF5]) para evitar um visual infantil. Use o preto (#1A1A1A) apenas para tipografia e formas estruturais.
- Assimetria Equilibrada: Posicione elementos de forma assimétrica, mas mantendo o equilíbrio de pesos visuais. Use flex e grid do Tailwind para criar composições onde o texto e as formas se interceptam.
- Tipografia Funcional: Use exclusivamente fontes sem serifa geométricas (Google Fonts ''Archivio'' ou ''Montserrat''). Títulos devem ser em caixa alta (uppercase) com font-bold e alinhamentos variados (esquerda e direita alternados).
- Animações Construtivistas: Use GSAP para animar a montagem da página: formas geométricas devem deslizar de fora da tela e se encaixar em suas posições como um quebra-cabeça técnico. Adicione rotações de 90° ou 180° em ícones Lucide no hover.
- Estrutura: Layout de ''Design Studio Concept'' ou ''Portfolio de Engenharia'', com seções numeradas (01, 02, 03) em fontes grandes e ícones Lucide simplificados.

Restrições Técnicas:
NÃO inclua cabeçalhos/rodapés externos. O arquivo deve ser 100% auto-contido. Retorne APENAS o código HTML completo, sem blocos de código markdown (```html).'
),
(
    'SEU_USER_ID_AQUI', 
    'Holographic / Iridescent Design', 
    'Visual Web3 futurista com refração de luz, gradientes complexos e efeitos 3D de inclinação.',
    'Gere um ÚNICO arquivo HTML autônomo e responsivo (HTML5, Tailwind CSS via CDN e Lucide Icons).

Diretrizes de Design & Sofisticação:
- Estética Holográfica: Crie superfícies que simulem a refração de luz metálica. Utilize gradientes lineares e radiais complexos com múltiplos stops de cor (azul ciano, rosa choque, lavanda e verde limão). Aplique um efeito de ''shimmer'' (brilho móvel) usando background-size: 200% e uma animação infinita de deslocamento de background.
- Refração e Brilho: Use containers com bg-white/10 e um backdrop-blur-2xl. Adicione uma borda iridescente fina usando border-image-source com um gradiente colorido. Aplique um drop-shadow colorido que mude de matiz (hue-rotate) continuamente.
- Profundidade Espacial: O fundo deve ser um ''Dark Space'' profundo (bg-[#030308]) para que as superfícies holográficas saltem aos olhos. Use pequenas partículas ou pontos de luz sutis flutuando no fundo.
- Tipografia Futurista: Use a fonte ''Outfit'' ou ''Space Grotesk'' via Google Fonts. Títulos devem ter um leve efeito de brilho externo (text-shadow) e cores de gradiente que acompanham a paleta holográfica.
- Interatividade & Animações: Use GSAP para criar um efeito de ''Tilt 3D'' baseado no movimento do mouse: os cards devem rotacionar levemente e o gradiente interno deve se deslocar conforme o cursor se move, simulando a mudança de reflexo da luz.
- Estrutura: Layout de ''Web3 Dashboard'' ou ''NFT Marketplace Concept'', com botões de ação que possuem um brilho intenso no hover e ícones Lucide com acabamento metálico.

Restrições Técnicas:
NÃO inclua cabeçalhos/rodapés externos. O arquivo deve ser 100% auto-contido. Retorne APENAS o código HTML completo, sem blocos de código markdown (```html).'
),
(
    'SEU_USER_ID_AQUI', 
    'Swiss Design + Grid Brutalism', 
    'Precisão suíça com estrutura industrial aparente, tipografia radical e grid modular visível.',
    'Gere um ÚNICO arquivo HTML autônomo e responsivo (HTML5, Tailwind CSS via CDN e Lucide Icons).

Diretrizes de Design & Sofisticação:
- Estética Swiss Design (Estilo Internacional): Foque em clareza absoluta e funcionalidade. Utilize um grid modular matemático e rigoroso, visível através de linhas de divisão finas (border-slate-200). O fundo deve ser um ''Paper White'' limpo (bg-[#f8f8f8]).
- Grids Brutalistas: Use um layout de colunas fixas que não se escondem. Exiba o esqueleto do site com bordas sólidas. Crie seções com tamanhos variados que se encaixam como um sistema de prateleiras.
- Tipografia Suíça Clássica: Use exclusivamente a fonte ''Inter'' ou ''Plus Jakarta Sans'' (como alternativa moderna à Helvetica). Aplique uma hierarquia tipográfica drástica: use text-xs uppercase tracking-[0.2em] para labels e text-6xl font-black para títulos principais, sempre com alinhamento à esquerda.
- Uso Estratégico do Vermelho Suíço: Mantenha a interface quase inteiramente em preto, branco e cinza, utilizando o vermelho vibrante (bg-[#ff0000]) apenas para elementos de ação (CTAs) ou pontos de foco extremamente específicos.
- Interatividade & Animações: Use GSAP para criar transições de ''Grid Reveal'' (as linhas do grid se desenham primeiro e o conteúdo preenche depois). As animações devem ser secas e rápidas (sem elasticidade), enfatizando a precisão técnica.
- Estrutura: Layout de ''Index'' ou ''Product Catalog'', com numeração técnica para cada seção e ícones Lucide pequenos e precisos (stroke-width: 1.5px), sempre alinhados ao topo dos seus respectivos grids.

Restrições Técnicas:
NÃO inclua cabeçalhos/rodapés externos. O arquivo deve ser 100% auto-contido. Retorne APENAS o código HTML completo, sem blocos de código markdown (```html).'
);
