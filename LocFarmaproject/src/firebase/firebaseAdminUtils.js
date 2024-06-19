// Importando o Firebase Admin SDK
const admin = require('firebase-admin');

// Caminho para o arquivo serviceAccountKey.json
const serviceAccount = require('LocFarmaproject\src\firebase\service.AccountKey.json');

// Inicializando o Firebase Admin SDK com as credenciais do serviceAccountKey.json
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Referência para o Firestore (opcional, se você precisar atualizar outros dados além dos Custom Claims)
const db = admin.firestore();

// Função para atribuir privilégios administrativos a um usuário pelo UID
async function setAdminRole(uid) {
  try {
    // Definindo Custom Claims para fazer o usuário ser um administrador
    await admin.auth().setCustomUserClaims(uid, { admin: true });

    // Atualizando o documento do usuário no Firestore (opcional)
    await db.collection('users').doc(uid).update({
      isAdmin: true
    });

    console.log(`Usuário com UID ${uid} agora é um administrador.`);
  } catch (error) {
    console.error('Erro ao definir privilégios administrativos:', error);
  }
}

// Exemplo de uso: chamando a função para definir um usuário como administrador
setAdminRole('y0rqEb65XVeVgva3p30Vm2aPU392');
