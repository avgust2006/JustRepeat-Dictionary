import React from 'react';
import { useNavigate } from 'react-router-dom';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import BoltIcon from '@mui/icons-material/Bolt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import RepeatIcon from '@mui/icons-material/Repeat';
import TranslateIcon from '@mui/icons-material/Translate';
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import tokens from '../theme/tokens.js';

const featureItems = [
  {
    icon: <BoltIcon aria-hidden="true" />,
    title: 'Быстрый темп',
    description: 'За занятие вы проходите много слов, не задерживаясь на каждом.',
  },
  {
    icon: <RepeatIcon aria-hidden="true" />,
    title: 'Повторение работает',
    description: 'Регулярная практика закрепляет слова в памяти естественно.',
  },
  {
    icon: <AutoAwesomeIcon aria-hidden="true" />,
    title: 'Видимый результат',
    description: 'Через месяц занятий 5 раз в неделю слова вспоминаются мгновенно.',
  },
];

const steps = [
  {
    number: '01',
    icon: <PlayArrowRoundedIcon aria-hidden="true" />,
    title: 'Вспомни',
    description: 'Нажми START. Увидишь английское слово, произнеси его вслух. Вспомни перевод.',
  },
  {
    number: '02',
    icon: <TranslateIcon aria-hidden="true" />,
    title: 'Проверь',
    description: 'Нажми TRANSLATE и проверь себя. Повтори английское слово вслух.',
  },
  {
    number: '03',
    icon: <CheckCircleIcon aria-hidden="true" />,
    title: 'Повтори',
    description: 'Нажми NEXT и переходи дальше. Не задерживайся на одном слове.',
  },
];

const Login = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: tokens.colors.background.loginRadial,
        color: tokens.colors.primary.main,
        py: { xs: 2, md: 5 },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            maxWidth: 1120,
            mx: 'auto',
            px: { xs: 2, sm: 4, md: 6 },
            py: { xs: 3, md: 5 },
            border: `1px solid ${tokens.colors.border.light}`,
            borderRadius: { xs: tokens.radii.lg, md: tokens.radii.cardXl },
            backgroundColor: tokens.colors.background.paperLight,
            boxShadow: tokens.shadows.hero,
            backdropFilter: 'blur(12px)',
          }}
        >
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            alignItems={{ xs: 'flex-start', md: 'center' }}
            justifyContent="space-between"
            spacing={2}
            sx={{ mb: { xs: 5, md: 7 } }}
          >
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Box
                sx={{
                  width: 46,
                  height: 46,
                  display: 'grid',
                  placeItems: 'center',
                  borderRadius: tokens.radii.md,
                  background: tokens.colors.background.tealGradient,
                  color: tokens.colors.text.inverse,
                  fontWeight: tokens.typography.weights.extraBold,
                  letterSpacing: '-0.08em',
                  boxShadow: tokens.shadows.sm,
                }}
              >
                JR
              </Box>
              <Typography sx={{ fontWeight: tokens.typography.weights.extraBold, fontSize: '1.2rem', letterSpacing: '-0.03em' }}>
                Just Repeat
              </Typography>
            </Stack>
            <Chip
              icon={<AutoAwesomeIcon sx={{ fontSize: '1rem !important' }} />}
              label="Метод для тех, кто хочет получить результат"
              sx={{
                color: tokens.colors.teal.main,
                backgroundColor: tokens.colors.teal.subtle,
                fontWeight: tokens.typography.weights.bold,
                '& .MuiChip-icon': { color: tokens.colors.accent.gold },
              }}
            />
          </Stack>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1.05fr 0.95fr' },
              gap: { xs: 4, md: 8 },
              alignItems: 'center',
              mb: { xs: 6, md: 8 },
            }}
          >
            <Box>
              <Typography
                component="p"
                sx={{
                  mb: 2,
                  color: tokens.colors.accent.gold,
                  fontSize: '0.76rem',
                  fontWeight: tokens.typography.weights.extraBold,
                  letterSpacing: tokens.typography.letterSpacings.wider,
                  textTransform: 'uppercase',
                }}
              >
                Тренажёр словарного запаса
              </Typography>
              <Typography
                component="h1"
                sx={{
                  maxWidth: 650,
                  mb: 2.5,
                  color: tokens.colors.primary.main,
                  fontSize: { xs: '2.55rem', sm: '3.6rem', md: '4.25rem' },
                  fontWeight: tokens.typography.weights.extraBold,
                  lineHeight: tokens.typography.lineHeights.none,
                  letterSpacing: tokens.typography.letterSpacings.tighter,
                }}
              >
                Повторяйте слова.
                <Box component="span" sx={{ display: 'block', color: tokens.colors.teal.main }}>
                  Не зубрите их.
                </Box>
              </Typography>
              <Typography
                sx={{
                  maxWidth: 580,
                  mb: 3.5,
                  color: tokens.colors.text.secondary,
                  fontSize: { xs: '1.05rem', md: '1.16rem' },
                  lineHeight: tokens.typography.lineHeights.relaxed,
                }}
              >
                Уникальный метод запоминания Just Repeat — это сочетание быстрого темпа и обязательного повторения.
                Регулярные занятия помогут уже через месяц мгновенно вспоминать пройденные
                слова — без долгих пауз и мучительных поисков в памяти.
              </Typography>
              <Button
                type="button"
                onClick={() => navigate('/home')}
                variant="contained"
                endIcon={<PlayArrowRoundedIcon />}
                aria-label="Начать занятие и перейти к каталогу словарей"
                sx={{
                  minWidth: { xs: '100%', sm: 220 },
                  height: tokens.interactive.buttonHeightLg,
                  px: 3,
                  borderRadius: tokens.radii.md,
                  background: tokens.colors.background.tealGradient,
                  color: tokens.colors.text.inverse,
                  fontSize: '1rem',
                  fontWeight: tokens.typography.weights.extraBold,
                  textTransform: 'none',
                  boxShadow: tokens.shadows.tealButton,
                  '&:hover': {
                    background: tokens.colors.background.tealGradientHover,
                    boxShadow: tokens.shadows.buttonHover,
                  },
                  '&:focus-visible': {
                    outline: tokens.interactive.focusVisibleOutline,
                    outlineOffset: tokens.interactive.focusVisibleOffset,
                  },
                }}
              >
                Начать занятие
              </Button>
            </Box>

            <Box
              sx={{
                position: 'relative',
                overflow: 'hidden',
                p: { xs: 2.5, sm: 3.5 },
                borderRadius: tokens.radii.card,
                background: tokens.colors.background.darkCardGradient,
                color: tokens.colors.text.inverse,
                boxShadow: tokens.shadows.darkCard,
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  width: 180,
                  height: 180,
                  right: -70,
                  bottom: -90,
                  borderRadius: tokens.radii.circle,
                  backgroundColor: 'rgba(199, 143, 69, 0.35)',
                },
              }}
            >
              <Typography
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  mb: 3,
                  color: tokens.colors.accent.light,
                  fontSize: '0.74rem',
                  fontWeight: tokens.typography.weights.extraBold,
                  letterSpacing: tokens.typography.letterSpacings.wider,
                  textTransform: 'uppercase',
                }}
              >
                Почему это работает
              </Typography>
              <Stack spacing={2.5} sx={{ position: 'relative', zIndex: 1 }}>
                {featureItems.map((item) => (
                  <Stack key={item.title} direction="row" spacing={1.75} alignItems="flex-start">
                    <Box
                      sx={{
                        flexShrink: 0,
                        width: 38,
                        height: 38,
                        display: 'grid',
                        placeItems: 'center',
                        borderRadius: tokens.radii.sm,
                        backgroundColor: 'rgba(242, 215, 170, 0.16)',
                        color: tokens.colors.accent.light,
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Box>
                      <Typography sx={{ mb: 0.3, fontWeight: tokens.typography.weights.extraBold }}>{item.title}</Typography>
                      <Typography sx={{ color: 'rgba(248, 243, 234, 0.76)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                        {item.description}
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Box>

          <Box sx={{ mb: { xs: 5, md: 6 } }}>
            <Typography
              component="h2"
              sx={{
                mb: 1,
                color: tokens.colors.primary.main,
                fontSize: { xs: '1.7rem', md: '2.15rem' },
                fontWeight: tokens.typography.weights.extraBold,
                letterSpacing: '-0.045em',
              }}
            >
              Простая схема эффективного занятия
            </Typography>
            <Typography sx={{ mb: 3.5, color: tokens.colors.text.secondary, lineHeight: tokens.typography.lineHeights.normal }}>
              Не пытайтесь запоминать — дайте повторениям сделать свою работу.
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                gap: 2,
              }}
            >
              {steps.map((step) => (
                <Box
                  key={step.number}
                  sx={{
                    p: 2.5,
                    border: `1px solid ${tokens.colors.border.card}`,
                    borderRadius: tokens.radii.md,
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  }}
                >
                  <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                    <Box sx={{ color: tokens.colors.teal.main }}>{step.icon}</Box>
                    <Typography sx={{ color: tokens.colors.accent.gold, fontSize: '0.8rem', fontWeight: tokens.typography.weights.extraBold }}>
                      {step.number}
                    </Typography>
                  </Stack>
                  <Typography sx={{ mb: 0.7, color: tokens.colors.primary.main, fontWeight: tokens.typography.weights.extraBold }}>{step.title}</Typography>
                  <Typography sx={{ color: tokens.colors.text.secondary, fontSize: '0.93rem', lineHeight: 1.55 }}>
                    {step.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1.2fr 0.8fr' },
              gap: 2,
              p: { xs: 2.5, md: 3 },
              borderRadius: tokens.radii.md,
              backgroundColor: 'rgba(199, 143, 69, 0.12)',
              border: `1px solid ${tokens.colors.border.accent}`,
            }}
          >
            <Box>
              <Typography sx={{ mb: 0.8, color: tokens.colors.primary.main, fontWeight: tokens.typography.weights.extraBold }}>
                Ритм важнее объёма
              </Typography>
              <Typography sx={{ color: tokens.colors.text.secondary, lineHeight: tokens.typography.lineHeights.normal }}>
                За занятие проходите 2–4 темы. Когда освоите 70–80% слов, замените одну тему на новую.
              </Typography>
            </Box>
            <Box sx={{ borderLeft: { md: `1px solid ${tokens.colors.border.divider}` }, pl: { md: 3 } }}>
              <Typography sx={{ mb: 0.8, color: tokens.colors.teal.main, fontSize: '1.35rem', fontWeight: tokens.typography.weights.extraBold }}>
                5 раз в неделю
              </Typography>
              <Typography sx={{ color: tokens.colors.text.secondary, lineHeight: tokens.typography.lineHeights.normal }}>
                Через месяц вы почувствуете, насколько быстрее вспоминаются слова.
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mt: { xs: 5, md: 6 }, mb: 2.5, borderColor: tokens.colors.border.divider }} />
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="body2" sx={{ color: tokens.colors.text.muted, textAlign: 'center' }}>
              © {new Date().getFullYear()} Just Repeat. Все права защищены. По вопросам технической поддержки и оплаты:{' '}
              <Link color="inherit" href="mailto:support.justrepeat@gmail.com" sx={{ fontWeight: 'bold' }}>
                support.justrepeat@gmail.com
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
