import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom'


export default function LinkCard({ image, title, description, buttonTitle, buttonLink }) {
  const navigate = useNavigate()
  
  return (
    <Card sx={{ maxWidth: 345, margin: '20px' }}>
      <CardMedia
        component="img"
        height="230"
        image={image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" minHeight={'100px'}>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant='contained' fullWidth onClick={() => {navigate(buttonLink)}}>
          {buttonTitle}
        </Button>
      </CardActions>
    </Card>
  );
}