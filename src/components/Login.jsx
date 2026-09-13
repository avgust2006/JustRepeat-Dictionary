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

const colors = {
  ink: '#123B4D',
  muted: '#426273',
  cream: '#F8F3EA',
  paper: 'rgba(255, 252, 246, 0.8)',
  sand: '#E9D5B0',
  gold: '#C78F45',
  teal: '#116A7B',
};

const featureItems = [
  {
    icon: <BoltIcon />,
    title: 'Быстрый темп',
    description: 'За занятие вы проходите много слов, не задерживаясь на каждом.',
  },
  {
    icon: <RepeatIcon />,
    title: 'Повторение работает',
    description: 'Регулярная практика закрепляет слова в памяти естественно.',
  },
  {
    icon: <AutoAwesomeIcon />,
    title: 'Видимый результат',
    description: 'Через месяц занятий 5 раз в неделю слова вспоминаются мгновенно.',
  },
];

const steps = [
  {
    number: '01',
    icon: <PlayArrowRoundedIcon />,
    title: 'Вспомни',
    description: 'Нажми START. Увидишь английское слово, произнеси его вслух. Вспомни перевод.',
  },
  {
    number: '02',
    icon: <TranslateIcon />,
    title: 'Проверь',
    description: 'Нажми TRANSLATE и проверь себя. Повтори английское слово вслух.',
  },
  {
    number: '03',
    icon: <CheckCircleIcon />,
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
        background: `
          radial-gradient(circle at 8% 8%, rgba(199, 143, 69, 0.2), transparent 28%),
          radial-gradient(circle at 92% 88%, rgba(17, 106, 123, 0.11), transparent 32%),
          linear-gradient(145deg, #F7F0E5 0%, #E9DDC9 100%)
        `,
        color: colors.ink,
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
            border: '1px solid rgba(255, 255, 255, 0.72)',
            borderRadius: { xs: 4, md: 6 },
            backgroundColor: colors.paper,
            boxShadow: '0 26px 70px rgba(18, 59, 77, 0.14)',
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
                  borderRadius: 2.5,
                  background: `linear-gradient(135deg, ${colors.teal}, #1F5B71)`,
                  color: colors.cream,
                  fontWeight: 800,
                  letterSpacing: '-0.08em',
                  boxShadow: '0 8px 18px rgba(17, 106, 123, 0.2)',
                }}
              >
                JR
              </Box>
              <Typography sx={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.03em' }}>
                Just Repeat
              </Typography>
            </Stack>
            <Chip
              icon={<AutoAwesomeIcon sx={{ fontSize: '1rem !important' }} />}
              label="Метод для тех, кто хочет получить результат"
              sx={{
                color: colors.teal,
                backgroundColor: 'rgba(17, 106, 123, 0.08)',
                fontWeight: 700,
                '& .MuiChip-icon': { color: colors.gold },
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
                  color: colors.gold,
                  fontSize: '0.76rem',
                  fontWeight: 800,
                  letterSpacing: '0.16em',
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
                  color: colors.ink,
                  fontSize: { xs: '2.55rem', sm: '3.6rem', md: '4.25rem' },
                  fontWeight: 800,
                  lineHeight: 0.98,
                  letterSpacing: '-0.065em',
                }}
              >
                Повторяйте слова.
                <Box component="span" sx={{ display: 'block', color: colors.teal }}>
                  Не зубрите их.
                </Box>
              </Typography>
              <Typography
                sx={{
                  maxWidth: 580,
                  mb: 3.5,
                  color: colors.muted,
                  fontSize: { xs: '1.05rem', md: '1.16rem' },
                  lineHeight: 1.7,
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
                sx={{
                  minWidth: { xs: '100%', sm: 220 },
                  height: 58,
                  px: 3,
                  borderRadius: 2.5,
                  background: `linear-gradient(135deg, ${colors.teal} 0%, #1F5B71 100%)`,
                  color: colors.cream,
                  fontSize: '1rem',
                  fontWeight: 800,
                  textTransform: 'none',
                  boxShadow: '0 14px 24px rgba(17, 106, 123, 0.22)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #0E5D6E 0%, #174B60 100%)',
                    boxShadow: '0 16px 28px rgba(17, 106, 123, 0.28)',
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
                borderRadius: 4,
                background: `linear-gradient(145deg, ${colors.ink} 0%, #1F5B71 100%)`,
                color: colors.cream,
                boxShadow: '0 20px 40px rgba(18, 59, 77, 0.2)',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  width: 180,
                  height: 180,
                  right: -70,
                  bottom: -90,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(199, 143, 69, 0.35)',
                },
              }}
            >
              <Typography
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  mb: 3,
                  color: '#F2D7AA',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  letterSpacing: '0.14em',
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
                        borderRadius: 2,
                        backgroundColor: 'rgba(242, 215, 170, 0.16)',
                        color: '#F2D7AA',
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Box>
                      <Typography sx={{ mb: 0.3, fontWeight: 800 }}>{item.title}</Typography>
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
                color: colors.ink,
                fontSize: { xs: '1.7rem', md: '2.15rem' },
                fontWeight: 800,
                letterSpacing: '-0.045em',
              }}
            >
              Простая схема эффективного занятия
            </Typography>
            <Typography sx={{ mb: 3.5, color: colors.muted, lineHeight: 1.6 }}>
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
                    border: '1px solid rgba(18, 59, 77, 0.1)',
                    borderRadius: 3,
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  }}
                >
                  <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                    <Box sx={{ color: colors.teal }}>{step.icon}</Box>
                    <Typography sx={{ color: colors.gold, fontSize: '0.8rem', fontWeight: 800 }}>
                      {step.number}
                    </Typography>
                  </Stack>
                  <Typography sx={{ mb: 0.7, color: colors.ink, fontWeight: 800 }}>{step.title}</Typography>
                  <Typography sx={{ color: colors.muted, fontSize: '0.93rem', lineHeight: 1.55 }}>
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
              borderRadius: 3,
              backgroundColor: 'rgba(199, 143, 69, 0.12)',
              border: '1px solid rgba(199, 143, 69, 0.2)',
            }}
          >
            <Box>
              <Typography sx={{ mb: 0.8, color: colors.ink, fontWeight: 800 }}>
                Ритм важнее объёма
              </Typography>
              <Typography sx={{ color: colors.muted, lineHeight: 1.6 }}>
                За занятие проходите 2–4 темы. Когда освоите 70–80% слов, замените одну тему на новую.
              </Typography>
            </Box>
            <Box sx={{ borderLeft: { md: '1px solid rgba(18, 59, 77, 0.16)' }, pl: { md: 3 } }}>
              <Typography sx={{ mb: 0.8, color: colors.teal, fontSize: '1.35rem', fontWeight: 800 }}>
                5 раз в неделю
              </Typography>
              <Typography sx={{ color: colors.muted, lineHeight: 1.6 }}>
                Через месяц вы почувствуете, насколько быстрее вспоминаются слова.
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mt: { xs: 5, md: 6 }, mb: 2.5, borderColor: 'rgba(18, 59, 77, 0.12)' }} />
          <Box direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between" spacing={1.5}>
            <Typography variant="body2" sx={{ color: colors.muted, textAlign: 'center' }}>
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
