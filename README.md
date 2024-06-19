# LocFarma
Repositório para desenvolvimento do software LocFarma, para o cumprimento do Projeto Transdisciplinar do curso Desenvolvimento de Software Multiplataforma, na faculdade Fatec Matão - Luiz Marchesan.

# Tarefas de Melhorias como Avaliação [11/06/2024] 
(As Sugestões de Códigos São Geradas para guiar exemplos não são implementações prontas. As utilize como guias de introdução)


#### Tarefas de Melhorias e Novas Funcionalidades

1. **Alteração Visual: Melhorar a Tela de Login (3 pontos)**
   - **Descrição:** Atualizar o design da tela de login para torná-la mais moderna e responsiva.
   - **Exemplo de Código:**
     ```jsx
     // Login.js
     import React from 'react';
     import { Button, TextField, Container, Typography } from '@material-ui/core';

     const Login = () => (
       <Container maxWidth="sm">
         <Typography variant="h4" align="center">Login</Typography>
         <TextField fullWidth label="Email" margin="normal" />
         <TextField fullWidth label="Password" type="password" margin="normal" />
         <Button variant="contained" color="primary" fullWidth>Login</Button>
       </Container>
     );

     export default Login;
     ```

2. **Alteração Visual: Atualização da Paleta de Cores (3 pontos)**
   - **Descrição:** Revisar e atualizar a paleta de cores da aplicação para uma melhor experiência visual.
   - **Exemplo de Código:**
     ```jsx
     // theme.js
     import { createMuiTheme } from '@material-ui/core/styles';

     const theme = createMuiTheme({
       palette: {
         primary: {
           main: '#1976d2',
         },
         secondary: {
           main: '#dc004e',
         },
       },
     });

     export default theme;
     ```

3. **Alteração Visual: Redesign dos Botões (3 pontos)**
   - **Descrição:** Atualizar o estilo dos botões em toda a aplicação para garantir consistência.
   - **Exemplo de Código:**
     ```jsx
     // Button.js
     import React from 'react';
     import { Button } from '@material-ui/core';

     const CustomButton = ({ children, ...props }) => (
       <Button variant="contained" color="primary" {...props}>
         {children}
       </Button>
     );

     export default CustomButton;
     ```

4. **Funcionalidade: Implementação de Claims de Usuário (8 pontos)**
   - **Descrição:** Adicionar claims de usuário para controle de acesso granular.
   - **Exemplo de Código:**
     ```js
     // Firebase function
     const functions = require('firebase-functions');
     const admin = require('firebase-admin');
     admin.initializeApp();

     exports.addUserClaims = functions.https.onCall(async (data, context) => {
       if (!context.auth.token.admin) {
         throw new functions.https.HttpsError('permission-denied', 'Only admins can add claims');
       }
       const { uid, claims } = data;
       await admin.auth().setCustomUserClaims(uid, claims);
       return { message: 'Claims added successfully' };
     });
     ```

5. **Funcionalidade: Integração com Firebase para Login Social (13 pontos)**
   - **Descrição:** Implementar login social (Google, Facebook) usando Firebase Authentication.
   - **Exemplo de Código:**
     ```js
     // auth.js
     import firebase from 'firebase/app';
     import 'firebase/auth';

     const provider = new firebase.auth.GoogleAuthProvider();
     export const signInWithGoogle = () => {
       firebase.auth().signInWithPopup(provider)
         .then(result => console.log(result))
         .catch(error => console.error(error));
     };
     ```

6. **Funcionalidade: Criação de Dashboard de Usuário (21 pontos)**
   - **Descrição:** Desenvolver um dashboard para usuários, exibindo informações relevantes e estatísticas.
   - **Exemplo de Código:**
     ```jsx
     // Dashboard.js
     import React, { useEffect, useState } from 'react';
     import { Container, Grid, Paper, Typography } from '@material-ui/core';
     import { getUserStats } from '../api';

     const Dashboard = () => {
       const [stats, setStats] = useState({});

       useEffect(() => {
         getUserStats().then(setStats);
       }, []);

       return (
         <Container>
           <Typography variant="h4">User Dashboard</Typography>
           <Grid container spacing={3}>
             <Grid item xs={12} sm={6} md={4}>
               <Paper>
                 <Typography variant="h6">Total Orders</Typography>
                 <Typography>{stats.totalOrders}</Typography>
               </Paper>
             </Grid>
             {/* More cards */}
           </Grid>
         </Container>
       );
     };

     export default Dashboard;
     ```

7. **Funcionalidade: Configuração de Ambientes de Aplicação com Bootstrap (13 pontos)**
   - **Descrição:** Configurar Bootstrap via npm para estilização da aplicação.
   - **Exemplo de Código:**
     ```bash
     npm install bootstrap
     ```

     ```jsx
     // index.js
     import 'bootstrap/dist/css/bootstrap.min.css';
     ```

8. **Funcionalidade: Implementação de Firebase-Tools para Deploy (21 pontos)**
   - **Descrição:** Utilizar Firebase-Tools para automatizar o processo de deploy.
   - **Exemplo de Código:**
     ```bash
     npm install -g firebase-tools
     firebase login
     firebase init
     firebase deploy
     ```

9. **Funcionalidade: Configuração de Actions GitHub para CI/CD (34 pontos)**
   - **Descrição:** Configurar GitHub Actions para integração contínua e deploy contínuo (CI/CD).
   - **Exemplo de Código:**
     ```yaml
     # .github/workflows/deploy.yml
     name: CI/CD

     on:
       push:
         branches:
           - main

     jobs:
       build:
         runs-on: ubuntu-latest
         steps:
           - uses: actions/checkout@v2
           - name: Install dependencies
             run: npm install
           - name: Run tests
             run: npm test
           - name: Deploy to Firebase
             run: |
               npm install -g firebase-tools
               firebase deploy --token ${{ secrets.FIREBASE_TOKEN }}
     ```

10. **Funcionalidade: Implementação de Visão Dashboard com Firebase (55 pontos)**
    - **Descrição:** Desenvolver uma visão de dashboard avançada, integrando dados do Firebase.
    - **Exemplo de Código:**
      ```jsx
      // AdvancedDashboard.js
      import React, { useEffect, useState } from 'react';
      import { Container, Grid, Paper, Typography } from '@material-ui/core';
      import { getAdvancedStats } from '../api';
      import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

      const AdvancedDashboard = () => {
        const [stats, setStats] = useState([]);

        useEffect(() => {
          getAdvancedStats().then(setStats);
        }, []);

        return (
          <Container>
            <Typography variant="h4">Advanced Dashboard</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper>
                  <LineChart width={600} height={300} data={stats}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                  </LineChart>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        );
      };

      export default AdvancedDashboard;
      ```

11. **Alteração Visual: Melhorar a Página de Cadastro de Usuário (3 pontos)**
    - **Descrição:** Atualizar o design da página de cadastro de usuário para torná-la mais intuitiva e visualmente atraente.
    - **Exemplo de Código:**
      ```jsx
      // Register.js
      import React from 'react';
      import { Button, TextField, Container, Typography } from '@material-ui/core';

      const Register = () => (
        <Container maxWidth="sm">
          <Typography variant="h4" align="center">Register</Typography>
          <TextField fullWidth label="Name" margin="normal" />
          <TextField fullWidth label="Email" margin="normal" />
          <TextField fullWidth label="Password" type="password" margin="normal" />
          <Button variant="contained" color="primary" fullWidth>Register</Button>
        </Container>
      );

      export default Register;
      ```

12. **Alteração Visual: Adicionar Ícones aos Botões de Ação (3 pontos)**
    - **Descrição:** Incluir ícones representativos aos botões de ação para melhor usabilidade.
    - **Exemplo de Código:**
      ```jsx
      // IconButton.js
      import React from 'react';
      import { Button } from '@material-ui/core';
      import { Save, Delete } from '@material-ui/icons';

      const IconButton = ({ type, ...props }) => (
        <Button variant="contained" color="primary" {...props}>
          {type === 'save' ? <Save /> : <Delete />} {props.children}
        </Button>
      );

      export default IconButton;
      ```

13. **Alteração Visual: Melhorar a Exibição de Produtos (3 pontos)**
    - **Descrição:** Atualizar o design da exibição de produtos para ser mais atrativa e informativa.
    - **Exemplo de Código:**
      ```jsx
      // ProductCard.js
      import React from 'react';
      import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';

      const ProductCard = ({ product }) => (
        <Card>
          <CardMedia
            image={product.image}
            title={product.name}
            style={{ height: 140 }}
          />
          <CardContent>
            <Typography variant="h5">{product.name}</Typography>
            <Typography>{product.description}</Typography>
            <Typography variant="h6">${product.price}</Typography>
          </CardContent>
        </Card>
      );

      export default ProductCard;
      ```

14. **Funcionalidade: Implementar Sistema de Favoritos (8 pontos)**
    - **Descrição:** Permitir que os usuários marquem produtos como favoritos para acesso rápido.
    - **Exemplo de Código:**
      ```js
      // favorites.js
      import firebase from 'firebase/app';
      import 'firebase/firestore';

      export const addToFavorites = (userId, productId) => {
        const db = firebase.firestore();
        return db.collection('users').doc(userId).update({
          favorites: firebase.firestore.FieldValue.arrayUnion(productId)
        });
      };
      ```

15. **Funcionalidade: Implementar Recuperação de Senha (13 pontos)**
    - **Descrição:** Adicionar funcionalidade de recuperação de senha para usuários que esqueceram suas credenciais.
    - **Exemplo de Código:**
      ```js
      // auth.js
      import firebase from 'firebase/app';
      import 'firebase/auth';

      export const resetPassword = (email) => {
        return firebase.auth().sendPasswordResetEmail(email);
      };
      ```

16. **Funcionalidade: Melhorar a Busca de Produtos com Algolia (21 pontos)**
    - **Descrição:** Integrar Algolia para uma busca de produtos mais rápida e eficiente.
    - **Exemplo de Código:**
      ```js
      // search.js
      import algoliasearch from 'algoliasearch/lite';

      const searchClient = algoliasearch('YourApplicationID', 'YourSearchOnlyAPIKey');

      export const searchProducts = (query) => {
        return searchClient.initIndex('products').search(query);
      };
      ```

17. **Funcionalidade: Implementar Testes de Integração com Cypress (21 pontos)**
    - **Descrição:** Adicionar testes de integração usando Cypress para garantir a estabilidade do sistema.
    - **Exemplo de Código:**
      ```js
      // cypress/integration/login_spec.js
      describe('Login Page', () => {
        it('should allow a user to login', () => {
          cy.visit('/login');
          cy.get('input[name=email]').type('test@example.com');
          cy.get('input[name=password]').type('password');
          cy.get('button').contains('Login').click();
          cy.url().should('include', '/dashboard');
        });
      });
      ```

18. **Funcionalidade: Implementar Log de Atividades de Usuário (34 pontos)**
    - **Descrição:** Adicionar um sistema de log para monitorar atividades dos usuários na aplicação.
    - **Exemplo de Código:**
      ```js
      // activityLog.js
      import firebase from 'firebase/app';
      import 'firebase/firestore';

      export const logUserActivity = (userId, activity) => {
        const db = firebase.firestore();
        return db.collection('activityLogs').add({
          userId,
          activity,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
      };
      ```

19. **Funcionalidade: Configurar GitHub Actions para Testes Automatizados (34 pontos)**
    - **Descrição:** Configurar GitHub Actions para rodar testes automatizados em cada push.
    - **Exemplo de Código:**
      ```yaml
      # .github/workflows/test.yml
      name: Test Automation

      on:
        push:
          branches:
            - main

      jobs:
        test:
          runs-on: ubuntu-latest
          steps:
            - uses: actions/checkout@v2
            - name: Install dependencies
              run: npm install
            - name: Run tests
              run: npm test
      ```

20. **Funcionalidade: Implementar Analytics com Google Analytics (55 pontos)**
    - **Descrição:** Adicionar Google Analytics para monitoramento e análise de uso da aplicação.
    - **Exemplo de Código:**
      ```js
      // analytics.js
      import ReactGA from 'react-ga';

      export const initGA = () => {
        ReactGA.initialize('UA-XXXXXXXXX-X');
      };

      export const logPageView = () => {
        ReactGA.set({ page: window.location.pathname });
        ReactGA.pageview(window.location.pathname);
      };

      // App.js
      import React, { useEffect } from 'react';
      import { initGA, logPageView } from './analytics';

      const App = () => {
        useEffect(() => {
          initGA();
          logPageView();
        }, []);

        return (
          // your app components
        );
      };

      export default App;
      ```

21. **Alteração Visual: Implementar Tema Escuro (3 pontos)**
    - **Descrição:** Adicionar a opção de tema escuro na aplicação para melhorar a experiência do usuário em ambientes com pouca luz.
    - **Exemplo de Código:**
      ```jsx
      // theme.js
      import { createMuiTheme } from '@material-ui/core/styles';

      export const lightTheme = createMuiTheme({
        palette: {
          type: 'light',
        },
      });

      export const darkTheme = createMuiTheme({
        palette: {
          type: 'dark',
        },
      });
      ```

22. **Alteração Visual: Melhorar a Interface de Checkout (3 pontos)**
    - **Descrição:** Atualizar o design da interface de checkout para torná-la mais intuitiva e fluida.
    - **Exemplo de Código:**
      ```jsx
      // Checkout.js
      import React from 'react';
      import { Button, TextField, Container, Typography } from '@material-ui/core';

      const Checkout = () => (
        <Container maxWidth="sm">
          <Typography variant="h4" align="center">Checkout</Typography>
          <TextField fullWidth label="Address" margin="normal" />
          <TextField fullWidth label="City" margin="normal" />
          <TextField fullWidth label="Postal Code" margin="normal" />
          <Button variant="contained" color="primary" fullWidth>Submit</Button>
        </Container>
      );

      export default Checkout;
      ```

23. **Alteração Visual: Adicionar Animações de Carregamento (3 pontos)**
    - **Descrição:** Implementar animações de carregamento para melhorar a percepção de desempenho da aplicação.
    - **Exemplo de Código:**
      ```jsx
      // LoadingSpinner.js
      import React from 'react';
      import { CircularProgress } from '@material-ui/core';

      const LoadingSpinner = () => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </div>
      );

      export default LoadingSpinner;
      ```

24. **Funcionalidade: Implementar Notificações em Tempo Real (8 pontos)**
    - **Descrição:** Adicionar sistema de notificações em tempo real para informar usuários sobre atualizações importantes.
    - **Exemplo de Código:**
      ```js
      // notifications.js
      import firebase from 'firebase/app';
      import 'firebase/messaging';

      const messaging = firebase.messaging();

      export const requestNotificationPermission = async () => {
        try {
          await messaging.requestPermission();
          const token = await messaging.getToken();
          console.log('Notification permission granted.', token);
        } catch (error) {
          console.error('Unable to get permission to notify.', error);
        }
      };
      ```

25. **Funcionalidade: Adicionar Suporte a Múltiplos Idiomas (13 pontos)**
    - **Descrição:** Implementar i18n para suportar múltiplos idiomas na aplicação.
    - **Exemplo de Código:**
      ```js
      // i18n.js
      import i18n from 'i18next';
      import { initReactI18next } from 'react-i18next';
      import resources from './locales';

      i18n
        .use(initReactI18next)
        .init({
          resources,
          lng: 'en',
          interpolation: {
            escapeValue: false,
          },
        });

      export default i18n;
      ```

26. **Funcionalidade: Implementar Histórico de Pedidos (21 pontos)**
    - **Descrição:** Adicionar funcionalidade para que usuários visualizem o histórico de seus pedidos.
    - **Exemplo de Código:**
      ```jsx
      // OrderHistory.js
      import React, { useEffect, useState } from 'react';
      import { Container, Typography, List, ListItem, ListItemText } from '@material-ui/core';
      import { getOrderHistory } from '../api';

      const OrderHistory = () => {
        const [orders, setOrders] = useState([]);

        useEffect(() => {
          getOrderHistory().then(setOrders);
        }, []);

        return (
          <Container>
            <Typography variant="h4">Order History</Typography>
            <List>
              {orders.map(order => (
                <ListItem key={order.id}>
                  <ListItemText primary={`Order #${order.id}`} secondary={`Total: ${order.total}`} />
                </ListItem>
              ))}
            </List>
          </Container>
        );
      };

      export default OrderHistory;
      ```

27. **Funcionalidade: Adicionar Autenticação de Dois Fatores (21 pontos)**
    - **Descrição:** Implementar autenticação de dois fatores (2FA) para melhorar a segurança dos usuários.
    - **Exemplo de Código:**
      ```js
      // auth.js
      import firebase from 'firebase/app';
      import 'firebase/auth';

      export const enableTwoFactorAuth = async (user) => {
        const provider = new firebase.auth.PhoneAuthProvider();
        const verificationId = await provider.verifyPhoneNumber(user.phoneNumber, window.recaptchaVerifier);
        const verificationCode = window.prompt('Please enter the verification code that was sent to your mobile device.');
        const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, verificationCode);
        await user.multiFactor.enroll(credential, 'My 2FA');
      };
      ```

28. **Funcionalidade: Implementar Módulo de Relatórios (34 pontos)**
    - **Descrição:** Adicionar um módulo de relatórios para visualização de dados analíticos e insights.
    - **Exemplo de Código:**
      ```jsx
      // Reports.js
      import React, { useEffect, useState } from 'react';
      import { Container, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
      import { getReports } from '../api';

      const Reports = () => {
        const [reports, setReports] = useState([]);

        useEffect(() => {
          getReports().then(setReports);
        }, []);

        return (
          <Container>
            <Typography variant="h4">Reports</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Metric</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reports.map(report => (
                  <TableRow key={report.date}>
                    <TableCell>{report.date}</TableCell>
                    <TableCell>{report.metric}</TableCell>
                    <TableCell>{report.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Container>
        );
      };

      export default Reports;
      ```

29. **Funcionalidade: Implementar Testes Unitários com Jest (34 pontos)**
    - **Descrição:** Adicionar testes unitários utilizando Jest para garantir a qualidade do código.
    - **Exemplo de Código:**
      ```js
      // __tests__/example.test.js
      import { add } from '../utils';

      test('adds 1 + 2 to equal 3', () => {
        expect(add(1, 2)).toBe(3);
      });

      // utils.js
      export const add = (a, b) => a + b;
      ```

30. **Funcionalidade: Implementar Funcionalidade de Chat para Suporte ao Cliente (55 pontos)**
    - **Descrição:** Adicionar um sistema de chat em tempo real para suporte ao cliente, utilizando Firebase para backend de mensagens.
    - **Exemplo de Código:**
      ```jsx
      // Chat.js
      import React, { useEffect, useState } from 'react';
      import { Container, TextField, Button, List, ListItem, ListItemText } from '@material-ui/core';
      import firebase from 'firebase/app';
      import 'firebase/firestore';

      const Chat = () => {
        const [messages, setMessages] = useState([]);
        const [newMessage, setNewMessage] = useState('');
        const db = firebase.firestore();

        useEffect(() => {
          const unsubscribe = db.collection('messages').orderBy('timestamp')
            .onSnapshot(snapshot => {
              const messagesData = snapshot.docs.map(doc => doc.data());
              setMessages(messagesData);
            });
          return () => unsubscribe();
        }, [db]);

        const sendMessage = () => {
          db.collection('messages').add({
            text: newMessage,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });
          setNewMessage('');
        };

        return (
          <Container>
            <List>
              {messages.map((message, index) => (
                <ListItem key={index}>
                  <ListItemText primary={message.text} />
                </ListItem>
              ))}
            </List>
            <TextField
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message"
              fullWidth
            />
            <Button onClick={sendMessage} variant="contained" color="primary">Send</Button>
          </Container>
        );
      };

      export default Chat;
      ```

31. **Alteração Visual: Melhorar a Página de Perfil do Usuário (3 pontos)**
    - **Descrição:** Atualizar o design da página de perfil do usuário para torná-la mais informativa e visualmente atraente.
    - **Exemplo de Código:**
      ```jsx
      // UserProfile.js
      import React from 'react';
      import { Container, Typography, TextField, Button } from '@material-ui/core';

      const UserProfile = () => (
        <Container maxWidth="sm">
          <Typography variant="h4" align="center">User Profile</Typography>
          <TextField fullWidth label="Name" margin="normal" />
          <TextField fullWidth label="Email" margin="normal" />
          <TextField fullWidth label="Phone Number" margin="normal" />
          <Button variant="contained" color="primary" fullWidth>Update</Button>
        </Container>
      );

      export default UserProfile;
      ```

32. **Alteração Visual: Atualizar a Página de Produtos com Grid Responsivo (3 pontos)**
    - **Descrição:** Implementar um layout de grid responsivo para a página de produtos.
    - **Exemplo de Código:**
      ```jsx
      // ProductsGrid.js
      import React from 'react';
      import { Grid, Card, CardContent, Typography } from '@material-ui/core';

      const products = [/* array de produtos */];

      const ProductsGrid = () => (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardContent>
                  <Typography variant="h5">{product.name}</Typography>
                  <Typography>{product.description}</Typography>
                  <Typography variant="h6">${product.price}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      );

      export default ProductsGrid;
      ```

33. **Alteração Visual: Adicionar Breadcrumbs para Navegação (3 pontos)**
    - **Descrição:** Implementar breadcrumbs para melhorar a navegação do usuário.
    - **Exemplo de Código:**
      ```jsx
      // Breadcrumbs.js
      import React from 'react';
      import { Breadcrumbs, Link, Typography } from '@material-ui/core';

      const BreadcrumbsNav = () => (
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/">Home</Link>
          <Link color="inherit" href="/products">Products</Link>
          <Typography color="textPrimary">Product Name</Typography>
        </Breadcrumbs>
      );

      export default BreadcrumbsNav;
      ```

34. **Funcionalidade: Implementar Lista de Desejos (8 pontos)**
    - **Descrição:** Adicionar funcionalidade para que os usuários possam criar e gerenciar uma lista de desejos.
    - **Exemplo de Código:**
      ```js
      // wishlist.js
      import firebase from 'firebase/app';
      import 'firebase/firestore';

      export const addToWishlist = (userId, productId) => {
        const db = firebase.firestore();
        return db.collection('users').doc(userId).update({
          wishlist: firebase.firestore.FieldValue.arrayUnion(productId)
        });
      };
      ```

35. **Funcionalidade: Implementar Sistema de Avaliação de Produtos (13 pontos)**
    - **Descrição:** Permitir que os usuários avaliem produtos e vejam as avaliações de outros usuários.
    - **Exemplo de Código:**
      ```js
      // reviews.js
      import firebase from 'firebase/app';
      import 'firebase/firestore';

      export const addReview = (productId, review) => {
        const db = firebase.firestore();
        return db.collection('products').doc(productId).collection('reviews').add(review);
      };

      export const getReviews = (productId) => {
        const db = firebase.firestore();
        return db.collection('products').doc(productId).collection('reviews').get();
      };
      ```

36. **Funcionalidade: Adicionar Filtros de Pesquisa Avançada (21 pontos)**
    - **Descrição:** Implementar filtros de pesquisa avançada para facilitar a busca de produtos pelos usuários.
    - **Exemplo de Código:**
      ```jsx
      // AdvancedSearch.js
      import React, { useState } from 'react';
      import { Container, TextField, Button, Grid } from '@material-ui/core';

      const AdvancedSearch = ({ onSearch }) => {
        const [criteria, setCriteria] = useState({ name: '', category: '', priceRange: '' });

        const handleChange = (e) => {
          const { name, value } = e.target;
          setCriteria((prev) => ({ ...prev, [name]: value }));
        };

        const handleSearch = () => {
          onSearch(criteria);
        };

        return (
          <Container>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <TextField label="Name" name="name" fullWidth onChange={handleChange} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField label="Category" name="category" fullWidth onChange={handleChange} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField label="Price Range" name="priceRange" fullWidth onChange={handleChange} />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleSearch}>Search</Button>
              </Grid>
            </Grid>
          </Container>
        );
      };

      export default AdvancedSearch;
      ```

37. **Funcionalidade: Adicionar Suporte para Pagamentos com PayPal (21 pontos)**
    - **Descrição:** Integrar PayPal como método de pagamento na aplicação para atribuição as licenças de publçicidade.
    - **Exemplo de Código:**
      ```js
      // paypalPayment.js
      import React from 'react';
      import { PayPalButton } from 'react-paypal-button-v2';

      const PayPalPayment = ({ amount, onSuccess }) => (
        <PayPalButton
          amount={amount}
          onSuccess={(details, data) => {
            onSuccess(details, data);
          }}
          options={{
            clientId: 'YOUR_PAYPAL_CLIENT_ID'
          }}
        />
      );

      export default PayPalPayment;
      ```

38. **Funcionalidade: Implementar Relatórios de Vendas (34 pontos)**
    - **Descrição:** Adicionar uma seção de relatórios de vendas para análise do desempenho das vendas de publicidade na plataforma.
    - **Exemplo de Código:**
      ```jsx
      // SalesReports.js
      import React, { useEffect, useState } from 'react';
      import { Container, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
      import { getSalesReports } from '../api';

      const SalesReports = () => {
        const [reports, setReports] = useState([]);

        useEffect(() => {
          getSalesReports().then(setReports);
        }, []);

        return (
          <Container>
            <Typography variant="h4">Sales Reports</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reports.map(report => (
                  <TableRow key={report.date}>
                    <TableCell>{report.date}</TableCell>
                    <TableCell>{report.product}</TableCell>
                    <TableCell>{report.quantity}</TableCell>
                    <TableCell>{report.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Container>
        );
      };

      export default SalesReports;
      ```

39. **Funcionalidade: Implementar Testes End-to-End com Cypress (34 pontos)**
    - **Descrição:** Adicionar testes end-to-end utilizando Cypress para garantir a funcionalidade do sistema.
    - **Exemplo de Código:**
      ```js
      // cypress/integration/order_spec.js
      describe('Order Process', () => {
        it('should allow a user to place an order', () => {
          cy.visit('/products');
          cy.get('button').contains('Add to Cart').first().click();
          cy.get('button').contains('Checkout').click();
          cy.get('input[name=address]').type('123 Main St');
          cy.get('input[name=city]').type('New York');
          cy.get('input[name=postalCode]').type('10001');
          cy.get('button').contains('Submit').click();
          cy.url().should('include', '/order-confirmation');
        });
      });
      ```

40. **Funcionalidade: Implementar Sistema de Comentários nos Produtos (55 pontos)**
    - **Descrição:** Adicionar funcionalidade de comentários para os produtos, permitindo interações entre os usuários.
    - **Exemplo de Código:**
      ```jsx
      // Comments.js
      import React, { useState, useEffect } from 'react';
      import { Container, TextField, Button, List, ListItem, ListItemText } from '@material-ui/core';
      import firebase from 'firebase/app';
      import '

firebase/firestore';

      const Comments = ({ productId }) => {
        const [comments, setComments] = useState([]);
        const [newComment, setNewComment] = useState('');
        const db = firebase.firestore();

        useEffect(() => {
          const unsubscribe = db.collection('products').doc(productId).collection('comments').orderBy('timestamp')
            .onSnapshot(snapshot => {
              const commentsData = snapshot.docs.map(doc => doc.data());
              setComments(commentsData);
            });
          return () => unsubscribe();
        }, [db, productId]);

        const addComment = () => {
          db.collection('products').doc(productId).collection('comments').add({
            text: newComment,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });
          setNewComment('');
        };

        return (
          <Container>
            <List>
              {comments.map((comment, index) => (
                <ListItem key={index}>
                  <ListItemText primary={comment.text} />
                </ListItem>
              ))}
            </List>
            <TextField
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment"
              fullWidth
            />
            <Button onClick={addComment} variant="contained" color="primary">Submit</Button>
          </Container>
        );
      };

      export default Comments;
      ```
