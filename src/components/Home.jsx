import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Typography,
  Box,
  Container,
  IconButton,
  styled,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import BrandLogo from './BrandLogo.jsx';
import tokens from '../theme/tokens.js';

const PRICE_PER_TITLE = 50;
const PURCHASED_TITLES_KEY = 'justrepeat.purchasedDictionaryTitles';
const FREE_TITLES = new Set([
  'VERBS',
  'ADJECTIVES',
  'PRONOUNS and CONJUNCTIONS',
  'COMMON PHRASES',
]);

const paperData = [
  { title: 'VERBS', isFree: true },
  { title: 'ADJECTIVES', isFree: true },
  { title: 'PRONOUNS and CONJUNCTIONS', isFree: true },
  { title: 'COMMON PHRASES', isFree: true },
  { title: 'VERBS+' },
  { title: 'BODY' },
  { title: 'EDUCATION' },
  { title: 'JOB' },
  { title: 'SPORT' },
  { title: 'FAMILY' },
  { title: 'MONEY' },
  { title: 'TRAVEL' },
  { title: 'HOUSE' },
  { title: 'FOOD' },
  { title: 'TRANSPORT' },
  { title: 'CLOTHES' },
  { title: 'PREPOSITIONS and ADVERBS' },
  { title: 'NATURE' },
  { title: 'DATE and NUMBERS' },
  { title: 'HEALTH' },
];

const CSSPaper = styled(Paper)({
  height: '100%',
  minHeight: '96px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  padding: '14px 12px',
  textAlign: 'center',
  background: tokens.colors.background.paperGradient,
  color: tokens.colors.primary.main,
  borderRadius: tokens.radii.xl,
  border: `1px solid ${tokens.colors.border.subtle}`,
  transition: 'transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
  width: '100%',
  boxSizing: 'border-box',
  position: 'relative',
  overflow: 'hidden',
  whiteSpace: 'normal',
  wordBreak: 'break-word',
  overflowWrap: 'break-word',
  '&:hover': {
    background: tokens.colors.background.paperGradientHover,
    transform: 'translateY(-2px)',
    boxShadow: tokens.shadows.button,
  },
  '&:focus-visible': {
    outline: tokens.interactive.focusVisibleOutline,
    outlineOffset: tokens.interactive.focusVisibleOffset,
  },
});

const Home = () => {
  const navigate = useNavigate();
  const [payment, setPayment] = React.useState(null);
  const [paymentError, setPaymentError] = React.useState('');
  const [isLoadingPayment, setIsLoadingPayment] = React.useState(false);
  const [purchasedTitles, setPurchasedTitles] = React.useState(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem(PURCHASED_TITLES_KEY) || '[]'));
    } catch (error) {
      console.error('Unable to read purchased dictionary titles:', error);
      return new Set();
    }
  });

  const rememberPurchase = React.useCallback((title) => {
    setPurchasedTitles((currentTitles) => {
      const nextTitles = new Set(currentTitles);
      nextTitles.add(title);
      localStorage.setItem(PURCHASED_TITLES_KEY, JSON.stringify([...nextTitles]));
      return nextTitles;
    });
  }, []);

  React.useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const paymentId = query.get('paymentId');
    const title = query.get('title');
    if (query.get('payment') !== 'success' || !paymentId || !title) {
      return;
    }

    const verifyEndpoint = import.meta.env.VITE_YOOKASSA_VERIFY_ENDPOINT;
    let isCancelled = false;
    const verifyPayment = async () => {
      if (!verifyEndpoint) {
        setPaymentError('Платеж получен, но проверка ЮKassa еще не настроена.');
        return;
      }
      setIsLoadingPayment(true);
      try {
        const response = await fetch(verifyEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentId, title }),
        });
        if (!response.ok) {
          throw new Error('Payment verification failed.');
        }
        const result = await response.json();
        if (!result.paid) {
          throw new Error('Payment is not confirmed.');
        }
        if (!isCancelled) {
          rememberPurchase(title);
          window.history.replaceState({}, '', '/home');
          navigate(`/dict-work-window/${encodeURIComponent(title)}`, { state: { title } });
        }
      } catch (error) {
        console.error('Unable to verify ЮKassa payment:', error);
        if (!isCancelled) {
          setPaymentError('Платеж еще не подтвержден. Попробуйте открыть раздел позже.');
        }
      } finally {
        if (!isCancelled) {
          setIsLoadingPayment(false);
        }
      }
    };

    verifyPayment();
    return () => {
      isCancelled = true;
    };
  }, [navigate, rememberPurchase]);

  const handlePaperClick = (paper) => {
    const targetRoute = `/dict-work-window/${encodeURIComponent(paper.title)}`;
    if (paper.isFree || FREE_TITLES.has(paper.title)) {
      navigate(targetRoute, { state: { title: paper.title } });
      return;
    }

    if (purchasedTitles.has(paper.title)) {
      navigate(targetRoute, { state: { title: paper.title } });
      return;
    }

    setPayment({ title: paper.title, total: PRICE_PER_TITLE });
    setPaymentError('');
  };

  const handlePayment = async () => {
    if (!payment) {
      return;
    }

    const checkoutEndpoint = import.meta.env.VITE_YOOKASSA_CHECKOUT_ENDPOINT;
    if (!checkoutEndpoint) {
      setPaymentError('Оплата через ЮKassa пока не подключена. Это станет доступно после настройки аккаунта.');
      return;
    }

    setPaymentError('');
    setIsLoadingPayment(true);
    try {
      const returnUrl = new URL('/home', window.location.origin);
      returnUrl.searchParams.set('payment', 'success');
      returnUrl.searchParams.set('title', payment.title);
      const response = await fetch(checkoutEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: payment.title,
          amount: payment.total,
          currency: 'RUB',
          returnUrl: returnUrl.toString(),
        }),
      });
      if (!response.ok) {
        throw new Error('ЮKassa checkout request failed.');
      }

      const { confirmationUrl } = await response.json();
      if (!confirmationUrl) {
        throw new Error('ЮKassa did not return a confirmation URL.');
      }
      window.location.assign(confirmationUrl);
    } catch (error) {
      console.error('Unable to create ЮKassa payment:', error);
      setPaymentError('Не удалось открыть оплату. Попробуйте еще раз.');
    } finally {
      setIsLoadingPayment(false);
    }
  };

  const IconButtonReturnClick = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="md" sx={{ pb: 3, px: { xs: 2, sm: 3 } }}>
      <Box
        sx={{
          marginTop: { xs: 4, sm: 6, md: 10 },
          background: tokens.colors.background.headerGradient,
          marginBottom: 1,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: `${tokens.radii.card}px ${tokens.radii.card}px 0 0`,
          px: { xs: 1.5, sm: 2 },
          py: 1.25,
          minHeight: 56,
          boxShadow: tokens.shadows.xl,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <BrandLogo compact dark />
        </Box>

        <Typography
          variant="body1"
          sx={{
            color: tokens.colors.primary.contrastText,
            fontSize: { xs: '13px', sm: '14px' },
            letterSpacing: 1.4,
            fontWeight: tokens.typography.weights.bold,
            textAlign: 'center',
            flex: 1,
            px: 1,
          }}
        >
          DICTIONARY
        </Typography>

        <IconButton
          aria-label="Вернуться на главную"
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

      <Box
        sx={{
          bgcolor: tokens.colors.background.paperGlass,
          marginBottom: 1,
          pb: 2.5,
          pt: 2,
          px: { xs: 1.5, sm: 2 },
          borderRadius: `0 0 ${tokens.radii.card}px ${tokens.radii.card}px`,
          boxShadow: tokens.shadows.lg,
        }}
      >
        <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
          {paperData.map((paper, index) => (
            <Grid
              key={index}
              size={{ xs: 12, sm: 6, md: 3 }}
              sx={{
                display: 'flex',
                alignItems: 'stretch',
              }}
            >
              <CSSPaper
                elevation={2}
                onClick={() => handlePaperClick(paper)}
                tabIndex={0}
                role="button"
                aria-label={`Раздел словаря: ${paper.title}${paper.isFree ? ' (бесплатно)' : ''}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handlePaperClick(paper);
                  }
                }}
              >
                {!paper.isFree && !purchasedTitles.has(paper.title) && (
                  <LockOutlinedIcon
                    aria-label="Платный раздел"
                    sx={{ position: 'absolute', top: 8, right: 8, fontSize: 18, opacity: 0.7 }}
                  />
                )}
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontSize: { xs: '0.92rem', sm: '1rem', md: '1.05rem' },
                    lineHeight: 1.25,
                    fontWeight: tokens.typography.weights.bold,
                    maxWidth: '100%',
                    whiteSpace: 'normal',
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                    textAlign: 'center',
                  }}
                >
                  {paper.title}
                </Typography>
              </CSSPaper>
            </Grid>
          ))}
        </Grid>
      </Box>
      {paymentError && !payment && <Alert severity="info" sx={{ mt: 2 }}>{paymentError}</Alert>}
      <Dialog
        open={Boolean(payment)}
        onClose={() => !isLoadingPayment && setPayment(null)}
        maxWidth="xs"
        fullWidth
        aria-labelledby="payment-dialog-title"
      >
        <DialogTitle id="payment-dialog-title">Доступ к разделу</DialogTitle>
        <DialogContent>
          <Typography>
            Доступ к разделу «{payment?.title}» навсегда
          </Typography>
          <Typography variant="h5" sx={{ mt: 1, fontWeight: tokens.typography.weights.extraBold, color: tokens.colors.primary.main }}>
            Итого: {payment?.total} ₽
          </Typography>
          {paymentError && <Alert severity="info" sx={{ mt: 2 }}>{paymentError}</Alert>}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setPayment(null)} disabled={isLoadingPayment}>
            Отмена
          </Button>
          <Button
            variant="contained"
            onClick={handlePayment}
            disabled={isLoadingPayment || !payment}
            sx={{
              background: tokens.colors.background.tealGradient,
              color: tokens.colors.text.inverse,
              '&:hover': {
                background: tokens.colors.background.tealGradientHover,
              },
            }}
          >
            Оплатить через ЮKassa
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Home;
