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
          {label.split('').map((letter, index) => (
            <span
              key={index}
              style={{
                userSelect: 'none',
                // paddingRight: label.split('')[index + 1] ? '1em' : 0,
              }}
            >
              {letter}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopPageCard;
