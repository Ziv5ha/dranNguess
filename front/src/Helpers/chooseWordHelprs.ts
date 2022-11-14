import randomWord from 'random-words';

export const chooseWords = () => {
  let easy = '';
  let medium = '';
  let hard = '';
  while (!(easy && medium && hard)) {
    const [word] = randomWord(1);
    if ((word.length === 3 || word.length === 4) && !easy) easy = word;
    if (word.length === 5 && !medium) medium = word;
    if (word.length >= 6 && !hard) hard = word;
  }
  return { easy, medium, hard };
};
