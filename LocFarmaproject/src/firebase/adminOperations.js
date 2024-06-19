const admin = require('firebase-admin');
const serviceAccount = require('./firebase/serviceAccountKey.json');
const { setAdminCustomClaim } = require('./customClaim');

// Inicializa o Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Exemplo de chamada para definir um usuário como administrador
const uid = 'y0rqEb65XVeVgva3p30Vm2aPU392'; // Substitua pelo seu UID específico
setAdminCustomClaim(uid)
  .then(() => console.log(`Usuário ${uid} definido como administrador.`))
  .catch(error => console.error('Erro ao definir administrador:', error));
