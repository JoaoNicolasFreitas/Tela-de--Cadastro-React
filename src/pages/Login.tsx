import { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  Divider,
  FormControlLabel,
  Checkbox,
  Stack,
  FormHelperText
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { validateEmail } from '../utils/validation';

interface FormErrors {
  email: string;
  password: string;
}

export const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<FormErrors>({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touchedFields, setTouchedFields] = useState<{ [key: string]: boolean }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpa o erro quando o usuário começa a digitar
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBlur = (fieldName: keyof FormErrors) => {
    setTouchedFields(prev => ({
      ...prev,
      [fieldName]: true
    }));

    const value = formData[fieldName];
    if (!value) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: 'Este campo é obrigatório'
      }));
      return;
    }

   
    let error = '';
    switch (fieldName) {
      case 'email':
        if (!validateEmail(value)) {
          error = 'Por favor, insira um email válido';
        }
        break;
      case 'password':
        if (value.length < 6) {
          error = 'A senha deve ter no mínimo 6 caracteres';
        } else if (!/[a-zA-Z]/.test(value)) {
          error = 'A senha deve conter pelo menos uma letra';
        }
        break;
    }

    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
  };

  const shouldShowError = (fieldName: keyof FormErrors): boolean => {
    return touchedFields[fieldName] && !!errors[fieldName];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    let hasErrors = false;
    const newErrors = { email: '', password: '' };

    if (!formData.email) {
      newErrors.email = 'O campo email é obrigatório';
      hasErrors = true;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Por favor, insira um email válido';
      hasErrors = true;
    }

    if (!formData.password) {
      newErrors.password = 'O campo senha é obrigatório';
      hasErrors = true;
    } else if (formData.password.length < 6) {
      newErrors.password = 'A senha deve ter no mínimo 6 caracteres';
      hasErrors = true;
    } else if (!/[a-zA-Z]/.test(formData.password)) {
      newErrors.password = 'A senha deve conter pelo menos uma letra';
      hasErrors = true;
    }

    setErrors(newErrors);

    if (!hasErrors) {
      try {
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        navigate('/home');
      } catch (error) {
        console.error('Erro ao fazer login:', error);
      }
    }
    setIsSubmitting(false);
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
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                mb: 1
              }}
            >
              Login
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Bem-vindo de volta! Por favor, faça login na sua conta
            </Typography>
          </Box>

          <Stack spacing={2} sx={{ mb: 3 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              sx={{
                py: 1.5,
                color: 'text.primary',
                borderColor: 'divider',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)'
                }
              }}
            >
              Continuar com Google
            </Button>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<FacebookIcon />}
              sx={{
                py: 1.5,
                color: '#1877F2',
                borderColor: '#1877F2',
                '&:hover': {
                  borderColor: '#1877F2',
                  backgroundColor: 'rgba(24, 119, 242, 0.04)'
                }
              }}
            >
              Continuar com Facebook
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>ou</Divider>

          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur('email')}
                error={shouldShowError('email')}
                required={false}
                disabled={isSubmitting}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.7)'
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
                    </InputAdornment>
                  )
                }}
              />
              {errors.email && (
                <FormHelperText error sx={{ px: 1 }}>
                  {errors.email}
                </FormHelperText>
              )}
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Senha"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                onBlur={() => handleBlur('password')}
                error={shouldShowError('password')}
                required={false}
                disabled={isSubmitting}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.7)'
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              {errors.password && (
                <FormHelperText error sx={{ px: 1 }}>
                  {errors.password}
                </FormHelperText>
              )}
            </Box>

            <Box sx={{ 
              mb: 3, 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    color="primary"
                  />
                }
                label="Lembrar-me"
              />
              <Button
                color="primary"
                onClick={() => navigate('/forgot-password')}
                sx={{ textTransform: 'none' }}
              >
                Esqueceu a senha?
              </Button>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isSubmitting}
              sx={{
                mb: 2,
                py: 1.5,
                background: 'linear-gradient(45deg, #6e45e1 30%, #88d3ce 90%)',
                textTransform: 'none',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                boxShadow: '0 3px 5px 2px rgba(110, 69, 225, .3)'
              }}
            >
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Não tem uma conta?{' '}
                <Button
                  color="primary"
                  onClick={() => navigate('/register')}
                  sx={{ textTransform: 'none', fontWeight: 'bold' }}
                >
                  Cadastre-se
                </Button>
              </Typography>
            </Box>
          </form>
        </Paper>
      </Container>
    </>
  );
}; 