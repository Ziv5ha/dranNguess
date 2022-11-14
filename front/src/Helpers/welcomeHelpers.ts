export const generateRoomCode = (): string => {
  const bank = '0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += bank[Math.floor(Math.random()) * 10];
  }
  return code;
};
export const generateUsername = () => {
  return `Player${Math.floor(Math.random() * 1000)}`;
};
