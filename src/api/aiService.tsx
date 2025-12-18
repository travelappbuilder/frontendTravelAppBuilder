export const sendMessageToAi = async (message: string): Promise<string> => {
  // 🔧 MOCK (temporaire)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        "🤖 Je suis encore en phase de test. Bientôt, je pourrai vous aider sur la gestion des agences, trajets et personnels."
      );
    }, 800);
  });
};
