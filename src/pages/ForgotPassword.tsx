import { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LockResetIcon from '@mui/icons-material/LockReset';
import { AnimatedBackground } from '../components/AnimatedBackground';

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulando envio de email
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsEmailSent(true);
    } catch (error) {
      console.error('Erro ao enviar email:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AnimatedBackground />
      <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
        <Paper
          elevation={24}
          sx={{
            width: '100%',
            p: 4,
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 3,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Stack spacing={3} alignItems="center">
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: 'linear-gradient(45deg, #6e45e1 30%, #88d3ce 90%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 3px 5px 2px rgba(110, 69, 225, .3)'
              }}
            >
              <LockResetIcon sx={{ color: 'white', fontSize: 32 }} />
            </Box>

            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                textAlign: 'center'
              }}
            >
              Recuperar Senha
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              textAlign="center"
              sx={{ mb: 2 }}
            >
              {isEmailSent
                ? 'Enviamos as instruções de recuperação para seu email.'
                : 'Digite seu email e enviaremos instruções para redefinir sua senha.'}
            </Typography>

            {!isEmailSent ? (
              <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(255, 255, 255, 0.7)'
                    }
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{
                    py: 1.5,
                    mb: 2,
                    background: 'linear-gradient(45deg, #6e45e1 30%, #88d3ce 90%)',
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    boxShadow: '0 3px 5px 2px rgba(110, 69, 225, .3)'
                  }}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Instruções'}
                </Button>
              </form>
            ) : (
              <Button
                fullWidth
                variant="contained"
                onClick={() => navigate('/login')}
                sx={{
                  py: 1.5,
                  background: 'linear-gradient(45deg, #6e45e1 30%, #88d3ce 90%)',
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  boxShadow: '0 3px 5px 2px rgba(110, 69, 225, .3)'
                }}
              >
                Voltar para o Login
              </Button>
            )}

            {!isEmailSent && (
              <Button
                color="primary"
                onClick={() => navigate('/login')}
                sx={{
                  textTransform: 'none',
                  fontWeight: 'bold'
                }}
              >
                Voltar para o Login
              </Button>
            )}
          </Stack>
        </Paper>
      </Container>
    </>
  );
}; 