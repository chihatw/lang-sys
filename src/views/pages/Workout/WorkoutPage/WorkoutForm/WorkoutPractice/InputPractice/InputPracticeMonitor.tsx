import { Backspace } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { removeLastMora } from './services/removeLastMora';
import SentencePitchLine from '../../../../../../components/SentencePitchLine';

const InputPracticeMonitor = ({
  input,
  setInput,
}: {
  input: string;
  setInput: (input: string) => void;
}) => {
  const handleBackSpace = () => {
    const updatedInput = removeLastMora(input);
    setInput(updatedInput);
  };
  return (
    <div
      style={{
        display: 'flex',
        height: 40,
        border: '1px solid #ccc',
        padding: 8,
        alignItems: 'center',
        borderRadius: 4,
        marginBottom: 16,
        justifyContent: 'space-between',
      }}
    >
      <div style={{ flexBasis: 40 }} />
      <div
        style={{
          flexBasis: 120,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <SentencePitchLine pitchStr={input} />
      </div>
      <IconButton onClick={handleBackSpace}>
        <Backspace />
      </IconButton>
    </div>
  );
};

export default InputPracticeMonitor;
