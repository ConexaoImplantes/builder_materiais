/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Palette,
  Key,
  FileText,
  Code,
  Eye,
  Sparkles,
  Download,
  FileUp,
  X,
  Zap,
  ShieldCheck,
  Activity,
  Layers,
  Info,
  CheckCircle2,
  ArrowRightLeft,
  Loader2,
  Copy,
  Check,
  ChevronRight,
  Settings,
  Wand2,
  Save,
  Trash2,
  ExternalLink,
  History,
  LogIn,
  LogOut,
  User,
  Pencil,
  AlertTriangle,
  Plus
} from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import { supabase } from './lib/supabase';
import { Session } from '@supabase/supabase-js';

// --- Types & Constants ---

type ViewType = 'branding' | 'keys' | 'converter' | 'editor' | 'preview' | 'materials';
type ComponentType = 'hero' | 'grid' | 'comparison' | 'callout' | 'list';

interface GeneratedMaterial {
  id: string;
  name: string;
  html: string;
  timestamp: number;
}

interface PageSection {
  id: string;
  type: ComponentType;
  title?: string;
  subtitle?: string;
  content?: any;
}

interface PageData {
  title: string;
  subtitle: string;
  sections: PageSection[];
}

interface BrandConfig {
  primaryBlue: string;
  primaryGold: string;
  description: string;
  pdfBase64?: string;
  pdfName?: string;
  systemPrompt?: string;
}

interface ApiKeys {
  gemini: string;
  openai: string;
  claude: string;
  groq: string;
}

interface PromptLibraryEntry {
  id: string;
  title: string;
  content: string;
  description?: string;
}

const DEFAULT_PROMPTS = [
  {
    title: "Neobrutalismo + Pastel Pop",
    description: "Estilo de alto contraste com bordas pretas espessas, sombras sólidas (Shadow-Pop) e paleta pastel vibrante. Ideal para fintechs e ferramentas modernas.",
    content: `Gere um ÚNICO arquivo HTML autônomo e responsivo (HTML5, Tailwind CSS via CDN e Lucide Icons).

Diretrizes de Design & Sofisticação:
- Estética Neobrutalista: Utilize bordas pretas sólidas e espessas (border-2 ou border-4 border-black). Remova arredondamentos excessivos em favor de cantos vivos ou levemente arredondados (rounded-none ou rounded-lg).
- Sombras Hard-Edge: Implemente o efeito 'Shadow-Pop'. Em vez de sombras suaves e esfumaçadas, use sombras sólidas e deslocadas (box-shadow: 8px 8px 0px 0px #000;) que não possuem desfoque.
- Paleta Pastel Pop: Combine um fundo off-white (bg-[#f4f4f0]) com elementos em cores pastéis vibrantes e saturadas (Amarelo #FFD100, Rosa #FF90E8, Verde Menta #B1F1CB).
- Tipografia e Peso: Use a fonte 'Inter' ou 'Lexend' via Google Fonts. Títulos devem ter peso font-black (900) e letras levemente comprimidas (tracking-tighter).
- Interatividade: Use GSAP para criar animações de 'mola' (spring). Ao passar o mouse (hover), os elementos devem se deslocar na direção oposta da sombra, simulando um clique físico real.
- Estrutura: Layout estilo 'Service Grid' ou 'Feature List', com ícones Lucide grandes, sempre dentro de containers com bordas pretas.

Restrições Técnicas:
NÃO inclua cabeçalhos/rodapés externos. O arquivo deve ser 100% auto-contido. Retorne APENAS o código HTML completo, sem blocos de código markdown (\`\`\`html).`
  },
  {
    title: "Bento Grid + Glassmorphism",
    description: "Organização modular inspirada na Apple com efeitos de vidro, desfoque e profundidade. Layout assimétrico e moderno.",
    content: `Gere um ÚNICO arquivo HTML autônomo e responsivo (HTML5, Tailwind CSS via CDN e Lucide Icons).

Diretrizes de Design & Sofisticação:
- Estrutura Bento Grid: Utilize um layout grid de 4 ou 6 colunas com auto-rows. Os cards devem ter tamanhos variados (col-span-1, col-span-2, row-span-2) para criar um ritmo visual assimétrico e moderno.
- Estética Glassmorphism: Aplique backdrop-blur-xl e fundos semi-transparentes (bg-white/5 ou bg-white/10). O segredo está na borda: use uma borda fina de 1px com transparência (border-white/20) para simular a quina de um vidro lapidado.
- Profundidade Visual: Use camadas de sombras muito suaves e amplas (shadow-[0_20px_50px_rgba(0,0,0,0.3)]). Os cards devem parecer flutuar sobre o fundo.
- Liquid Background Animado: Crie um fundo escuro profundo (bg-[#0a0a0c]) com pelo menos dois "blobs" de gradiente orgânico (um ciano e um violeta) que se movam lentamente usando animate-pulse ou Keyframes CSS personalizados com blur(100px).
- Tipografia e Ícones: Use a fonte 'Plus Jakarta Sans' via Google Fonts. Os títulos devem ser font-bold e os ícones Lucide devem estar dentro de círculos ou quadrados de vidro com opacidade reduzida.
- Interatividade: Use GSAP para uma animação de 'Stagger' (entrada em cascata) onde os cards aparecem um após o outro com um leve movimento de baixo para cima e escala.

Restrições Técnicas:
NÃO inclua cabeçalhos/rodapés externos. O arquivo deve ser 100% auto-contido. Retorne APENAS o código HTML completo, sem blocos de código markdown (\`\`\`html).`
  },
  {
    title: "Aurora UI + Minimalismo Orgânico",
    description: "Elegância etérea com fundos dinâmicos de gradiente suave e tipografia serifada premium.",
    content: `Gere um ÚNICO arquivo HTML autônomo e responsivo (HTML5, Tailwind CSS via CDN e Lucide Icons).

Diretrizes de Design & Sofisticação:
- Estética Aurora: Crie um fundo dinâmico usando 3 ou 4 esferas de gradiente (blur-[120px]) com cores análogas (ex: Índigo, Violeta e fúcsia) que se movem lentamente em órbitas irregulares via CSS Keyframes. O fundo base deve ser um cinza quase preto (bg-[#050505]).
- Minimalismo Orgânico: Use tipografia serifada premium para títulos (Google Fonts 'Playfair Display' ou 'Instrument Serif') e sans-serif para corpo ('Inter'). Garanta um letter-spacing negativo nos títulos (tracking-tighter).
- Contraste de Superfície: O conteúdo principal deve flutuar em um container central com bg-white/[0.02] e backdrop-blur-3xl. As bordas devem ser quase invisíveis (border-white/5).
- Interatividade & Animações: Use GSAP para um efeito de 'Reveal' suave no carregamento (opacity 0 para 1 com deslocamento de 20px no eixo Y). Adicione um cursor personalizado que reage ao passar sobre elementos clicáveis (escala e mudança de mix-blend-mode).
- Estrutura: Layout de 'Landing Page Hero' ultra-clean, com um CTA central minimalista e ícones Lucide com traço fino (stroke-width: 1px).

Restrições Técnicas:
NÃO inclua cabeçalhos/rodapés externos. O arquivo deve ser 100% auto-contido. Retorne APENAS o código HTML completo, sem blocos de código markdown (\`\`\`html).`
  },
  {
    title: "Claymorphism + Soft 3D",
    description: "Interfaces táteis e amigáveis que parecem feitas de argila ou plástico macio, com cores pastéis.",
    content: `Gere um ÚNICO arquivo HTML autônomo e responsivo (HTML5, Tailwind CSS via CDN e Lucide Icons).

Diretrizes de Design & Sofisticação:
- Estética Claymorphism: Os elementos devem parecer feitos de argila ou plástico macio. Utilize border-radius extremo (rounded-[3rem]) e uma combinação de box-shadow externa suave com duas sombras internas (inset) — uma clara no topo esquerdo e uma escura no canto inferior direito — para criar volume 3D tátil.
- Paleta de Cores: Use tons pastéis "doces" (ex: Azul bebê #A5D8FF, Rosa chiclete #FFD6E8, Lilás #E5DBFF). O fundo deve ser um gradiente radial muito suave entre duas cores pastéis próximas.
- Profundidade e Camadas: Implemente o efeito de flutuação. Use GSAP para criar uma animação de 'Floating' contínua (bobbing) nos elementos principais, fazendo-os subir e descer levemente em tempos diferentes.
- Tipografia: Use a fonte 'Outfit' ou 'Quicksand' via Google Fonts para manter o aspecto amigável e arredondado. Títulos em font-bold e cores de texto em tons de cinza azulado escuro (text-slate-700).
- Interatividade: Adicione um efeito de 'Squeeze' (compressão) no clique via CSS active:scale-95 e transições de hover:scale-105 extremamente suaves.
- Estrutura: Layout estilo 'Onboarding Cards' ou 'Feature Showcase' com ícones Lucide estilizados com traços grossos e cores vibrantes.

Restrições Técnicas:
NÃO inclua cabeçalhos/rodapés externos. O arquivo deve ser 100% auto-contido. Retorne APENAS o código HTML completo, sem blocos de código markdown (\`\`\`html).`
  },
  {
    title: "Retro-Futurismo Synthwave + Clean Cyberpunk",
    description: "Nostalgia tecnológica com acabamento premium, luzes neon refinadas e tipografia monospace.",
    content: `Gere um ÚNICO arquivo HTML autônomo e responsivo (HTML5, Tailwind CSS via CDN e Lucide Icons).

Diretrizes de Design & Sofisticação:
- Estética Retro-Futurista Clean: Combine o estilo noir tecnológico com elegância moderna. Utilize um fundo sólido ultra-escuro (bg-[#020205]) com uma grade de perspectiva (CSS grid floor) no rodapé que desaparece no horizonte com mask-image linear-gradient.
- Neon Refinado: Evite o excesso de brilho. Use cores neon (Ciano #00f3ff e Magenta #ff00ff) apenas como luzes de contorno (border com drop-shadow de 5px) e detalhes em pequenos LEDs indicadores.
- Tipografia Monospace & Display: Use a fonte 'Space Mono' para dados e labels, e 'Syncopate' ou 'Orbitron' via Google Fonts para títulos principais. Aplique um efeito sutil de 'flicker' (piscar) via CSS Keyframes em elementos de destaque.
- Interatividade & Efeitos de Vidro Negro: Utilize containers com bg-black/60 e backdrop-blur-lg. Ao passar o mouse, a borda neon do elemento deve aumentar de intensidade e o texto deve ganhar um efeito de 'glitch' controlado e rápido.
- Animações: Use GSAP para criar uma linha de 'scanline' que percorre a tela verticalmente e animações de entrada estilo 'terminal boot' (texto surgindo caractere por caractere).
- Estrutura: Layout de 'Command Center' ou 'Tech Dashboard', com ícones Lucide estilizados em modo duotone usando as cores neon da paleta.

Restrições Técnicas:
NÃO inclua cabeçalhos/rodapés externos. O arquivo deve ser 100% auto-contido. Retorne APENAS o código HTML completo, sem blocos de código markdown (\`\`\`html).`
  },
  {
    title: "Skeuomorph Moderno (Neuomorphism 2.0)",
    description: "Realismo tátil minimalista com sombras duplas precisas e sofisticação monocromática.",
    content: `Gere um ÚNICO arquivo HTML autônomo e responsivo (HTML5, Tailwind CSS via CDN e Lucide Icons).

Diretrizes de Design & Sofisticação:
- Estética Neuomorphism 2.0: Diferente da primeira versão, esta deve ser refinada. Utilize uma cor de base única para fundo e elementos (ex: Cinza Suave #E0E5EC ou Azul Gelo #E2E8F0). Crie volume usando sombras duplas precisas: uma sombra clara (white) no topo/esquerda e uma sombra escura (rgba(163,177,198,0.6)) na base/direita.
- Textura e Material: Adicione uma leve curvatura côncava ou convexa aos cards usando gradientes lineares quase imperceptíveis que seguem a direção da luz.
- Acentos de Cor: Escolha uma única cor de destaque vibrante (ex: Azul Elétrico ou Verde Esmeralda) apenas para estados ativos, indicadores de Toggle ou ícones principais, quebrando a monocromia.
- Tipografia: Use a fonte 'Inter' ou 'Satoshi' com pesos variados. Títulos devem ter baixo contraste de cor com o fundo para manter a estética minimalista, mas com font-bold para legibilidade.
- Interatividade & Micro-animações: Use GSAP para animar a transição entre estados. Quando um botão for clicado, ele deve trocar as sombras externas por sombras internas (inset), simulando o movimento físico de ser pressionado para dentro do material.
- Estrutura: Layout de 'Smart Home Controller' ou 'Music Player', com botões circulares, sliders personalizados e ícones Lucide que parecem gravados na superfície.

Restrições Técnicas:
NÃO inclua cabeçalhos/rodapés externos. O arquivo deve ser 100% auto-contido. Retorne APENAS o código HTML completo, sem blocos de código markdown (\`\`\`html).`
  },
  {
    title: "Maximalismo Tipográfico + Dark Mode",
    description: "Impacto visual extremo através de fontes gigantes, alto contraste e composições dinâmicas.",
    content: `Gere um ÚNICO arquivo HTML autônomo e responsivo (HTML5, Tailwind CSS via CDN e Lucide Icons).

Diretrizes de Design & Sofisticação:
- Estética Maximalista: O texto deve ser o elemento estrutural. Utilize fontes 'Display' de impacto (Google Fonts 'Syne' ou 'Bricolage Grotesque'). Títulos principais devem ser gigantes (text-7xl ou text-8xl), com letter-spacing extremamente reduzido (tracking-tighter) e pesos variando entre font-black e font-thin.
- Dark Mode de Alto Contraste: Fundo preto absoluto (bg-[#000000]) com texto em branco puro (text-white). Intercale frases com o efeito text-transparent e -webkit-text-stroke: 1px white para criar camadas de profundidade visual apenas com glifos.
- Composição Dinâmica: Quebre o alinhamento padrão. Use textos rotacionados (-rotate-90), textos que se repetem em faixas horizontais (estilo marquee) e sobreposições ousadas onde o texto passa por trás ou pela frente de ícones e botões.
- Animações de Scroll & Reveal: Use GSAP e ScrollTrigger (via CDN) para criar animações de texto que deslizam de direções opostas conforme o usuário rola a página. Adicione um efeito de 'Staggered Letter Reveal' no carregamento inicial.
- Interatividade: Implemente um 'Magnetic Button' para o CTA principal: o botão deve ser atraído sutilmente pelo cursor do mouse usando JS suave.
- Estrutura: Layout de 'Digital Agency Portfolio' ou 'Event Editorial', focado em impacto visual imediato com ícones Lucide agindo apenas como acentos minimalistas.

Restrições Técnicas:
NÃO inclua cabeçalhos/rodapés externos. O arquivo deve ser 100% auto-contido. Retorne APENAS o código HTML completo, sem blocos de código markdown (\`\`\`html).`
  },
  {
    title: "Grainy Textures + Mono-Chrome",
    description: "Visual analógico, editorial e cinematográfico com texturas de ruído e tipografia clássica.",
    content: `Gere um ÚNICO arquivo HTML autônomo e responsivo (HTML5, Tailwind CSS via CDN e Lucide Icons).

Diretrizes de Design & Sofisticação:
- Estética Grainy (Ruído): Aplique um overlay de textura de ruído analógico em toda a página. Use um filtro de ruído SVG feTurbulence dentro de um rect absoluto com opacidade baixa (opacity-20) e pointer-events-none. O visual deve remeter a papel impresso ou fotografia de grão fino.
- Paleta Monocromática Sofisticada: Use uma escala rigorosa de cinzas e pretos, fugindo do branco puro. Fundo em cinza médio-quente (bg-[#1a1a1a]) e elementos em tons contrastantes. Utilize mix-blend-mode (como difference ou overlay) para criar interações visuais ricas entre o texto e o fundo.
- Minimalismo Editorial: Use tipografia serifada de alta classe (Google Fonts 'Cormorant Garamond' ou 'Fraunces') para corpo de texto e uma sans-serif geométrica ('Inter') para metadados. Mantenha grandes margens e muito respiro (whitespace).
- Profundidade Cinematográfica: Utilize imagens ou placeholders com filtros grayscale(100%) e contrast(120%). As transições entre seções devem ser suaves, simulando um 'fade out' de cinema.
- Interatividade & Animações: Use GSAP para criar um efeito de 'Lens Blur' ou 'Focus In' (o conteúdo começa desfocado e ganha nitidez ao entrar no viewport). O cursor deve ser um círculo simples que inverte as cores do que está por baixo.
- Estrutura: Layout estilo 'Luxury Lookbook' ou 'Architecture Portfolio', com grid ortogonal e ícones Lucide com stroke-width: 0.75px para máxima elegância.

Restrições Técnicas:
NÃO inclua cabeçalhos/rodapés externos. O arquivo deve ser 100% auto-contido. Retorne APENAS o código HTML completo, sem blocos de código markdown (\`\`\`html).`
  },
  {
    title: "Bauhaus Modernizado",
    description: "Geometria pura, funcionalismo histórico e paleta primária sobre fundo papel.",
    content: `Gere um ÚNICO arquivo HTML autônomo e responsivo (HTML5, Tailwind CSS via CDN e Lucide Icons).

Diretrizes de Design & Sofisticação:
- Estética Bauhaus Contemporânea: Baseie o design em formas geométricas puras (círculos, quadrados e triângulos perfeitos). Utilize um grid ortogonal rigoroso com divisórias sólidas de 1px (border-slate-900/10).
- Paleta Primária Sofisticada: Use a tríade clássica (Amarelo #F4D03F, Vermelho #E74C3C, Azul #2E86C1), mas aplicadas sobre um fundo 'Papel' (bg-[#FDFCF5]) para evitar um visual infantil. Use o preto (#1A1A1A) apenas para tipografia e formas estruturais.
- Assimetria Equilibrada: Posicione elementos de forma assimétrica, mas mantendo o equilíbrio de pesos visuais. Use flex e grid do Tailwind para criar composições onde o texto e as formas se interceptam.
- Tipografia Funcional: Use exclusivamente fontes sem serifa geométricas (Google Fonts 'Archivio' ou 'Montserrat'). Títulos devem ser em caixa alta (uppercase) com font-bold e alinhamentos variados (esquerda e direita alternados).
- Animações Construtivistas: Use GSAP para animar a montagem da página: formas geométricas devem deslizar de fora da tela e se encaixar em suas posições como um quebra-cabeça técnico. Adicione rotações de 90° ou 180° em ícones Lucide no hover.
- Estrutura: Layout de 'Design Studio Concept' ou 'Portfolio de Engenharia', com seções numeradas (01, 02, 03) em fontes grandes e ícones Lucide simplificados.

Restrições Técnicas:
NÃO inclua cabeçalhos/rodapés externos. O arquivo deve ser 100% auto-contido. Retorne APENAS o código HTML completo, sem blocos de código markdown (\`\`\`html).`
  },
  {
    title: "Holographic / Iridescent Design",
    description: "Visual Web3 futurista com refração de luz, gradientes complexos e efeitos 3D de inclinação.",
    content: `Gere um ÚNICO arquivo HTML autônomo e responsivo (HTML5, Tailwind CSS via CDN e Lucide Icons).

Diretrizes de Design & Sofisticação:
- Estética Holográfica: Crie superfícies que simulem a refração de luz metálica. Utilize gradientes lineares e radiais complexos com múltiplos stops de cor (azul ciano, rosa choque, lavanda e verde limão). Aplique um efeito de 'shimmer' (brilho móvel) usando background-size: 200% e uma animação infinita de deslocamento de background.
- Refração e Brilho: Use containers com bg-white/10 e um backdrop-blur-2xl. Adicione uma borda iridescente fina usando border-image-source com um gradiente colorido. Aplique um drop-shadow colorido que mude de matiz (hue-rotate) continuamente.
- Profundidade Espacial: O fundo deve ser um 'Dark Space' profundo (bg-[#030308]) para que as superfícies holográficas saltem aos olhos. Use pequenas partículas ou pontos de luz sutis flutuando no fundo.
- Tipografia Futurista: Use a fonte 'Outfit' ou 'Space Grotesk' via Google Fonts. Títulos devem ter um leve efeito de brilho externo (text-shadow) e cores de gradiente que acompanham a paleta holográfica.
- Interatividade & Animações: Use GSAP para criar um efeito de 'Tilt 3D' baseado no movimento do mouse: os cards devem rotacionar levemente e o gradiente interno deve se deslocar conforme o cursor se move, simulando a mudança de reflexo da luz.
- Estrutura: Layout de 'Web3 Dashboard' ou 'NFT Marketplace Concept', com botões de ação que possuem um brilho intenso no hover e ícones Lucide com acabamento metálico.

Restrições Técnicas:
NÃO inclua cabeçalhos/rodapés externos. O arquivo deve ser 100% auto-contido. Retorne APENAS o código HTML completo, sem blocos de código markdown (\`\`\`html).`
  },
  {
    title: "Swiss Design + Grid Brutalism",
    description: "Precisão suíça com estrutura industrial aparente, tipografia radical e grid modular visível.",
    content: `Gere um ÚNICO arquivo HTML autônomo e responsivo (HTML5, Tailwind CSS via CDN e Lucide Icons).

Diretrizes de Design & Sofisticação:
- Estética Swiss Design (Estilo Internacional): Foque em clareza absoluta e funcionalidade. Utilize um grid modular matemático e rigoroso, visível através de linhas de divisão finas (border-slate-200). O fundo deve ser um 'Paper White' limpo (bg-[#f8f8f8]).
- Grids Brutalistas: Use um layout de colunas fixas que não se escondem. Exiba o esqueleto do site com bordas sólidas. Crie seções com tamanhos variados que se encaixam como um sistema de prateleiras.
- Tipografia Suíça Clássica: Use exclusivamente a fonte 'Inter' ou 'Plus Jakarta Sans' (como alternativa moderna à Helvetica). Aplique uma hierarquia tipográfica drástica: use text-xs uppercase tracking-[0.2em] para labels e text-6xl font-black para títulos principais, sempre com alinhamento à esquerda.
- Uso Estratégico do Vermelho Suíço: Mantenha a interface quase inteiramente em preto, branco e cinza, utilizando o vermelho vibrante (bg-[#ff0000]) apenas para elementos de ação (CTAs) ou pontos de foco extremamente específicos.
- Interatividade & Animações: Use GSAP para criar transições de 'Grid Reveal' (as linhas do grid se desenham primeiro e o conteúdo preenche depois). As animações devem ser secas e rápidas (sem elasticidade), enfatizando a precisão técnica.
- Estrutura: Layout de 'Index' ou 'Product Catalog', com numeração técnica para cada seção e ícones Lucide pequenos e precisos (stroke-width: 1.5px), sempre alinhados ao topo dos seus respectivos grids.

Restrições Técnicas:
NÃO inclua cabeçalhos/rodapés externos. O arquivo deve ser 100% auto-contido. Retorne APENAS o código HTML completo, sem blocos de código markdown (\`\`\`html).`
  }
];

// --- Components ---

const HeroSection = ({ title, subtitle, colors }: { title: string, subtitle: string, colors: BrandConfig }) => (
  <section className="text-center mb-16 animate-fade-in">
    <div 
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-6 border"
      style={{ backgroundColor: `${colors.primaryBlue}10`, color: colors.primaryBlue, borderColor: `${colors.primaryBlue}20` }}
    >
      <Sparkles size={14} /> Hub Conexão Digital
    </div>
    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
      {title}
    </h1>
    <p className="text-slate-500 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
      {subtitle}
    </p>
  </section>
);

const GridSection = ({ title, items, colors }: { title?: string, items: any[], colors: BrandConfig }) => (
  <div className="mb-20">
    {title && <h3 className="text-2xl font-bold mb-8 text-center">{title}</h3>}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {items?.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group"
          style={{ borderLeft: item.color === 'gold' ? `4px solid ${colors.primaryGold}` : '1px solid #f1f5f9' }}
        >
          <div 
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg transition-transform group-hover:scale-110 text-white"
            style={{ backgroundColor: item.color === 'gold' ? colors.primaryGold : item.color === 'blue' ? colors.primaryBlue : '#1e293b' }}
          >
            {item.icon === 'zap' && <Zap />}
            {item.icon === 'shield-check' && <ShieldCheck />}
            {item.icon === 'activity' && <Activity />}
            {item.icon === 'layers' && <Layers />}
            {item.icon === 'info' && <Info />}
            {!item.icon && <ChevronRight />}
          </div>
          <h4 className="text-xl font-bold mb-3 text-slate-800">{item.title}</h4>
          <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

const ComparisonSection = ({ title, headers, rows, colors }: { title?: string, headers: string[], rows: string[][], colors: BrandConfig }) => (
  <div className="mb-20">
    {title && <h3 className="text-2xl font-bold mb-8 text-center">{title}</h3>}
    <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50 bg-slate-50/30">
              {headers?.map((h, i) => (
                <th key={i} className="px-8 py-6" style={{ color: i > 0 && headers.length > 2 && i === headers.length - 1 ? colors.primaryGold : undefined }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {rows?.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                {row?.map((cell, j) => (
                  <td 
                    key={j} 
                    className={`px-8 py-6 text-sm ${j === 0 ? 'font-bold text-slate-700' : 'text-slate-500'}`}
                    style={{ 
                      color: j > 0 && headers.length > 2 && j === headers.length - 1 ? colors.primaryGold : undefined,
                      backgroundColor: j > 0 && headers.length > 2 && j === headers.length - 1 ? `${colors.primaryGold}05` : undefined,
                      fontWeight: j > 0 && headers.length > 2 && j === headers.length - 1 ? '900' : undefined
                    }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const CalloutSection = ({ title, text, accent, colors }: { title: string, text: string, accent: 'gold' | 'blue', colors: BrandConfig }) => (
  <section 
    className="rounded-[3rem] overflow-hidden text-white mb-20 shadow-2xl"
    style={{ backgroundColor: accent === 'gold' ? '#0f172a' : colors.primaryBlue }}
  >
    <div className="flex flex-col lg:flex-row">
      <div className="p-10 lg:p-16 lg:w-3/5">
        <span 
          className="font-bold text-[11px] uppercase tracking-[0.4em] mb-6 block"
          style={{ color: accent === 'gold' ? colors.primaryGold : '#bfdbfe' }}
        >
          Destaque Técnico
        </span>
        <h3 className="text-3xl md:text-4xl font-black mb-8 leading-tight">{title}</h3>
        <p className="text-slate-400 text-base md:text-lg leading-relaxed">{text}</p>
      </div>
      <div 
        className="lg:w-2/5 flex flex-col items-center justify-center p-16 text-center relative overflow-hidden"
        style={{ backgroundColor: accent === 'gold' ? colors.primaryGold : '#2563eb' }}
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_white_0%,_transparent_70%)]"></div>
        </div>
        <div className="relative z-10">
          <ShieldCheck size={64} className="text-white/40 mb-4 mx-auto" />
          <div className="text-xl font-black uppercase tracking-[0.2em] text-white">Qualidade Conexão</div>
        </div>
      </div>
    </div>
  </section>
);

// --- Main App ---

export default function App() {
  // State
  const [view, setView] = useState<ViewType>('branding');
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('');
  const [session, setSession] = useState<Session | null>(null);
  const [authEmail, setAuthEmail] = useState('conexaosistemasdeprotese@gmail.com');
  const [authPassword, setAuthPassword] = useState('@#1984198720042009@#');

  // Data State
  const [brandConfig, setBrandConfig] = useState<BrandConfig>({
    primaryBlue: '#004a8e',
    primaryGold: '#c5a059',
    description: 'A Conexão Sistemas de Prótese é líder em inovação para implantodontia...',
    systemPrompt: `Gere um ÚNICO arquivo HTML autônomo contendo HTML, CSS (use Tailwind via CDN: https://cdn.tailwindcss.com) e JS (use Lucide Icons via CDN: https://unpkg.com/lucide@latest).
NÃO inclua cabeçalhos ou rodapés externos do construtor.
Aplique o branding fornecido de forma elegante e profissional.
Use animações suaves (pode usar CSS puro ou bibliotecas via CDN se necessário).
O arquivo deve ser auto-contido e pronto para ser aberto em qualquer navegador.
Retorne APENAS o código HTML completo, sem blocos de código markdown (\`\`\`html).`
  });
  
  const [apiKeys, setApiKeys] = useState<ApiKeys>({
    gemini: '',
    openai: '',
    claude: '',
    groq: ''
  });

  const [rawText, setRawText] = useState<string>('');
  const [markdownText, setMarkdownText] = useState<string>(`# Diferenças entre os Implantes: Flex Gold, Flash e Torque

As diferenças entre os implantes Flex Gold, Flash e Torque estão principalmente na sua indicação para diferentes tipos de densidade óssea.

## Modelos Principais

- **Flash**: Excelente travamento na maxila (osso macio) e alvéolo imediato. Design com rosca fina e cortante.
- **Torque**: Performance em mandíbula (osso duro). Macroestrutura focada em torque.
- **Flex Gold**: A solução 2 em 1. Híbrido universal que une os benefícios do Flash e Torque.

## Comparativo Técnico

| Característica | Flash | Torque | Flex Gold |
| :--- | :--- | :--- | :--- |
| Foco Principal | Maxila | Mandíbula | Universal |
| Ação Óssea | Compactante | Estabilidade | Corte + Compactação |
| Complexidade | Alta em osso duro | Fluida em mandíbula | Simplificada |

O Flex Gold é a tendência atual para clínicas que buscam um implante para tudo.`);
  
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [selectedApi, setSelectedApi] = useState<keyof ApiKeys>('gemini');
  const [selectedLang, setSelectedLang] = useState<'pt' | 'en' | 'es' | 'all'>('pt');
  const [filename, setFilename] = useState<string>('minha-pagina');
  const [generatedHtml, setGeneratedHtml] = useState<string>('');
  const [materials, setMaterials] = useState<GeneratedMaterial[]>([]);
  const [promptLibrary, setPromptLibrary] = useState<PromptLibraryEntry[]>([]);
  const [selectedPromptId, setSelectedPromptId] = useState<string>('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState<string>('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // --- Supabase Integration ---

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      loadUserData();
    } else {
      setMaterials([]);
      setApiKeys({ gemini: '', openai: '', claude: '', groq: '' });
    }
  }, [session]);

  const loadUserData = async () => {
    if (!session) return;
    setLoading(true);
    setLoadingMsg('Carregando seus dados do Supabase...');

    try {
      // Load Branding
      const { data: branding, error: bError } = await supabase
        .from('branding_configs')
        .select('*')
        .single();
      
      if (branding && !bError) {
        setBrandConfig({
          primaryBlue: branding.primary_blue,
          primaryGold: branding.primary_gold,
          description: branding.description,
          pdfName: branding.pdf_name,
          systemPrompt: branding.system_prompt || brandConfig.systemPrompt
        });
      }

      // Load API Keys
      const { data: keys, error: kError } = await supabase
        .from('api_keys')
        .select('*');
      
      if (keys && !kError) {
        const newKeys = { ...apiKeys };
        keys.forEach(k => {
          if (k.service_name in newKeys) {
            (newKeys as any)[k.service_name] = k.key_value;
          }
        });
        setApiKeys(newKeys);
      }

      // Load Materials
      const { data: mats, error: mError } = await supabase
        .from('generated_materials')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (mats && !mError) {
        setMaterials(mats.map(m => ({
          id: m.id,
          name: m.name,
          html: m.html_content,
          timestamp: new Date(m.created_at).getTime()
        })));
      }

      // Load Prompt Library
      const { data: prompts, error: pError } = await supabase
        .from('prompt_library')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (prompts && !pError) {
        setPromptLibrary(prompts);
      }
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoadingMsg('Entrando...');

    try {
      const { error } = await supabase.auth.signInWithPassword({ email: authEmail, password: authPassword });
      if (error) throw error;
    } catch (error: any) {
      alert(`Erro na autenticação: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const saveBranding = async () => {
    if (!session) return alert('Você precisa estar logado para salvar.');
    setLoading(true);
    setLoadingMsg('Salvando branding no Supabase...');

    try {
      const { error } = await supabase
        .from('branding_configs')
        .upsert({
          user_id: session.user.id,
          primary_blue: brandConfig.primaryBlue,
          primary_gold: brandConfig.primaryGold,
          description: brandConfig.description,
          pdf_name: brandConfig.pdfName,
          system_prompt: brandConfig.systemPrompt
        });
      
      if (error) throw error;
      alert('Branding salvo com sucesso!');
    } catch (error: any) {
      alert(`Erro ao salvar branding: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const saveApiKeys = async () => {
    if (!session) return alert('Você precisa estar logado para salvar.');
    setLoading(true);
    setLoadingMsg('Salvando chaves de API no Supabase...');

    try {
      const keysToSave = Object.entries(apiKeys).map(([service, value]) => ({
        user_id: session.user.id,
        service_name: service,
        key_value: value
      }));

      const { error } = await supabase
        .from('api_keys')
        .upsert(keysToSave, { onConflict: 'user_id,service_name' });
      
      if (error) throw error;
      alert('Chaves de API salvas com sucesso!');
    } catch (error: any) {
      alert(`Erro ao salvar chaves: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const savePromptToLibrary = async () => {
    if (!session) return alert('Você precisa estar logado.');
    const title = prompt('Dê um título para este prompt na biblioteca:');
    if (!title) return;
    const description = prompt('Dê uma breve descrição para este estilo:');

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('prompt_library')
        .insert({
          user_id: session.user.id,
          title,
          content: brandConfig.systemPrompt,
          description
        })
        .select();
      
      if (error) throw error;
      if (data) {
        setPromptLibrary(prev => [data[0], ...prev]);
        setSelectedPromptId(data[0].id);
      }
      alert('Prompt salvo na biblioteca!');
    } catch (err: any) {
      alert(`Erro ao salvar: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const seedPromptLibrary = async () => {
    if (!session) return alert('Você precisa estar logado.');
    if (!confirm('Deseja importar os 11 estilos de design padrão para sua biblioteca?')) return;

    setLoading(true);
    setLoadingMsg('Importando biblioteca de estilos...');
    try {
      const promptsToInsert = DEFAULT_PROMPTS.map(p => ({
        user_id: session.user.id,
        title: p.title,
        content: p.content,
        description: p.description
      }));

      const { data, error } = await supabase
        .from('prompt_library')
        .insert(promptsToInsert)
        .select();
      
      if (error) throw error;
      if (data) {
        setPromptLibrary(prev => [...data, ...prev]);
      }
      alert('Biblioteca de estilos importada com sucesso!');
    } catch (err: any) {
      alert(`Erro ao importar: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // --- Logic ---

  const downloadHtml = (html: string, name: string) => {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name.replace(/\.[^/.]+$/, "")}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const deleteMaterial = async (id: string) => {
    setDeleteConfirmId(id);
  };

  const confirmDelete = async () => {
    if (!deleteConfirmId) return;
    
    setLoading(true);
    setLoadingMsg('Excluindo material...');

    try {
      if (session) {
        const { error } = await supabase
          .from('generated_materials')
          .delete()
          .eq('id', deleteConfirmId)
          .eq('user_id', session.user.id);
        if (error) throw error;
      }
      setMaterials(prev => prev.filter(m => m.id !== deleteConfirmId));
      setDeleteConfirmId(null);
    } catch (error: any) {
      alert(`Erro ao excluir: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const previewMaterial = (material: GeneratedMaterial) => {
    setGeneratedHtml(material.html);
    setFilename(material.name);
    setView('preview');
  };

  const updateMaterialName = async (id: string) => {
    const nameToSave = editName.trim();
    if (!nameToSave) {
      setEditingId(null);
      return;
    }
    
    // Guardar estado anterior para rollback em caso de erro
    const previousMaterials = [...materials];
    
    // 1. Atualização Otimista (Front-end reflete na hora)
    setMaterials(prev => prev.map(m => m.id === id ? { ...m, name: nameToSave } : m));
    setEditingId(null);
    setEditName('');

    // 2. Persistência no Back-end (Supabase)
    if (session) {
      try {
        // Incluímos o user_id para garantir que o RLS do Supabase valide a permissão de escrita
        const { data, error } = await supabase
          .from('generated_materials')
          .update({ name: nameToSave })
          .eq('id', id)
          .eq('user_id', session.user.id)
          .select();
        
        if (error) throw error;

        // Se data estiver vazio, significa que nenhuma linha foi atualizada (ID não encontrado ou RLS bloqueou)
        if (!data || data.length === 0) {
          throw new Error("O registro não foi encontrado ou você não tem permissão para editá-lo.");
        }

        console.log("Sucesso ao atualizar no Supabase:", data);
      } catch (error: any) {
        alert('Erro ao salvar no banco de dados: ' + error.message);
        // Reverter se falhar para o usuário não achar que salvou
        setMaterials(previousMaterials);
      }
    }
  };

  const convertToMarkdown = async () => {
    if (!rawText.trim()) return;
    setLoading(true);
    setLoadingMsg('Transformando texto em Markdown estruturado...');
    
    try {
      const apiKey = apiKeys.gemini || process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error("API Key do Gemini não encontrada.");

      const ai = new GoogleGenAI({ apiKey });
      
      const contents: any[] = [
        { text: `Transforme o seguinte texto em um Markdown bem estruturado, com títulos, listas e tabelas se necessário:\n\n${rawText}` }
      ];

      if (brandConfig.pdfBase64) {
        contents.push({
          inlineData: {
            mimeType: "application/pdf",
            data: brandConfig.pdfBase64
          }
        });
        contents[0].text += "\n\nUse o PDF de branding anexado como referência para o tom de voz e estrutura.";
      }

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: { parts: contents },
        config: {
          systemInstruction: "Você é um assistente especializado em estruturação de conteúdo técnico em Markdown."
        }
      });

      if (!response.text) throw new Error("Sem resposta do modelo.");
      setMarkdownText(response.text);
      setView('editor');
    } catch (error: any) {
      alert(`Erro: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const generateSinglePage = async (lang: 'pt' | 'en' | 'es', customFilename: string) => {
    const apiKey = apiKeys[selectedApi] || (selectedApi === 'gemini' ? process.env.GEMINI_API_KEY : '');
    if (!apiKey) throw new Error(`API Key para ${selectedApi.toUpperCase()} não encontrada na aba API Keys.`);

    const ai = new GoogleGenAI({ apiKey: selectedApi === 'gemini' ? apiKey : (apiKeys.gemini || process.env.GEMINI_API_KEY || '') });
    
    const langNames = { pt: 'Português (Brasil)', en: 'Inglês (EN-US)', es: 'Espanhol (ES-ES)' };
    
    const parts: any[] = [
      { text: `
        Markdown de entrada:
        ${markdownText}

        Diretrizes de Branding:
        ${brandConfig.description}
        Cores: Azul (${brandConfig.primaryBlue}), Dourado (${brandConfig.primaryGold})

        IDIOMA DA PÁGINA: ${langNames[lang]}
        TRADUÇÃO: Traduza todo o conteúdo do Markdown fielmente para o idioma ${langNames[lang]}, mantendo a precisão técnica.

        INSTRUÇÃO DE GERAÇÃO:
        ${brandConfig.systemPrompt}
      ` }
    ];

    if (brandConfig.pdfBase64) {
      parts.push({
        inlineData: {
          mimeType: "application/pdf",
          data: brandConfig.pdfBase64
        }
      });
      parts[0].text += "\n\nIMPORTANTE: Siga rigorosamente a identidade visual e diretrizes contidas no PDF de branding anexado.";
    }

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: { parts },
      config: {
        systemInstruction: "Você é um desenvolvedor front-end sênior e tradutor técnico especializado em criar páginas de destino (landing pages) de alta conversão."
      }
    });

    let html = response.text || '';
    html = html.replace(/^```html/, '').replace(/```$/, '').trim();
    
    if (session) {
      const { data, error } = await supabase
        .from('generated_materials')
        .insert({
          user_id: session.user.id,
          name: customFilename,
          html_content: html
        })
        .select()
        .single();
      
      if (data && !error) {
        const newMaterial: GeneratedMaterial = {
          id: data.id,
          name: data.name,
          html: data.html_content,
          timestamp: new Date(data.created_at).getTime()
        };
        setMaterials(prev => [newMaterial, ...prev]);
      }
    } else {
      const newMaterial: GeneratedMaterial = {
        id: Math.random().toString(36).substr(2, 9),
        name: customFilename,
        html: html,
        timestamp: Date.now()
      };
      setMaterials(prev => [newMaterial, ...prev]);
    }

    return html;
  };

  const generatePage = async () => {
    if (!markdownText.trim()) return;
    setLoading(true);
    
    try {
      if (selectedLang === 'all') {
        const langs: ('pt' | 'en' | 'es')[] = ['pt', 'en', 'es'];
        let lastHtml = '';
        for (const lang of langs) {
          setLoadingMsg(`Gerando versão ${lang.toUpperCase()}...`);
          lastHtml = await generateSinglePage(lang, `${filename}-${lang}`);
        }
        setGeneratedHtml(lastHtml);
        setFilename(`${filename}-es`); // Show the last one in preview
      } else {
        setLoadingMsg(`Gerando página interativa (${selectedLang.toUpperCase()})...`);
        const html = await generateSinglePage(selectedLang, filename);
        setGeneratedHtml(html);
      }

      setView('preview');
    } catch (error: any) {
      alert(`Erro: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Por favor, envie apenas arquivos PDF.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = (event.target?.result as string).split(',')[1];
        setBrandConfig({
          ...brandConfig,
          pdfBase64: base64,
          pdfName: file.name
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removePdf = () => {
    setBrandConfig({
      ...brandConfig,
      pdfBase64: undefined,
      pdfName: undefined
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: brandConfig.primaryBlue }}>
              <Sparkles size={24} />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight uppercase">
                Conexão <span style={{ color: brandConfig.primaryGold }}>Digital</span>
              </h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Interactive Builder</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {session ? (
              <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-500">
                  <User size={16} />
                </div>
                <div className="hidden sm:block">
                  <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">Usuário</p>
                  <p className="text-xs font-bold text-slate-700 truncate max-w-[180px]">{session.user.email}</p>
                </div>
                <button 
                  onClick={() => supabase.auth.signOut()}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                  title="Sair"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setView('keys')} // Or show a modal
                className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-800 transition-all"
              >
                <LogIn size={16} /> Entrar
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Navigation Sub-header */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-[73px] z-40 px-6 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-1 overflow-x-auto max-w-full">
          {[
            { id: 'branding', icon: Palette, label: 'Branding' },
            { id: 'keys', icon: Key, label: 'API Keys' },
            { id: 'converter', icon: FileText, label: 'Converter' },
            { id: 'editor', icon: Code, label: 'Editor' },
            { id: 'preview', icon: Eye, label: 'Preview' },
            { id: 'materials', icon: History, label: 'Materiais' }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setView(tab.id as ViewType)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${view === tab.id ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
            >
              <tab.icon size={14} /> {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Loading Overlay */}
        <AnimatePresence>
          {loading && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[100] flex items-center justify-center p-6"
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-[3rem] p-16 text-center max-w-lg shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] border border-white/20"
              >
                <h3 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Processando...</h3>
                <p className="text-slate-400 font-medium text-lg leading-relaxed">{loadingMsg || 'Carregando seus dados do Supabase...'}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {/* 1. Branding Tab */}
          {view === 'branding' && (
            <motion.div key="branding" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-2xl mx-auto">
              <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm">
                <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
                  <Palette className="text-slate-400" /> Cores da Marca
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Azul Primário</label>
                    <div className="flex gap-3">
                      <input type="color" value={brandConfig.primaryBlue} onChange={(e) => setBrandConfig({...brandConfig, primaryBlue: e.target.value})} className="w-12 h-12 rounded-lg cursor-pointer" />
                      <input type="text" value={brandConfig.primaryBlue} onChange={(e) => setBrandConfig({...brandConfig, primaryBlue: e.target.value})} className="flex-1 px-4 border rounded-lg font-mono text-sm" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Dourado Primário</label>
                    <div className="flex gap-3">
                      <input type="color" value={brandConfig.primaryGold} onChange={(e) => setBrandConfig({...brandConfig, primaryGold: e.target.value})} className="w-12 h-12 rounded-lg cursor-pointer" />
                      <input type="text" value={brandConfig.primaryGold} onChange={(e) => setBrandConfig({...brandConfig, primaryGold: e.target.value})} className="flex-1 px-4 border rounded-lg font-mono text-sm" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2 mb-8">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Documento de Branding / Descrição</label>
                  <textarea 
                    value={brandConfig.description} 
                    onChange={(e) => setBrandConfig({...brandConfig, description: e.target.value})}
                    className="w-full h-32 p-4 border rounded-xl outline-none focus:ring-2 focus:ring-slate-200"
                    placeholder="Descreva o tom de voz, valores e diretrizes da marca..."
                  />
                </div>

                <div className="space-y-2 mb-8">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Manual da Marca (PDF)</label>
                  {!brandConfig.pdfName ? (
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 transition-all group">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FileUp className="w-8 h-8 text-slate-300 group-hover:text-slate-400 mb-2" />
                        <p className="text-sm text-slate-500">Clique para subir o manual em PDF</p>
                        <p className="text-[10px] text-slate-400 uppercase font-bold mt-1">Máximo 10MB</p>
                      </div>
                      <input type="file" className="hidden" accept="application/pdf" onChange={handlePdfUpload} />
                    </label>
                  ) : (
                    <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-10 h-10 bg-red-50 text-red-500 rounded-lg flex items-center justify-center shrink-0">
                          <FileText size={20} />
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-sm font-bold text-slate-700 truncate">{brandConfig.pdfName}</p>
                          <p className="text-[10px] text-slate-400 uppercase font-bold">PDF Carregado</p>
                        </div>
                      </div>
                      <button onClick={removePdf} className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-400">
                        <X size={18} />
                      </button>
                    </div>
                  )}
                </div>

                <button onClick={saveBranding} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all mb-4">
                  <Save size={18} /> Salvar Branding no Supabase
                </button>
                <button onClick={() => setView('keys')} className="w-full bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-all">
                  Próximo Passo: Chaves de API <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {/* 2. API Keys Tab */}
          {view === 'keys' && (
            <motion.div key="keys" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-2xl mx-auto">
              <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm">
                <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
                  <Key className="text-slate-400" /> Chaves de API
                </h2>
                <div className="space-y-6 mb-8">
                  {[
                    { id: 'gemini', label: 'Google Gemini', placeholder: 'AI Studio Key...' },
                    { id: 'openai', label: 'OpenAI', placeholder: 'sk-...' },
                    { id: 'claude', label: 'Anthropic Claude', placeholder: 'sk-ant-...' },
                    { id: 'groq', label: 'Groq', placeholder: 'gsk_...' }
                  ].map((key) => (
                    <div key={key.id} className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">{key.label}</label>
                      <input 
                        type="password" 
                        value={(apiKeys as any)[key.id]} 
                        onChange={(e) => setApiKeys({...apiKeys, [key.id]: e.target.value})}
                        placeholder={key.placeholder}
                        className="w-full px-4 py-3 border rounded-xl font-mono text-sm outline-none focus:ring-2 focus:ring-slate-200"
                      />
                    </div>
                  ))}
                </div>
                <button onClick={saveApiKeys} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all mb-4">
                  <Save size={18} /> Salvar Chaves no Supabase
                </button>

                {!session && (
                  <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl mb-8">
                    <h4 className="text-amber-800 font-black text-sm uppercase mb-2 flex items-center gap-2">
                      <LogIn size={16} /> Acesso Restrito
                    </h4>
                    <p className="text-amber-700 text-xs mb-4">Utilize as credenciais mestre para acessar a plataforma.</p>
                    <form onSubmit={handleAuth} className="space-y-3">
                      <input 
                        type="email" placeholder="E-mail" value={authEmail} onChange={e => setAuthEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-xl text-sm outline-none" required
                      />
                      <input 
                        type="password" placeholder="Senha" value={authPassword} onChange={e => setAuthPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-xl text-sm outline-none" required
                      />
                      <button type="submit" className="w-full bg-amber-600 text-white py-2 rounded-xl text-xs font-bold hover:bg-amber-700 transition-all">
                        Entrar
                      </button>
                    </form>
                  </div>
                )}

                <button onClick={() => setView('converter')} className="w-full bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-all">
                  Próximo Passo: Texto para Markdown <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {/* 3. Converter Tab */}
          {view === 'converter' && (
            <motion.div key="converter" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-black mb-2">Texto para Markdown</h2>
                <p className="text-slate-500">Cole qualquer texto bruto aqui e nossa IA irá estruturá-lo automaticamente.</p>
                <textarea 
                  value={rawText} onChange={(e) => setRawText(e.target.value)}
                  placeholder="Cole seu texto aqui (ex: notas de reunião, PDF copiado, rascunho)..."
                  className="w-full h-[400px] p-6 border rounded-[2rem] outline-none focus:ring-2 focus:ring-slate-200 shadow-sm"
                />
                <button onClick={convertToMarkdown} disabled={!rawText.trim()} className="w-full bg-[#004a8e] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50">
                  <Wand2 size={18} /> Converter para Markdown
                </button>
              </div>
              <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-200 flex flex-col items-center justify-center text-center">
                <FileText size={48} className="text-slate-200 mb-4" />
                <p className="text-slate-400 font-medium">O resultado aparecerá automaticamente na aba Editor após a conversão.</p>
              </div>
            </motion.div>
          )}

          {/* 4. Editor Tab */}
          {view === 'editor' && (
            <motion.div key="editor" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-black mb-2">Markdown para HTML</h2>
                <p className="text-slate-500">Refine o Markdown e configure a geração da página.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Modelo de IA</label>
                    <select 
                      value={selectedApi} 
                      onChange={(e) => setSelectedApi(e.target.value as keyof ApiKeys)}
                      className="w-full px-4 py-2 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-slate-200"
                    >
                      <option value="gemini">Google Gemini</option>
                      <option value="openai">OpenAI (GPT-4o)</option>
                      <option value="claude">Anthropic Claude</option>
                      <option value="groq">Groq (Llama 3)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Idioma</label>
                    <select 
                      value={selectedLang} 
                      onChange={(e) => setSelectedLang(e.target.value as any)}
                      className="w-full px-4 py-2 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-slate-200"
                    >
                      <option value="pt">Português (PT-BR)</option>
                      <option value="en">Inglês (EN-US)</option>
                      <option value="es">Espanhol (ES-ES)</option>
                      <option value="all">Gerar nos 3 idiomas</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Biblioteca</label>
                      <button 
                        onClick={seedPromptLibrary}
                        className="text-[9px] font-bold text-amber-600 hover:underline"
                      >
                        Importar Padrões
                      </button>
                    </div>
                    <select 
                      value={selectedPromptId}
                      onChange={(e) => {
                        const id = e.target.value;
                        setSelectedPromptId(id);
                        const prompt = promptLibrary.find(p => p.id === id);
                        if (prompt) {
                          setBrandConfig({ ...brandConfig, systemPrompt: prompt.content });
                        }
                      }}
                      className="w-full px-4 py-2 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-slate-200"
                    >
                      <option value="">Selecione...</option>
                      {promptLibrary.map(p => (
                        <option key={p.id} value={p.id}>{p.title}</option>
                      ))}
                    </select>
                    {selectedPromptId && promptLibrary.find(p => p.id === selectedPromptId)?.description && (
                      <p className="text-[10px] text-slate-500 mt-1 leading-tight italic">
                        {promptLibrary.find(p => p.id === selectedPromptId)?.description}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nome do Arquivo</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={filename} 
                        onChange={(e) => setFilename(e.target.value)}
                        placeholder="nome-do-arquivo"
                        className="w-full px-4 py-2 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-slate-200 pr-12"
                      />
                      <span className="absolute right-4 top-2 text-slate-300 text-sm">.html</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Sparkles size={12} /> Prompt de Instrução do Sistema
                    </label>
                    <button 
                      onClick={savePromptToLibrary}
                      className="text-[10px] font-bold text-[#004a8e] hover:underline flex items-center gap-1"
                    >
                      <Plus size={10} /> Salvar na Biblioteca
                    </button>
                  </div>
                  <textarea 
                    value={brandConfig.systemPrompt}
                    onChange={(e) => setBrandConfig({ ...brandConfig, systemPrompt: e.target.value })}
                    placeholder="Instruções para a IA gerar o HTML..."
                    className="w-full h-32 px-4 py-3 border rounded-2xl text-sm outline-none focus:ring-2 focus:ring-slate-200 font-mono leading-relaxed"
                  />
                  <p className="text-[10px] text-slate-400">Este prompt define como a IA deve construir a estrutura, o design e as funcionalidades do arquivo HTML final.</p>
                </div>

                <textarea 
                  value={markdownText} onChange={(e) => setMarkdownText(e.target.value)}
                  className="w-full h-[300px] p-6 border rounded-[2rem] outline-none focus:ring-2 focus:ring-slate-200 font-mono text-sm shadow-sm"
                />
                <button onClick={generatePage} disabled={!markdownText.trim() || !filename.trim()} className="w-full bg-[#004a8e] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50">
                  <Sparkles size={18} /> Gerar Página Interativa
                </button>
              </div>
              <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-200 overflow-y-auto max-h-[550px]">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Preview do Markdown</h3>
                <div className="prose prose-slate prose-sm max-w-none">
                  <ReactMarkdown>{markdownText}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          )}

          {/* 5. Preview Tab */}
          {view === 'preview' && (
            <motion.div key="preview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-5xl mx-auto">
              {generatedHtml ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
                    <div>
                      <h3 className="text-xl font-black">{filename}.html</h3>
                      <p className="text-slate-400 text-xs uppercase tracking-widest font-bold">Página gerada com sucesso</p>
                    </div>
                    <button 
                      onClick={() => downloadHtml(generatedHtml, filename)}
                      className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all active:scale-95"
                    >
                      <Download size={18} /> Baixar HTML
                    </button>
                  </div>
                  
                  <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden min-h-[600px] relative">
                    <iframe 
                      srcDoc={generatedHtml} 
                      title="Preview" 
                      className="w-full h-[800px] border-none"
                    />
                  </div>
                </div>
              ) : (
                <div className="text-center py-20">
                  <Eye size={48} className="text-slate-200 mx-auto mb-4" />
                  <p className="text-slate-400 font-medium">Nenhuma página gerada ainda. Vá para o Editor.</p>
                </div>
              )}
            </motion.div>
          )}

          {/* 6. Materials Tab */}
          {view === 'materials' && (
            <motion.div key="materials" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-4xl mx-auto">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-3xl font-black mb-2">Materiais Criados</h2>
                  <p className="text-slate-500">Histórico de todas as páginas interativas geradas nesta sessão.</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  {materials.length} Arquivos
                </div>
              </div>

              {materials.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {materials.map((material) => (
                    <motion.div 
                      key={material.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-4 overflow-hidden w-full sm:w-auto">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${brandConfig.primaryBlue}10`, color: brandConfig.primaryBlue }}>
                          <FileText size={24} />
                        </div>
                        <div className="overflow-hidden flex-1">
                          {editingId === material.id ? (
                            <div className="flex items-center gap-2">
                              <input 
                                type="text" 
                                value={editName} 
                                onChange={(e) => setEditName(e.target.value)}
                                className="px-3 py-1 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-slate-200 w-full"
                                autoFocus
                                onKeyDown={(e) => e.key === 'Enter' && updateMaterialName(material.id)}
                              />
                              <button onClick={() => updateMaterialName(material.id)} className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg">
                                <Check size={16} />
                              </button>
                              <button onClick={() => setEditingId(null)} className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg">
                                <X size={16} />
                              </button>
                            </div>
                          ) : (
                            <>
                              <h4 className="font-black text-slate-800 truncate flex items-center gap-2">
                                {material.name}.html
                                <button 
                                  onClick={() => {
                                    setEditingId(material.id);
                                    setEditName(material.name);
                                  }}
                                  className="p-1 text-slate-300 hover:text-slate-600 transition-colors"
                                >
                                  <Pencil size={12} />
                                </button>
                              </h4>
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                Gerado em {new Date(material.timestamp).toLocaleString()}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 shrink-0">
                        <button 
                          onClick={() => previewMaterial(material)}
                          className="p-3 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
                          title="Visualizar"
                        >
                          <ExternalLink size={20} />
                        </button>
                        <button 
                          onClick={() => downloadHtml(material.html, material.name)}
                          className="p-3 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
                          title="Baixar"
                        >
                          <Download size={20} />
                        </button>
                        <button 
                          onClick={() => deleteMaterial(material.id)}
                          className="p-3 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                          title="Excluir"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-[3rem] p-20 text-center border-2 border-dashed border-slate-200">
                  <History size={64} className="text-slate-200 mx-auto mb-6" />
                  <h3 className="text-xl font-black text-slate-800 mb-2">Nenhum material ainda</h3>
                  <p className="text-slate-500 max-w-xs mx-auto">
                    As páginas que você gerar aparecerão aqui para fácil acesso e download.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {deleteConfirmId && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setDeleteConfirmId(null)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl border border-slate-100"
              >
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-6">
                  <AlertTriangle size={32} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">Excluir Material?</h3>
                <p className="text-slate-500 mb-8">
                  Esta ação não pode ser desfeita. O arquivo será removido permanentemente do seu histórico e do banco de dados.
                </p>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setDeleteConfirmId(null)}
                    className="flex-1 px-6 py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-all"
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={confirmDelete}
                    className="flex-1 px-6 py-4 rounded-2xl font-bold bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-200 transition-all"
                  >
                    Confirmar Exclusão
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-12 text-center text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em]">
        © {new Date().getFullYear()} Conexão Sistemas de Prótese • Hub Digital
      </footer>
    </div>
  );
}
