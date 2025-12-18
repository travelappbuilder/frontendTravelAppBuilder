export const sendMessageToAi = async (message: string): Promise<string> => {
  console.log(message); // 👈 ajoute ceci pour utiliser la variable
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        "🤖 Je suis encore en phase de test. Bientôt, je pourrai vous aider sur la gestion des agences, trajets et personnels."
      );
    }, 800);
  });
};
