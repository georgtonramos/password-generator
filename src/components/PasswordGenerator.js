import React, { useState } from 'react';
import { Button, FormControlLabel, Checkbox, TextField, Box, FormHelperText } from '@mui/material';

const PasswordGenerator = () => {
  const [passwordLength, setPasswordLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSpecialCharacters, setIncludeSpecialCharacters] = useState(false);
  const [includeUppercaseLetters, setIncludeUppercaseLetters] = useState(false);
  const [numbersOnly, setNumbersOnly] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [error, setError] = useState("");

  const handleGeneratePassword = () => {
    // Validação de entrada
    if (passwordLength < 4 || passwordLength > 128) {
      setError('O tamanho da senha deve estar entre 4 e 128.');
      return;
    }

    if (!(includeNumbers || includeSpecialCharacters || includeUppercaseLetters) && !numbersOnly) {
      setError('Selecione pelo menos uma opção: números, caracteres especiais, letras maiúsculas ou somente números.');
      return;
    }

    setError(''); // Limpa o erro anterior

    let characterList = 'abcdefghijklmnopqrstuvwxyz';
    if (numbersOnly) {
      characterList = '0123456789';
    } else {
      if (includeUppercaseLetters) characterList += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      if (includeNumbers) characterList += '0123456789';
      if (includeSpecialCharacters) characterList += '!@#$%^&*()';
    }

    let password = '';
    let array = new Uint32Array(passwordLength);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < passwordLength; i++) {
      password += characterList[array[i] % characterList.length];
    }

    setGeneratedPassword(password);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%', // Faz o box ocupar toda a largura disponível
        maxWidth: 300, // Limita a largura máxima a 300px
        margin: 'auto',
        mt: 5,
        p: 2,
        border: '1px solid #ddd',
        borderRadius: 2
      }}
    >
      <TextField
        type="number"
        label="Tamanho da senha"
        value={passwordLength}
        onChange={(e) => setPasswordLength(Number(e.target.value))}
      />

      <FormControlLabel
        control={<Checkbox checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} disabled={numbersOnly} />}
        label="Incluir números"
      />

      <FormControlLabel
        control={<Checkbox checked={includeSpecialCharacters} onChange={() => setIncludeSpecialCharacters(!includeSpecialCharacters)} disabled={numbersOnly} />}
        label="Incluir caracteres especiais"
      />

      <FormControlLabel
        control={<Checkbox checked={includeUppercaseLetters} onChange={() => setIncludeUppercaseLetters(!includeUppercaseLetters)} disabled={numbersOnly} />}
        label="Incluir letras maiúsculas"
      />

      
     <FormControlLabel
        control={
          <Checkbox
            checked={numbersOnly}
            onChange={() => {
              setNumbersOnly(!numbersOnly);
              if (!numbersOnly) {
                setIncludeNumbers(false);
                setIncludeSpecialCharacters(false);
                setIncludeUppercaseLetters(false);
              }
            }} /> }
      
        label="Somente números"
      />

      <Button variant="contained" onClick={handleGeneratePassword}>Gerar senha</Button>

      <FormHelperText error>{error}</FormHelperText>

      <TextField
        label="Senha gerada"
        value={generatedPassword}
        InputProps={{
          readOnly: true,
        }}
      />
    </Box>
  );
};

export default PasswordGenerator;