/**
 * =====================================================================
 *  RotaUni Motorista — TEMA VISUAL
 *  Arquivo: src/ui/theme/theme.ts
 * =====================================================================
 *
 *  🧠 PENSE ASSIM:
 *  Este arquivo é a "caixa de tintas" do app.
 *  As telas NÃO escolhem cor por conta própria: elas pegam daqui.
 *
 *     theme.ts (caixa de tintas)
 *        │
 *        ├──► login.styles.ts      usa colors.primary
 *        ├──► home.styles.ts       usa spacing.md
 *        └──► ride-card.styles.ts  usa radius.lg
 *
 *  Vantagem: se um dia o laranja mudar, você troca em UM lugar
 *  e o app inteiro muda junto.
 *
 *  Identidade: azul e branco (universidade) + laranja (destaque).
 * =====================================================================
 */

import '@/ui/theme/global.css';

import { Platform, StyleSheet, type TextStyle, type ViewStyle } from 'react-native';

/* ---------------------------------------------------------------------
 * 1) CORES
 *    Cada cor tem um "papel". Use o papel, não o código hex.
 *    Ex.: colors.primary (certo)  vs  "#1E4FD8" solto na tela (evitar)
 * ------------------------------------------------------------------- */
export const colors = {
  // Azul da universidade — cabeçalhos, títulos, ícones ativos
  primary: '#1E4FD8',
  primaryDark: '#143A9E', // quando o botão azul está pressionado
  primarySoft: '#E8EFFF', // fundo clarinho de destaque (chips, badges)
  primaryOnDark: '#C9D6FF', // texto secundário em cima do azul

  // Laranja — SÓ para a ação principal da tela (ex.: "Oferecer carona")
  accent: '#FF7A1A',
  accentDark: '#E0600A',
  accentSoft: '#FFF1E6',

  // Fundos
  background: '#F5F7FB', // fundo geral (um branco levemente azulado)
  surface: '#FFFFFF', // cartões, campos, modais

  // Textos
  text: '#16213E', // texto principal (quase preto, puxado pro azul)
  textMuted: '#5B6785', // texto secundário (horário, legenda)
  textOnPrimary: '#FFFFFF', // texto em cima do azul ou do laranja

  // Linhas e bordas
  border: '#E1E6F0',

  // Estados (feedback ao usuário)
  success: '#1F9D55', // carona confirmada
  successSoft: '#E6F6EC',
  warning: '#F2A900', // pedido pendente
  warningSoft: '#FFF7DB',
  danger: '#D64545', // cancelada / erro
  dangerSoft: '#FDECEC',

  // Estrela da avaliação (mais escura que o warning para dar leitura no branco)
  star: '#B76E00',

  // Fundo escurecido atrás de modais
  backdrop: 'rgba(22, 33, 62, 0.5)',
} as const;

/* ---------------------------------------------------------------------
 * 2) ESPAÇAMENTOS
 *    Uma "régua" de 4 em 4. Nada de margin: 13 ou padding: 7.
 *    Isso deixa tudo alinhado e com cara de app profissional.
 * ------------------------------------------------------------------- */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16, // o mais usado: padding de cartão, distância entre blocos
  lg: 24, // margem das laterais da tela
  xl: 32,
} as const;

/* ---------------------------------------------------------------------
 * 3) ARREDONDAMENTO DOS CANTOS
 * ------------------------------------------------------------------- */
export const radius = {
  sm: 8, // chips e badges
  md: 12, // campos de texto e botões
  lg: 18, // cartões de carona
  pill: 999, // formato "cápsula" (totalmente redondo)
} as const;

/* ---------------------------------------------------------------------
 * 4) TIPOGRAFIA
 *    Hierarquia = o olho sabe o que ler primeiro.
 *    title > subtitle > body > caption
 * ------------------------------------------------------------------- */
export const typography = {
  title: { fontSize: 24, lineHeight: 32, fontWeight: '700', color: colors.text },
  subtitle: { fontSize: 18, lineHeight: 24, fontWeight: '600', color: colors.text },
  body: { fontSize: 15, lineHeight: 22, fontWeight: '400', color: colors.text },
  caption: { fontSize: 13, lineHeight: 18, fontWeight: '400', color: colors.textMuted },
  button: { fontSize: 16, lineHeight: 22, fontWeight: '700', color: colors.textOnPrimary },
} satisfies Record<string, TextStyle>;

/* ---------------------------------------------------------------------
 * 5) SOMBRA
 *    iOS usa shadow*, Android usa elevation. Colocamos os dois.
 *    Sombra leve = o cartão "flutua" um pouco acima do fundo.
 * ------------------------------------------------------------------- */
export const shadow: ViewStyle = {
  shadowColor: colors.text,
  shadowOpacity: 0.08,
  shadowRadius: 12,
  shadowOffset: { width: 0, height: 4 },
  elevation: 3,
};

/* ---------------------------------------------------------------------
 * 6) PEÇAS PRONTAS (estilos reutilizáveis)
 *    São as "peças de LEGO" montadas com as tintas acima.
 *    Uso num .styles.ts:
 *
 *      import { ui } from '@/ui/theme/theme';
 *      card: { ...ui.card, gap: spacing.md },
 * ------------------------------------------------------------------- */
export const ui = StyleSheet.create({
  // Tela inteira
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
  },

  // Cabeçalho azul do topo (saudação do motorista, resumo do dia)
  header: {
    backgroundColor: colors.primary,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderBottomLeftRadius: radius.lg,
    borderBottomRightRadius: radius.lg,
  },
  headerTitle: { ...typography.title, color: colors.textOnPrimary },
  headerSubtitle: { ...typography.body, color: colors.primaryOnDark },

  // Cartão (ex.: cartão de carona na lista)
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadow,
  },

  // Linha horizontal com itens separados (ex.: origem → destino)
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },

  // Botão principal (laranja) — UM por tela
  buttonPrimary: {
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    ...shadow,
  },
  // Botão secundário (contorno azul) — ações de apoio
  buttonSecondary: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  buttonText: typography.button,
  buttonSecondaryText: { ...typography.button, color: colors.primary },

  // Campo de texto (login, formulário de nova carona)
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    fontSize: 15,
    color: colors.text,
  },
  inputLabel: {
    ...typography.caption,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },

  // Etiquetas de status (badge)
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
  },
  badgeConfirmed: { backgroundColor: colors.successSoft },
  badgePending: { backgroundColor: colors.warningSoft },
  badgeCanceled: { backgroundColor: colors.dangerSoft },
  badgeText: { fontSize: 12, lineHeight: 16, fontWeight: '700' },

  // Linha divisória fininha
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
});

/* ---------------------------------------------------------------------
 * 7) TUDO JUNTO
 *    Para quem prefere importar um objeto só: theme.colors.primary
 * ------------------------------------------------------------------- */
export const theme = { colors, spacing, radius, typography, shadow, ui };
export default theme;

/* ---------------------------------------------------------------------
 * 8) COMPATIBILIDADE (mesmos nomes do app do passageiro)
 *    ThemedText/ThemedView e useTheme usam estes nomes.
 *    Agora eles apontam para as cores novas acima.
 *    O design só tem modo claro.
 * ------------------------------------------------------------------- */
export const Colors = {
  light: {
    text: colors.text,
    background: colors.background,
    backgroundElement: colors.surface,
    backgroundSelected: colors.primarySoft,
    textSecondary: colors.textMuted,
  },
} as const;

export type ThemeColor = keyof typeof Colors.light;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: spacing.xs,
  two: spacing.sm,
  three: spacing.md,
  four: spacing.lg,
  five: spacing.xl,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;

// Cores fixas da marca.
export const Palette = {
  primary: colors.primary,
  accent: colors.accent,
  success: colors.success,
  danger: colors.danger,
  star: colors.star,
  white: colors.surface,
} as const;

/* =====================================================================
 *  ✍️ EXERCÍCIO (faça sozinho, depois me mostre)
 *  1. Abra src/ui/components/ride-card/ride-card.styles.ts.
 *  2. Veja que o "card" começa com ...ui.card.
 *  3. ANTES de mudar, preveja: se trocar radius.lg para 8, o que muda?
 *  4. Salve e confira no Expo Go. Acertou?
 *  5. Desafio: mude colors.accent para "#FF5A00" e veja quais
 *     botões mudam sozinhos. Por que só eles mudaram?
 * ===================================================================== */
