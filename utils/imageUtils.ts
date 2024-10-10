export const processImageFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Falha ao processar a imagem"));
      }
    };
    reader.onerror = () => {
      reject(new Error("Erro ao ler o arquivo"));
    };
    reader.readAsDataURL(file);
  });
};
