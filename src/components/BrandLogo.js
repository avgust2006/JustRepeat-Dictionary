import React from 'react';
import { Box, Typography } from '@mui/material';
import tokens from '../theme/tokens.js';

export default function BrandLogo({ compact = false, dark = false }) {
  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.25 }}>
      <Box
        sx={{
          width: compact ? 28 : 36,
          height: compact ? 28 : 36,
          borderRadius: tokens.radii.circle,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: tokens.colors.background.goldGradient,
          color: tokens.colors.primary.main,
          fontWeight: tokens.typography.weights.black,
          fontSize: compact ? 12 : 16,
          letterSpacing: '0.08em',
          boxShadow: dark ? tokens.shadows.md : 'none',
          userSelect: 'none',
        }}
      >
        JR
      </Box>
      {!compact && (
        <Typography
          variant="subtitle1"
          sx={{
            color: dark ? tokens.colors.primary.main : tokens.colors.text.inverse,
            letterSpacing: tokens.typography.letterSpacings.widest,
            fontWeight: tokens.typography.weights.extraBold,
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

