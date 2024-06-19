const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// Inicializa o Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Função para definir custom claims de administrador para um usuário
async function setAdminCustomClaim(uid) {
  try {
    // Define o custom claim 'admin' para o usuário
    await admin.auth().setCustomUserClaims(uid, { admin: true });
    console.log(`Custom claim 'admin' definido com sucesso para o usuário ${uid}`);

    // Atualiza o documento do usuário no Firestore para refletir que ele é administrador (opcional)
    await admin.firestore().collection('users').doc(uid).update({
      isAdmin: true,
    });

    console.log(`Usuário com UID ${uid} agora é um administrador no Firestore.`);
  } catch (error) {
    console.error('Erro ao definir custom claim:', error);
  }
}

module.exports = {
  setAdminCustomClaim,
};
