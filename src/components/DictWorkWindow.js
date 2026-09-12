import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  LinearProgress,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import VolumeUp from '@mui/icons-material/VolumeUp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ReplayIcon from '@mui/icons-material/Replay';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import BrandLogo from './BrandLogo.js';
import tokens from '../theme/tokens.js';

const CssBut = styled(Button)({
  minWidth: 130,
  minHeight: tokens.interactive.buttonHeight,
  color: tokens.colors.primary.main,
  background: tokens.colors.background.goldGradient,
  borderRadius: tokens.radii.md,
  fontWeight: tokens.typography.weights.extraBold,
  boxShadow: tokens.shadows.button,
  padding: '10px 20px',
  transition: 'transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease',
  '&:hover': {
    background: tokens.colors.background.goldGradientHover,
    transform: 'translateY(-1px)',
    boxShadow: tokens.shadows.buttonHover,
  },
  '&:focus-visible': {
    outline: tokens.interactive.focusVisibleOutline,
    outlineOffset: tokens.interactive.focusVisibleOffset,
  },
});

const PrimaryActionBtn = styled(Button)({
  minWidth: 140,
  minHeight: tokens.interactive.buttonHeight,
  color: tokens.colors.text.inverse,
  background: tokens.colors.background.tealGradient,
  borderRadius: tokens.radii.md,
  fontWeight: tokens.typography.weights.extraBold,
  boxShadow: tokens.shadows.tealButton,
  padding: '10px 24px',
  transition: 'transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease',
  '&:hover': {
    background: tokens.colors.background.tealGradientHover,
    transform: 'translateY(-1px)',
    boxShadow: tokens.shadows.buttonHover,
  },
  '&:focus-visible': {
    outline: tokens.interactive.focusVisibleOutline,
    outlineOffset: tokens.interactive.focusVisibleOffset,
  },
});

const Item = styled(Card)({
  color: tokens.colors.primary.main,
  background: tokens.colors.background.cardItem,
  width: '100%',
  minHeight: 140,
  height: 'auto',
  padding: '12px 16px',
  borderRadius: tokens.radii.card,
  border: `1px solid ${tokens.colors.border.subtle}`,
  boxShadow: tokens.shadows.lg,
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  overflow: 'visible',
});

const extractWordText = (keyForParsing, valueForParsing) => {
  if (!keyForParsing) return '';
  if (!valueForParsing) {
    let clean = keyForParsing.replace(/\.wav$/i, '');
    if (clean.startsWith('1')) clean = clean.substring(1);
    return clean;
  }
  if (keyForParsing.length > valueForParsing.length) {
    const idx = keyForParsing.indexOf(valueForParsing);
    if (idx !== -1) {
      return keyForParsing.substring(0, idx);
    }
    return keyForParsing.replace(/\.wav$/i, '');
  } else {
    let text = keyForParsing;
    const wavIdx = text.indexOf('.wav');
    if (wavIdx !== -1) {
      text = text.substring(0, wavIdx);
    }
    if (text.startsWith('1')) {
      text = text.substring(1);
    }
    return text;
  }
};

const extractTranslationText = (keyForParsing, valueForParsing) => {
  if (!valueForParsing) return '';
  if (!keyForParsing) {
    let clean = valueForParsing.replace(/\.wav$/i, '');
    if (clean.startsWith('1')) clean = clean.substring(1);
    return clean;
  }
  if (keyForParsing.length > valueForParsing.length) {
    let text = valueForParsing;
    const wavIdx = text.indexOf('.wav');
    if (wavIdx !== -1) {
      text = text.substring(0, wavIdx);
    }
    if (text.startsWith('1')) {
      text = text.substring(1);
    }
    return text;
  } else {
    const idx = valueForParsing.indexOf(keyForParsing);
    if (idx !== -1) {
      return valueForParsing.substring(0, idx);
    }
    return valueForParsing.replace(/\.wav$/i, '');
  }
};

const DictWorkWindow = () => {
  const { title: paramTitle } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const title = useMemo(() => {
    if (paramTitle) {
      try {
        return decodeURIComponent(paramTitle).trim();
      } catch {
        return String(paramTitle).trim();
      }
    }
    if (location.state?.title) {
      return String(location.state.title).trim();
    }
    return '';
  }, [paramTitle, location.state]);

  const encodedTitle = useMemo(() => {
    if (!title) return '';
    return encodeURIComponent(title).replace(/%2B/g, '+');
  }, [title]);

  const [sessionStatus, setSessionStatus] = useState(() => (!title ? 'not_found' : 'loading')); // 'loading' | 'error' | 'empty' | 'not_found' | 'idle' | 'active' | 'completed'
  const [dictionaryMap, setDictionaryMap] = useState(new Map());
  const [remainingKeys, setRemainingKeys] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  const [currentKey, setCurrentKey] = useState('');
  const [currentValue, setCurrentValue] = useState('');
  const [currentKeyforParsing, setKeyforParsing] = useState('');
  const [currentValueforParsing, setValueforParsing] = useState('');
  const [transButtonText, setTransButtonText] = useState('Translate');

  const playAudio = useCallback((filename) => {
    if (!encodedTitle || !filename) return;
    try {
      const audioUrl = `/Dictionary/${encodedTitle}/${encodeURIComponent(filename).replace(/%2B/g, '+')}`;
      const audio = new Audio(audioUrl);
      audio.play().catch((error) => console.error('Error playing audio:', error));
    } catch (error) {
      console.error('Audio playback error:', error);
    }
  }, [encodedTitle]);

  useEffect(() => {
    if (!title) {
      return;
    }

    let isCancelled = false;
    const fetchDictionary = async () => {
      try {
        const response = await fetch(`/Dictionary/${encodedTitle}/words.txt`);
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }

        const text = await response.text();
        const namesArray = text
          .split('\n')
          .map((name) => name.trim())
          .filter(Boolean);

        const map = new Map();
        for (const x of namesArray) {
          for (const y of namesArray) {
            if (y.search(x) !== -1 && y.search(x) > 0) {
              map.set(x, y);
              map.set(y, x);
            }
          }
        }

        if (isCancelled) return;

        if (map.size === 0) {
          setSessionStatus('empty');
          return;
        }

        setDictionaryMap(map);
        setRemainingKeys(Array.from(map.keys()));
        setTotalCount(map.size);
        setCompletedCount(0);
        setCurrentKey('');
        setCurrentValue('');
        setKeyforParsing('');
        setValueforParsing('');
        setTransButtonText('Translate');
        setSessionStatus('idle');
      } catch (error) {
        if (!isCancelled) {
          console.error('Error fetching or processing the names file:', error);
          setSessionStatus('error');
        }
      }
    };

    fetchDictionary();

    return () => {
      isCancelled = true;
    };
  }, [title, encodedTitle]);

  const startSession = () => {
    const keys = Array.from(dictionaryMap.keys());
    if (keys.length === 0) return;

    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    const value = dictionaryMap.get(randomKey);

    setRemainingKeys(keys);
    setCompletedCount(0);
    setKeyforParsing(randomKey);
    setValueforParsing(value);
    setCurrentKey(extractWordText(randomKey, value));
    setCurrentValue('');
    setTransButtonText('Translate');
    setSessionStatus('active');

    playAudio(randomKey);
  };

  const TranslateButtonClick = () => {
    if (transButtonText === 'Translate') {
      const translation = extractTranslationText(currentKeyforParsing, currentValueforParsing);
      setCurrentValue(translation);
      setTransButtonText('Next');
      playAudio(currentValueforParsing);

      const nextRemaining = remainingKeys.filter((k) => k !== currentKeyforParsing);
      setRemainingKeys(nextRemaining);
      setCompletedCount((prev) => prev + 1);
    } else {
      if (remainingKeys.length === 0) {
        setSessionStatus('completed');
        return;
      }

      const randomKey = remainingKeys[Math.floor(Math.random() * remainingKeys.length)];
      const value = dictionaryMap.get(randomKey);

      setKeyforParsing(randomKey);
      setValueforParsing(value);
      setCurrentKey(extractWordText(randomKey, value));
      setCurrentValue('');
      setTransButtonText('Translate');

      playAudio(randomKey);
    }
  };

  const IconButtonWordClick = () => {
    if (currentKeyforParsing) {
      playAudio(currentKeyforParsing);
    }
  };

  const IconButtonTranslateClick = () => {
    if (currentValueforParsing && currentValue) {
      playAudio(currentValueforParsing);
    }
  };

  const JustRepeatButtonClick = () => {
    navigate('/');
  };

  const IconButtonReturnClick = () => {
    navigate('/home');
  };

  const progressPercent = useMemo(() => {
    if (totalCount === 0) return 0;
    if (sessionStatus === 'completed') return 100;
    return Math.min(100, Math.round((completedCount / totalCount) * 100));
  }, [completedCount, totalCount, sessionStatus]);

  const currentWordDisplayNumber = useMemo(() => {
    if (sessionStatus === 'completed') return totalCount;
    return Math.min(completedCount + 1, totalCount);
  }, [completedCount, totalCount, sessionStatus]);

  return (
    <Container maxWidth="md" sx={{ pb: 4, px: { xs: 2, sm: 3 }, width: '100%' }}>
      {/* Header bar */}
      <Box
        sx={{
          marginTop: { xs: 3, sm: 6, md: 8 },
          background: tokens.colors.background.headerGradient,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: 56,
          borderRadius: `${tokens.radii.card}px ${tokens.radii.card}px 0 0`,
          px: { xs: 1.5, sm: 2 },
          py: 1,
          boxShadow: tokens.shadows.xl,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <BrandLogo compact dark />
        </Box>

        <Typography
          variant="body1"
          sx={{
            color: tokens.colors.primary.contrastText,
            fontSize: { xs: '12px', sm: '14px' },
            textTransform: 'uppercase',
            letterSpacing: 1.5,
            fontWeight: tokens.typography.weights.extraBold,
            textAlign: 'center',
            flex: 1,
            px: 1,
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
          }}
        >
          {title || 'Словарь'}
        </Typography>

        <IconButton
          aria-label="Вернуться в каталог"
          onClick={IconButtonReturnClick}
          sx={{
            color: tokens.colors.primary.main,
            bgcolor: tokens.colors.accent.main,
            width: 32,
            height: 32,
            flexShrink: 0,
            '&:hover': {
              bgcolor: tokens.colors.accent.sandLight,
            },
          }}
        >
          <ArrowBackIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Main card body */}
      <Box
        sx={{
          background: tokens.colors.background.glassCard,
          marginBottom: 6,
          display: 'flex',
          flexDirection: 'column',
          borderRadius: `0 0 ${tokens.radii.card}px ${tokens.radii.card}px`,
          boxShadow: tokens.shadows.card,
          p: { xs: 2, sm: 3 },
          alignItems: 'center',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        {/* State: Not found / Invalid topic */}
        {sessionStatus === 'not_found' && (
          <Box sx={{ py: 4, textAlign: 'center', width: '100%', maxWidth: 480 }}>
            <Alert severity="warning" sx={{ mb: 3, borderRadius: tokens.radii.md }}>
              Тема занятия не указана или не найдена. Пожалуйста, выберите тему в каталоге.
            </Alert>
            <CssBut variant="contained" onClick={IconButtonReturnClick}>
              В каталог
            </CssBut>
          </Box>
        )}

        {/* State: Loading */}
        {sessionStatus === 'loading' && (
          <Box sx={{ py: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <CircularProgress sx={{ color: tokens.colors.teal.main }} size={48} />
            <Typography sx={{ color: tokens.colors.text.secondary, fontWeight: tokens.typography.weights.semibold }}>
              Загрузка словаря «{title}»...
            </Typography>
          </Box>
        )}

        {/* State: Error / Empty */}
        {(sessionStatus === 'error' || sessionStatus === 'empty') && (
          <Box sx={{ py: 4, textAlign: 'center', width: '100%', maxWidth: 480 }}>
            <Alert severity="error" sx={{ mb: 3, borderRadius: tokens.radii.md }}>
              {sessionStatus === 'empty'
                ? `В словаре по теме «${title}» нет доступных слов.`
                : `Не удалось загрузить словарь для темы «${title}». Проверьте соединение или выберите другую тему.`}
            </Alert>
            <CssBut variant="contained" onClick={IconButtonReturnClick}>
              В каталог
            </CssBut>
          </Box>
        )}

        {/* State: Idle (Not started yet) */}
        {sessionStatus === 'idle' && (
          <Box sx={{ py: 4, textAlign: 'center', width: '100%', maxWidth: 520 }}>
            <Typography variant="h5" sx={{ mb: 1, fontWeight: tokens.typography.weights.extraBold, color: tokens.colors.primary.main }}>
              Тема: {title}
            </Typography>
            <Typography sx={{ mb: 3, color: tokens.colors.text.secondary, fontSize: '1rem' }}>
              В этом словаре доступно слов для повторения: <strong>{totalCount}</strong>
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
              <PrimaryActionBtn
                variant="contained"
                onClick={startSession}
                startIcon={<PlayArrowIcon />}
                aria-label="Начать занятие"
              >
                Начать занятие
              </PrimaryActionBtn>
              <CssBut variant="contained" onClick={IconButtonReturnClick}>
                В каталог
              </CssBut>
            </Stack>
          </Box>
        )}

        {/* State: Active or Completed */}
        {(sessionStatus === 'active' || sessionStatus === 'completed') && (
          <Box sx={{ width: '100%' }}>
            {/* Visible Progress Bar and Word counter */}
            <Box sx={{ width: '100%', mb: 3, px: { xs: 0.5, sm: 1 } }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                <Typography sx={{ fontWeight: tokens.typography.weights.extraBold, fontSize: '0.92rem', color: tokens.colors.primary.main }}>
                  {sessionStatus === 'completed'
                    ? `Завершено! Все ${totalCount} слов пройдены`
                    : `Слово ${currentWordDisplayNumber} из ${totalCount}`}
                </Typography>
                <Typography sx={{ fontWeight: tokens.typography.weights.bold, fontSize: '0.92rem', color: tokens.colors.teal.main }}>
                  {progressPercent}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={progressPercent}
                aria-label="Прогресс занятия"
                sx={{
                  height: 10,
                  borderRadius: tokens.radii.pill,
                  backgroundColor: tokens.colors.status.progressBg,
                  '& .MuiLinearProgress-bar': {
                    background: tokens.colors.background.tealGradient,
                    borderRadius: tokens.radii.pill,
                  },
                }}
              />
            </Box>

            {/* Word & Translation Cards (Single column on mobile xs, 2 columns on sm+) */}
            {sessionStatus === 'active' && (
              <Grid
                container
                spacing={2.5}
                sx={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
                  px: 0,
                  mb: 4,
                }}
              >
                {/* Word card */}
                <Box sx={{ minWidth: 0, width: '100%' }}>
                  <Item>
                    <CardContent
                      sx={{
                        display: 'flex',
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        minWidth: 0,
                        minHeight: 80,
                        p: 1,
                      }}
                    >
                      <Typography
                        component="div"
                        sx={{
                          width: '100%',
                          minWidth: 0,
                          fontSize: { xs: '1.25rem', sm: '1.45rem', md: '1.75rem' },
                          lineHeight: 1.3,
                          fontWeight: tokens.typography.weights.bold,
                          color: tokens.colors.primary.main,
                          whiteSpace: 'normal',
                          wordBreak: 'break-word',
                          overflowWrap: 'break-word',
                          hyphens: 'auto',
                        }}
                      >
                        {currentKey}
                      </Typography>
                    </CardContent>

                    <CardActions sx={{ justifyContent: 'flex-start', mt: 'auto', p: 0 }}>
                      <IconButton
                        aria-label="Прослушать слово"
                        onClick={IconButtonWordClick}
                        disabled={!currentKeyforParsing}
                        sx={{
                          color: tokens.colors.primary.main,
                          bgcolor: tokens.colors.accent.main,
                          width: 36,
                          height: 36,
                          '&:hover': {
                            bgcolor: tokens.colors.accent.sandLight,
                          },
                        }}
                      >
                        <VolumeUp fontSize="small" />
                      </IconButton>
                    </CardActions>
                  </Item>
                </Box>

                {/* Translate card */}
                <Box sx={{ minWidth: 0, width: '100%' }}>
                  <Item>
                    <CardContent
                      sx={{
                        display: 'flex',
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        minWidth: 0,
                        minHeight: 80,
                        p: 1,
                      }}
                    >
                      <Typography
                        component="div"
                        sx={{
                          width: '100%',
                          minWidth: 0,
                          fontSize: { xs: '1.25rem', sm: '1.45rem', md: '1.75rem' },
                          lineHeight: 1.3,
                          fontWeight: tokens.typography.weights.bold,
                          color: tokens.colors.primary.main,
                          whiteSpace: 'normal',
                          wordBreak: 'break-word',
                          overflowWrap: 'break-word',
                          hyphens: 'auto',
                          fontStyle: currentValue ? 'normal' : 'italic',
                          opacity: currentValue ? 1 : 0.45,
                        }}
                      >
                        {currentValue || 'Нажмите Translate для перевода'}
                      </Typography>
                    </CardContent>

                    <CardActions sx={{ justifyContent: 'flex-start', mt: 'auto', p: 0 }}>
                      <IconButton
                        aria-label="Прослушать перевод"
                        onClick={IconButtonTranslateClick}
                        disabled={!currentValue}
                        sx={{
                          color: tokens.colors.primary.main,
                          bgcolor: tokens.colors.accent.main,
                          width: 36,
                          height: 36,
                          '&:hover': {
                            bgcolor: tokens.colors.accent.sandLight,
                          },
                          opacity: currentValue ? 1 : 0.4,
                        }}
                      >
                        <VolumeUp fontSize="small" />
                      </IconButton>
                    </CardActions>
                  </Item>
                </Box>
              </Grid>
            )}

            {/* State: Completed Banner */}
            {sessionStatus === 'completed' && (
              <Box
                sx={{
                  py: 4,
                  px: 2,
                  mb: 4,
                  textAlign: 'center',
                  background: tokens.colors.background.cardItem,
                  borderRadius: tokens.radii.card,
                  border: `1px solid ${tokens.colors.border.subtle}`,
                  boxShadow: tokens.shadows.md,
                }}
              >
                <CheckCircleOutlinedIcon sx={{ fontSize: 56, color: tokens.colors.status.success, mb: 1 }} />
                <Typography variant="h5" sx={{ mb: 1, fontWeight: tokens.typography.weights.extraBold, color: tokens.colors.primary.main }}>
                  Отличная работа!
                </Typography>
                <Typography sx={{ color: tokens.colors.text.secondary, fontSize: '1.05rem', maxWidth: 440, mx: 'auto' }}>
                  Вы повторили все {totalCount} слов в разделе «{title}». Регулярные повторения гарантируют быстрый результат!
                </Typography>
              </Box>
            )}

            {/* Action Buttons */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 1.5, sm: 3 }}
              sx={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {sessionStatus === 'active' && (
                <>
                  <CssBut
                    variant="contained"
                    onClick={JustRepeatButtonClick}
                    aria-label="Перейти на главную страницу JustRepeat"
                  >
                    JustRepeat
                  </CssBut>
                  <CssBut
                    variant="contained"
                    onClick={IconButtonReturnClick}
                    aria-label="Вернуться в каталог словарей"
                  >
                    В каталог
                  </CssBut>
                  <PrimaryActionBtn
                    variant="contained"
                    onClick={TranslateButtonClick}
                    aria-label={transButtonText === 'Translate' ? 'Показать перевод' : 'Следующее слово'}
                  >
                    {transButtonText}
                  </PrimaryActionBtn>
                </>
              )}

              {sessionStatus === 'completed' && (
                <>
                  <PrimaryActionBtn
                    variant="contained"
                    onClick={startSession}
                    startIcon={<ReplayIcon />}
                    aria-label="Пройти занятие заново"
                  >
                    Пройти заново
                  </PrimaryActionBtn>
                  <CssBut
                    variant="contained"
                    onClick={IconButtonReturnClick}
                    aria-label="Вернуться в каталог"
                  >
                    В каталог
                  </CssBut>
                </>
              )}
            </Stack>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default DictWorkWindow;