import ImportContacts from '@mui/icons-material/ImportContacts';
import { useNavigate } from 'react-router-dom';
import { Button, useTheme } from '@mui/material';

const LogoButton = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate('/')} sx={{ color: 'white', fontSize: 18 }}>
      <div
        style={{
          display: 'grid',
          columnGap: 12,
          gridTemplateColumns: 'auto auto',
        }}
      >
        <div style={{ paddingTop: 1 }}>
          <ImportContacts />
        </div>
        <span
          style={{
            ...(theme.typography as any).mPlusRounded,
            color: 'white',
            whiteSpace: 'nowrap',
          }}
        >
          原田日語小房
        </span>
      </div>
    </Button>
  );
};

export default LogoButton;
