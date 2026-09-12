/**
 * Design tokens for Just Repeat Dictionary App
 * Dark teal/navy + cream background + sand-gold accent
 */

export const colors = {
  primary: {
    main: '#123b4d',
    dark: '#0a2736',
    light: '#1f5b71',
    contrastText: '#f9f4ef',
  },
  teal: {
    main: '#116a7b',
    dark: '#0e5d6e',
    light: '#2d5b70',
    hover: '#174b60',
    subtle: 'rgba(17, 106, 123, 0.08)',
    shadow: 'rgba(17, 106, 123, 0.22)',
  },
  accent: {
    main: '#d7b585',
    light: '#f2d7aa',
    lighter: '#f9f1e1',
    hover: '#f6ddba',
    hoverLight: '#fff9f2',
    gold: '#c78f45',
    sand: '#e9d5b0',
    sandDark: '#825d27',
    sandLight: '#f3e4ca',
    sandWarm: '#fefaf3',
    sandMuted: '#f1e5d1',
    contrastText: '#123b4d',
    highlight: '#ece5c7',
  },
  background: {
    default: '#f5efe7',
    paper: '#fffdf9',
    paperLight: 'rgba(255, 252, 246, 0.8)',
    paperGlass: 'rgba(255, 255, 255, 0.74)',
    glassCard: 'linear-gradient(180deg, rgba(255, 255, 255, 0.78) 0%, rgba(240, 236, 226, 0.9) 100%)',
    cardItem: 'linear-gradient(135deg, #fefaf3 0%, #f1e5d1 100%)',
    headerGradient: 'linear-gradient(90deg, #123b4d 0%, #1f5b71 100%)',
    goldGradient: 'linear-gradient(135deg, #f2d7aa 0%, #f9f1e1 100%)',
    goldGradientHover: 'linear-gradient(135deg, #f6ddba 0%, #fff9f2 100%)',
    paperGradient: 'linear-gradient(135deg, #d7b585 0%, #f3e4ca 100%)',
    paperGradientHover: 'linear-gradient(135deg, #e9d5b0 0%, #f9f0dd 100%)',
    tealGradient: 'linear-gradient(135deg, #116a7b 0%, #1f5b71 100%)',
    tealGradientHover: 'linear-gradient(135deg, #0e5d6e 0%, #174b60 100%)',
    bodyGradient: 'radial-gradient(circle at top, rgba(215, 181, 133, 0.26), transparent 30%), linear-gradient(180deg, #f7f3ed 0%, #f0eadf 100%)',
    loginRadial: `
      radial-gradient(circle at 8% 8%, rgba(199, 143, 69, 0.2), transparent 28%),
      radial-gradient(circle at 92% 88%, rgba(17, 106, 123, 0.11), transparent 32%),
      linear-gradient(145deg, #f7f0e5 0%, #e9ddc9 100%)
    `,
    darkCardGradient: 'linear-gradient(145deg, #123b4d 0%, #1f5b71 100%)',
  },
  text: {
    primary: '#123b4d',
    secondary: '#426273',
    muted: '#647d8c',
    inverse: '#f9f4ef',
    goldText: '#c78f45',
  },
  border: {
    subtle: 'rgba(18, 59, 77, 0.08)',
    card: 'rgba(18, 59, 77, 0.1)',
    divider: 'rgba(18, 59, 77, 0.12)',
    light: 'rgba(255, 255, 255, 0.72)',
    accent: 'rgba(199, 143, 69, 0.2)',
    focus: '#116a7b',
  },
  status: {
    success: '#2e7d32',
    successBg: 'rgba(46, 125, 50, 0.12)',
    error: '#d32f2f',
    errorBg: 'rgba(211, 47, 47, 0.1)',
    progressBg: 'rgba(18, 59, 77, 0.1)',
  },
};

export const radii = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 14,
  xl: 16,
  card: 18,
  cardLg: 20,
  cardXl: 24,
  pill: 999,
  circle: '50%',
};

export const shadows = {
  sm: '0 4px 8px rgba(18, 59, 77, 0.06)',
  md: '0 10px 18px rgba(18, 59, 77, 0.08)',
  lg: '0 18px 28px rgba(18, 59, 77, 0.08)',
  xl: '0 18px 30px rgba(18, 59, 77, 0.12)',
  card: '0 20px 32px rgba(18, 59, 77, 0.08)',
  hero: '0 26px 70px rgba(18, 59, 77, 0.14)',
  button: '0 12px 20px rgba(18, 59, 77, 0.12)',
  buttonHover: '0 16px 28px rgba(17, 106, 123, 0.28)',
  tealButton: '0 14px 24px rgba(17, 106, 123, 0.22)',
  darkCard: '0 20px 40px rgba(18, 59, 77, 0.2)',
  focus: '0 0 0 3px rgba(17, 106, 123, 0.4)',
};

export const spacing = (multiplier = 1) => `${multiplier * 8}px`;

export const typography = {
  fontFamily: '"Inter", "Segoe UI", sans-serif',
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extraBold: 800,
    black: 900,
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '2rem',
    '4xl': '2.5rem',
    '5xl': '3.5rem',
  },
  lineHeights: {
    none: 0.98,
    tight: 1.15,
    snug: 1.35,
    normal: 1.5,
    relaxed: 1.7,
  },
  letterSpacings: {
    tight: '-0.04em',
    tighter: '-0.065em',
    normal: 'normal',
    wide: '0.04em',
    wider: '0.14em',
    widest: '0.18em',
  },
};

export const interactive = {
  minTouchTarget: 44,
  buttonHeight: 48,
  buttonHeightLg: 58,
  iconButtonSm: 30,
  iconButtonMd: 36,
  iconButtonLg: 44,
  focusVisibleOutline: '3px solid #116a7b',
  focusVisibleOffset: '2px',
};

export const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
};

const tokens = {
  colors,
  radii,
  shadows,
  spacing,
  typography,
  interactive,
  breakpoints,
};

export default tokens;
