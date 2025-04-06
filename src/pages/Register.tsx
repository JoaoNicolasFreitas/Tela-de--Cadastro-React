import { useState } from 'react';
import { 
  Container, 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  Box,
  Divider,
  Snackbar,
  Alert,
  FormHelperText,
  IconButton,
  InputAdornment
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { 
  validateForm, 
  FormValidation,
  validateName,
  validateEmail,
  validateCPF,
  validatePhone,
  validatePassword,
  formatCPF,
  formatPhone,
  PATTERNS
} from '../utils/validation';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';

interface FormErrors {
  name: string;
  phone: string;
  cpf: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
}

export const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    cpf: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    phone: '',
    cpf: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: ''
  });
  const [touchedFields, setTouchedFields] = useState<{ [key: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cpf') {
      formattedValue = formatCPF(value);
  
      setErrors(prev => ({
        ...prev,
        cpf: ''
      }));
    } else if (name === 'phone') {
      formattedValue = formatPhone(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));

   
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
      case 'confirmEmail':
        if (value !== formData.email) {
          error = 'Os emails não correspondem';
        }
        break;
      case 'password':
        if (!PATTERNS.password.test(value)) {
          error = 'A senha deve conter pelo menos 8 caracteres, incluindo letras, números e caracteres especiais';
        }
        break;
      case 'confirmPassword':
        if (value !== formData.password) {
          error = 'As senhas não correspondem';
        }
        break;
      case 'cpf':
        if (value.length !== 14) {
          error = 'CPF deve estar no formato XXX.XXX.XXX-XX';
        }
        break;
      case 'phone':
        if (!validatePhone(value)) {
          error = 'Por favor, insira um telefone válido';
        }
        break;
      case 'name':
        if (!PATTERNS.name.test(value)) {
          error = 'Por favor, insira um nome válido';
        }
        break;
    }

    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
  };

  const validateFormData = (): boolean => {
    const validation: FormValidation = {
      name: {
        value: formData.name,
        required: true,
        pattern: PATTERNS.name
      },
      phone: {
        value: formData.phone,
        required: true,
        pattern: PATTERNS.phone
      },
      cpf: {
        value: formData.cpf,
        required: true,
        pattern: PATTERNS.cpf
      },
      email: {
        value: formData.email,
        required: true,
        pattern: PATTERNS.email
      },
      confirmEmail: {
        value: formData.confirmEmail,
        required: true,
        confirmField: {
          value: formData.email,
          fieldName: 'Email'
        }
      },
      password: {
        value: formData.password,
        required: true,
        pattern: PATTERNS.password,
        minLength: 8
      },
      confirmPassword: {
        value: formData.confirmPassword,
        required: true,
        confirmField: {
          value: formData.password,
          fieldName: 'Password'
        }
      }
    };

    const { isValid, errors: validationErrors } = validateForm(validation);
    const typedErrors: FormErrors = {
      name: validationErrors.name || '',
      phone: validationErrors.phone || '',
      cpf: validationErrors.cpf || '',
      email: validationErrors.email || '',
      confirmEmail: validationErrors.confirmEmail || '',
      password: validationErrors.password || '',
      confirmPassword: validationErrors.confirmPassword || ''
    };
    setErrors(typedErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Marca todos os campos como tocados
    const allFields: { [key: string]: boolean } = {};
    Object.keys(formData).forEach(key => {
      allFields[key] = true;
    });
    setTouchedFields(allFields);

    const isValid = validateFormData();

    if (isValid) {
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setShowSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } catch (error) {
        console.error('Erro ao cadastrar:', error);
      }
    }

    setIsSubmitting(false);
  };

  const shouldShowError = (fieldName: keyof FormErrors): boolean => {
    return touchedFields[fieldName] && !!errors[fieldName];
  };

  return (
    <Container maxWidth="sm">
      <Box 
        sx={{ 
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'linear-gradient(to bottom right, #ffffff, #f5f5f5)'
          }}
        >
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              backgroundColor: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2
            }}
          >
            <PersonAddIcon sx={{ color: 'white', fontSize: 32 }} />
          </Box>
          
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            align="center"
            sx={{ 
              fontWeight: 'bold',
              color: 'primary.main',
              mb: 3
            }}
          >
            Cadastro
          </Typography>

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Nome"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={() => handleBlur('name')}
                error={shouldShowError('name')}
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
                      <PersonIcon color="action" />
                    </InputAdornment>
                  )
                }}
              />
              {shouldShowError('name') && (
                <FormHelperText error sx={{ px: 1 }}>
                  {errors.name}
                </FormHelperText>
              )}
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Telefone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={() => handleBlur('phone')}
                error={shouldShowError('phone')}
                required={false}
                disabled={isSubmitting}
                placeholder="(XX) XXXXX-XXXX"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.7)'
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon color="action" />
                    </InputAdornment>
                  )
                }}
              />
              {shouldShowError('phone') && (
                <FormHelperText error sx={{ px: 1 }}>
                  {errors.phone}
                </FormHelperText>
              )}
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="CPF"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                onBlur={() => handleBlur('cpf')}
                error={shouldShowError('cpf')}
                required={false}
                disabled={isSubmitting}
                placeholder="XXX.XXX.XXX-XX"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.7)'
                  }
                }}
              />
              {shouldShowError('cpf') && (
                <FormHelperText error sx={{ px: 1 }}>
                  {errors.cpf}
                </FormHelperText>
              )}
            </Box>

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
              {shouldShowError('email') && (
                <FormHelperText error sx={{ px: 1 }}>
                  {errors.email}
                </FormHelperText>
              )}
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Confirmar Email"
                name="confirmEmail"
                type="email"
                value={formData.confirmEmail}
                onChange={handleChange}
                onBlur={() => handleBlur('confirmEmail')}
                error={shouldShowError('confirmEmail')}
                required={false}
                disabled={isSubmitting}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.7)'
                  }
                }}
              />
              {shouldShowError('confirmEmail') && (
                <FormHelperText error sx={{ px: 1 }}>
                  {errors.confirmEmail}
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
              {shouldShowError('password') && (
                <FormHelperText error sx={{ px: 1 }}>
                  {errors.password}
                </FormHelperText>
              )}
            </Box>

            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Confirmação de Senha"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={() => handleBlur('confirmPassword')}
                error={shouldShowError('confirmPassword')}
                required={false}
                disabled={isSubmitting}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.7)'
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              {shouldShowError('confirmPassword') && (
                <FormHelperText error sx={{ px: 1 }}>
                  {errors.confirmPassword}
                </FormHelperText>
              )}
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
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
              {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
            </Button>

            <Divider sx={{ my: 2 }}>ou</Divider>

            <Button
              fullWidth
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => navigate('/login')}
              disabled={isSubmitting}
              sx={{ 
                py: 1.5,
                textTransform: 'none',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2
                }
              }}
            >
              Voltar para o Login
            </Button>
          </form>
        </Paper>
      </Box>

      <Snackbar
        open={showSuccess}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Cadastro realizado com sucesso!
        </Alert>
      </Snackbar>
    </Container>
  );
}; 