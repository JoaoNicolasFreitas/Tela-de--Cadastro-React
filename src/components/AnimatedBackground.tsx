import { Box } from '@mui/material';

export const AnimatedBackground = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(-45deg, #6e45e1, #88d3ce, #d4267d, #ff6b6b)',
        backgroundSize: '400% 400%',
        animation: 'gradient 15s ease infinite',
        zIndex: -1,
        '@keyframes gradient': {
          '0%': {
            backgroundPosition: '0% 50%'
          },
          '50%': {
            backgroundPosition: '100% 50%'
          },
          '100%': {
            backgroundPosition: '0% 50%'
          }
        }
      }}
    />
  );
}; 