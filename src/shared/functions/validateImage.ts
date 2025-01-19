export const validateImage = (srcImage: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = srcImage;

    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
  });
};
