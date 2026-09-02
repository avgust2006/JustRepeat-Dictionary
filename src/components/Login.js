import React from 'react';
import { useNavigate } from 'react-router-dom';
import TelegramIcon from '@mui/icons-material/Telegram';
import { Box, Button, Container, Link, Typography } from '@mui/material';

const Login = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #f4efe7 0%, #d8cdb6 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 3, md: 5 },
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            maxWidth: 920,
            mx: 'auto',
            background: 'rgba(255, 255, 255, 0.28)',
            border: '1px solid rgba(17, 106, 123, 0.14)',
            borderRadius: 5,
            boxShadow: '0 24px 60px rgba(17, 106, 123, 0.12)',
            backdropFilter: 'blur(2px)',
            p: { xs: 3, md: 4 },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #116A7B 0%, #0F8596 100%)',
                color: '#F8F4ED',
                fontSize: '2rem',
                fontWeight: 700,
                letterSpacing: '-0.08em',
                boxShadow: '0 12px 24px rgba(17, 106, 123, 0.18)',
              }}
            >
              JR
            </Box>
          </Box>

          <Typography
            variant="h2"
            align="center"
            sx={{
              color: '#116A7B',
              fontWeight: 500,
              letterSpacing: '-0.06em',
              fontSize: { xs: '2.5rem', md: '4rem' },
              mb: 4,
            }}
          >
            Just Repeat
          </Typography>

          <Box
            sx={{
              background: 'rgba(17, 106, 123, 0.06)',
              border: '1px solid rgba(17, 106, 123, 0.08)',
              borderRadius: 3,
              p: { xs: 2.5, md: 3 },
              mb: 4,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: '#116A7B',
                fontWeight: 700,
                mb: 2,
                letterSpacing: '-0.03em',
              }}
            >
              САЙТ-ТРЕНАЖЕР ДЛЯ БЫСТРОГО ЗАПОМИНАНИЯ СЛОВ
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: '#116A7B',
                fontWeight: 700,
                mb: 1,
                letterSpacing: '-0.02em',
              }}
            >
              Dictionary
            </Typography>

            <Typography
              sx={{
                color: '#1B4F5B',
                fontSize: '1.03rem',
                lineHeight: 1.8,
                textIndent: '2.2rem',
                mb: 2,
              }}
            >
              Этот метод запоминания слов уникален тем, что за одно занятие вы проходите сразу большое
              количество слов в быстром темпе. Благодаря повторению слова закрепляются в памяти автоматически,
              без длительного и утомительного заучивания. Словарный запас начинает расти очень быстро.
            </Typography>

            <Typography
              sx={{
                color: '#1B4F5B',
                fontSize: '1.03rem',
                lineHeight: 1.8,
                textIndent: '2.2rem',
                mb: 2,
              }}
            >
              Нажмите кнопку START, и перед вами появится слово. Если слово на русском языке и его перевод вам знаком,
              то произнесите перевод слова вслух и только после этого нажмите кнопку TRANSLATE.
              Если вы не можете вспомнить перевод, то нажмите кнопку TRANSLATE и повторите появившееся слово вслух.
              При переводе с английского на русский, обязательно повторяйте слово на английском языке вслух.
            </Typography>

            <Typography
              sx={{
                color: '#1B4F5B',
                fontSize: '1.03rem',
                lineHeight: 1.8,
                textIndent: '2.2rem',
                mb: 2,
              }}
            >
              Не задерживайтесь долго на одном слове. Для перехода к следующему слову нажмите кнопку NEXT. За одно
              занятие проходите 2–4 темы. Когда вы выучите 70–80% слов в одной теме, можно заменить её на новую и
              продолжать работать с 2–4 темами на следующем занятии. Регулярность занятий важнее объёма.
              Занимайтесь 5 раз в неделю — и уже через месяц ваш словарный запас заметно вырастет.
            </Typography>
          </Box>

          <Button
            type="button"
            onClick={() => navigate('/home')}
            fullWidth
            variant="contained"
            sx={{
              height: 60,
              borderRadius: 2.5,
              background: 'linear-gradient(135deg, #116A7B 0%, #0E7D90 100%)',
              color: '#F8F4ED',
              fontSize: '1.1rem',
              fontWeight: 700,
              letterSpacing: '0.02em',
              textTransform: 'none',
              boxShadow: '0 16px 26px rgba(17, 106, 123, 0.18)',
              '&:hover': {
                background: 'linear-gradient(135deg, #0F5D6E 0%, #0A7385 100%)',
              },
            }}
          >
            Начать
          </Button>

          <Box
            sx={{
              mt: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              flexWrap: 'wrap',
              color: '#116A7B',
            }}
          >
            <Typography variant="body2" sx={{ color: '#116A7B' }}>
              Copyright © 2024 Valerii Demidov. All rights reserved.
            </Typography>
            <Link
              href="https://t.me/avgust_2006"
              target="_blank"
              rel="noreferrer"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 28,
                height: 28,
                borderRadius: '50%',
                backgroundColor: 'rgba(17, 106, 123, 0.08)',
                color: '#116A7B',
                '&:hover': { backgroundColor: 'rgba(17, 106, 123, 0.14)' },
              }}
            >
              <TelegramIcon fontSize="small" />
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
