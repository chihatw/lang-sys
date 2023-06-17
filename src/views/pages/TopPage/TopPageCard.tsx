import { Card, CardContent, CardMedia, useTheme } from '@mui/material';

const TopPageCard = ({
  label,
  imageURL,
  handleClick,
}: {
  label: string;
  imageURL: string;
  handleClick: () => void;
}) => {
  const theme = useTheme();
  return (
    <Card
      sx={{ display: 'flex', cursor: 'pointer', height: 160 }}
      onClick={handleClick}
    >
      <CardMedia
        component='img'
        sx={{ width: 160, userSelect: 'none' }}
        image={imageURL}
      />
      <CardContent sx={{ flexGrow: 1, marginBottom: -1 }}>
        <div
          style={{
            ...(theme.typography as any).mPlusRounded300,
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 16,
          }}
        >
          <div style={{ userSelect: 'none' }}>{label}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopPageCard;
