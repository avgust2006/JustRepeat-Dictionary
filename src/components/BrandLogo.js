import React from 'react';
import { Box, Typography } from '@mui/material';

export default function BrandLogo({ compact = false, dark = false }) {
  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.25 }}>
      <Box
        sx={{
          width: compact ? 28 : 36,
          height: compact ? 28 : 36,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #f2d7aa 0%, #f9f1e1 100%)',
          color: '#123b4d',
          fontWeight: 900,
          fontSize: compact ? 12 : 16,
          letterSpacing: '0.08em',
          boxShadow: dark ? '0 10px 18px rgba(18,59,77,0.12)' : 'none',
          userSelect: 'none',
        }}
      >
        JR
      </Box>
      {!compact && (
        <Typography
          variant="subtitle1"
          sx={{
            color: dark ? '#123b4d' : '#f9f4ef',
            letterSpacing: '0.18em',
            fontWeight: 800,
            textTransform: 'uppercase',
            fontSize: 13,
          }}
        >
          Just Repeat
        </Typography>
      )}
    </Box>
  );
}
