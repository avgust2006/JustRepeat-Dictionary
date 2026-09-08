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
import BrandLogo from './BrandLogo';

const PRICE_PER_TITLE = 50;
const PURCHASED_TITLES_KEY = 'justrepeat.purchasedDictionaryTitles';
const FREE_TITLES = new Set([
  'VERBS',
  'ADJECTIVES',
  'PRONOUNS and CONJUNCTIONS',
  'COMMON PHRASES',
]);

const paperData = [
  { title: 'VERBS', route: '/dict-work-window', isFree: true },
  { title: 'ADJECTIVES', route: '/dict-work-window', isFree: true },
  { title: 'PRONOUNS and CONJUNCTIONS', route: '/dict-work-window', isFree: true },
  { title: 'COMMON PHRASES', route: '/dict-work-window', isFree: true },
  { title: 'VERBS+', route: '/dict-work-window' },
  { title: 'BODY', route: '/dict-work-window' },
  { title: 'EDUCATION', route: '/dict-work-window' },
  { title: 'JOB', route: '/dict-work-window' },
  { title: 'SPORT', route: '/dict-work-window' },
  { title: 'FAMILY', route: '/dict-work-window' },
  { title: 'MONEY', route: '/dict-work-window' },
  { title: 'TRAVEL', route: '/dict-work-window' },
  { title: 'HOUSE', route: '/dict-work-window' },
  { title: 'FOOD', route: '/dict-work-window' },
  { title: 'TRANSPORT', route: '/dict-work-window' },
  { title: 'CLOTHES', route: '/dict-work-window' },
  { title: 'PREPOSITIONS and ADVERBS', route: '/dict-work-window' },
  { title: 'NATURE', route: '/dict-work-window' },
  { title: 'DATE and NUMBERS', route: '/dict-work-window' },
  { title: 'HEALTH', route: '/dict-work-window' },
];

const CSSIcon = styled(IconButton)({
  '&:hover': {
    backgroundColor: '#ECE5C7',
  },
  width: '25px',
  height: '25px',
  position: 'absolute',
  right: '5px',
  top: '4px',
});

const CSSPaper = styled(Paper)({
  height: '100%',
  minHeight: '96px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  padding: '14px 12px',
  textAlign: 'center',
  background: 'linear-gradient(135deg, #d7b585 0%, #f3e4ca 100%)',
  color: '#123b4d',
  borderRadius: '16px',
  border: '1px solid rgba(18,59,77,0.08)',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  width: '100%',
  boxSizing: 'border-box',
  position: 'relative',
  overflow: 'hidden',
  whiteSpace: 'normal',
  wordBreak: 'normal',
  overflowWrap: 'normal',
  '&:hover': {
    background: 'linear-gradient(135deg, #e9d5b0 0%, #f9f0dd 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 24px rgba(18,59,77,0.12)',
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
    if (!verifyEndpoint) {
      setPaymentError('Платеж получен, но проверка ЮKassa еще не настроена.');
      return;
    }

    let isCancelled = false;
    const verifyPayment = async () => {
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
          navigate('/dict-work-window', { state: { title } });
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
    if (paper.isFree || FREE_TITLES.has(paper.title)) {
      navigate(paper.route, { state: { title: paper.title } });
      return;
    }

    if (purchasedTitles.has(paper.title)) {
      navigate(paper.route, { state: { title: paper.title } });
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
    <Container maxWidth="md" sx={{ pb: 2 }}>
      <Box
        sx={{
          marginTop: 10,
          background: 'linear-gradient(90deg, #123b4d 0%, #1f5b71 100%)',
          marginBottom: 1,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          borderRadius: '18px 18px 0 0',
          px: 1,
          boxShadow: '0 18px 30px rgba(18,59,77,0.14)',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            left: 12,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 44,
            height: 34,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            zIndex: 1,
          }}
        >
          <BrandLogo compact dark />
        </Box>

        <Typography
          gutterBottom
          variant="body1"
          sx={{
            mx: 'auto',
            mt: '7px',
            color: 'primary.contrastText',
            fontSize: '14px',
            letterSpacing: 1.4,
            fontWeight: 700,
          }}
        >
          DICTIONARY
        </Typography>

        <CSSIcon aria-label="return" onClick={IconButtonReturnClick} sx={{ color: 'primary.main', bgcolor: 'secondary.main' }}>
          <ArrowBackIcon />
        </CSSIcon>
      </Box>

      <Box
        sx={{
          bgcolor: 'rgba(255,255,255,0.74)',
          marginBottom: 1,
          pb: 2,
          px: { xs: 1.5, md: 2 },
          borderRadius: '0 0 18px 18px',
          boxShadow: '0 18px 30px rgba(18,59,77,0.08)',
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
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {!paper.isFree && (
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
                    lineHeight: 1.2,
                    fontWeight: 700,
                    maxWidth: '100%',
                    whiteSpace: 'normal',
                    wordBreak: 'normal',
                    overflowWrap: 'normal',
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
      <Dialog open={Boolean(payment)} onClose={() => !isLoadingPayment && setPayment(null)} maxWidth="xs" fullWidth>
        <DialogTitle>Доступ к разделу</DialogTitle>
        <DialogContent>
          <Typography>
            Доступ к разделу «{payment?.title}» навсегда
          </Typography>
          <Typography variant="h5" sx={{ mt: 1, fontWeight: 800 }}>
            Итого: {payment?.total} ₽
          </Typography>
          {paymentError && <Alert severity="info" sx={{ mt: 2 }}>{paymentError}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPayment(null)} disabled={isLoadingPayment}>Отмена</Button>
          <Button
            variant="contained"
            onClick={handlePayment}
            disabled={isLoadingPayment || !payment}
          >
            Оплатить через ЮKassa
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Home;
