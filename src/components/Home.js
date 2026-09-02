import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Typography, Box, Container, IconButton, styled } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BrandLogo from './BrandLogo';

const paperData = [
  { title: 'VERBS', route: '/dict-work-window' },
  { title: 'VERBS+', route: '/dict-work-window' },
  { title: 'ADJECTIVES', route: '/dict-work-window' },
  { title: 'PREPOSITIONS and ADVERBS', route: '/dict-work-window' },
  { title: 'PRONOUNS and CONJUNCTIONS', route: '/dict-work-window' },
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
  { title: 'COMMON PHRASES', route: '/dict-work-window' },
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

  const handlePaperClick = (route, title) => {
    navigate(route, { state: { title } });
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
                onClick={() => handlePaperClick(paper.route, paper.title)}
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
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
    </Container>
  );
};

export default Home;
