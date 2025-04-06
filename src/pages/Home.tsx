import {
  Container,
  Box,
  Typography,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Grid,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BrainIcon from '@mui/icons-material/Psychology';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import GroupsIcon from '@mui/icons-material/Groups';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const features = [
  {
    icon: <LightbulbIcon sx={{ fontSize: 40, color: '#7C4DFF' }} />,
    title: 'Ideias Inovadoras',
    description: 'Descubra novas perspectivas e soluções criativas para seus desafios.'
  },
  {
    icon: <GroupsIcon sx={{ fontSize: 40, color: '#7C4DFF' }} />,
    title: 'Colaboração',
    description: 'Trabalhe em equipe e compartilhe conhecimentos de forma eficiente.'
  },
  {
    icon: <TrendingUpIcon sx={{ fontSize: 40, color: '#7C4DFF' }} />,
    title: 'Crescimento',
    description: 'Impulsione seu negócio com estratégias comprovadas de sucesso.'
  },
  {
    icon: <RocketLaunchIcon sx={{ fontSize: 40, color: '#7C4DFF' }} />,
    title: 'Inovação',
    description: 'Mantenha-se à frente com as últimas tendências e tecnologias.'
  }
];

export const Home = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: 'white', boxShadow: 1 }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <BrainIcon sx={{ color: '#7C4DFF', mr: 1, fontSize: 32 }} />
            <Typography variant="h6" sx={{ color: '#333', fontWeight: 'bold' }}>
              LOGO
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit" sx={{ color: '#333' }}>HOME</Button>
            <Button color="inherit" sx={{ color: '#7C4DFF' }}>PAGE</Button>
            <Button color="inherit" sx={{ color: '#333' }}>SOBRE</Button>
            <Button color="inherit" sx={{ color: '#333' }}>VEJA MAIS</Button>
          </Box>

          <IconButton
            size="large"
            onClick={handleMenu}
            color="inherit"
            sx={{ ml: 2, color: '#333' }}
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box sx={{ pt: 8 }}> {}
        {}
        <Container maxWidth="lg" sx={{ mt: 8 }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 4,
            minHeight: '80vh'
          }}>
            <Box sx={{ flex: 1 }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#7C4DFF',
                  fontWeight: 'bold',
                  mb: 1,
                  fontSize: '1.1rem'
                }}
              >
                Ideation Business
              </Typography>
              <Typography 
                variant="h2" 
                sx={{ 
                  fontWeight: 'bold',
                  mb: 2,
                  color: '#333',
                  lineHeight: 1.2
                }}
              >
                FIND IDEAS
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: '#666',
                  mb: 4,
                  maxWidth: '80%',
                  lineHeight: 1.6
                }}
              >
                Transforme suas ideias em realidade. Nossa plataforma oferece as ferramentas e recursos necessários para impulsionar sua criatividade e inovação.
              </Typography>
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: '#7C4DFF',
                  color: 'white',
                  px: 6,
                  py: 2,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  '&:hover': {
                    bgcolor: '#6B42E0'
                  }
                }}
              >
                Get Started
              </Button>
            </Box>

            <Box sx={{ 
              flex: 1,
              position: 'relative',
              height: '500px'
            }}>
              <Box
                component="img"
                src="/illustration.svg"
                alt="People working on ideas"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain'
                }}
              />
            </Box>
          </Box>
        </Container>

        {/* Features Section */}
        <Box sx={{ bgcolor: '#F3F0FF', py: 12, mt: 8 }}>
          <Container maxWidth="lg">
            <Typography 
              variant="h3" 
              align="center" 
              sx={{ 
                mb: 8,
                fontWeight: 'bold',
                color: '#333'
              }}
            >
              Recursos Principais
            </Typography>
            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card 
                    elevation={0}
                    sx={{ 
                      height: '100%',
                      bgcolor: 'transparent',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-8px)'
                      }
                    }}
                  >
                    <CardContent sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center',
                      textAlign: 'center',
                      p: 3
                    }}>
                      {feature.icon}
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          mt: 2, 
                          mb: 1,
                          fontWeight: 'bold',
                          color: '#333'
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Call to Action Section */}
        <Box sx={{ py: 12, textAlign: 'center' }}>
          <Container maxWidth="md">
            <Typography 
              variant="h3" 
              sx={{ 
                mb: 3,
                fontWeight: 'bold',
                color: '#333'
              }}
            >
              Pronto para Começar?
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 4,
                color: '#666',
                maxWidth: '600px',
                mx: 'auto'
              }}
            >
              Junte-se a milhares de empreendedores que já estão transformando suas ideias em realidade.
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: '#7C4DFF',
                color: 'white',
                px: 6,
                py: 2,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                '&:hover': {
                  bgcolor: '#6B42E0'
                }
              }}
            >
              Comece Agora
            </Button>
          </Container>
        </Box>

        {/* Footer */}
        <Box sx={{ bgcolor: '#F3F0FF', py: 6 }}>
          <Container maxWidth="lg">
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <BrainIcon sx={{ color: '#7C4DFF', mr: 1, fontSize: 32 }} />
                <Typography variant="h6" sx={{ color: '#333', fontWeight: 'bold' }}>
                  LOGO
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                © 2024 Todos os direitos reservados
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}; 