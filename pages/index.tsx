import { useState } from 'react';
import { Button, Htag, Paragraph, Tag } from '../components';
import { Rating } from '../components/rating/rating';

export default function Home() {
  const [rating, setRating] = useState(4);
  return (
    <>
      <Htag tag='h1'>Title</Htag>
      <Button appearance='primary' arrow='right'>
        Кнопка
      </Button>
      <Button appearance='ghost' arrow='down'>
        Кнопка
      </Button>
      <Paragraph size='s'>njucneubceu</Paragraph>
      <Paragraph size='l'>njucneubceu</Paragraph>
      <Paragraph>njucneubceu</Paragraph>
      <Tag size='m' color='grey'>
        nuev
      </Tag>
      <Rating rating={rating} setRating={setRating} isEditable={true} />
    </>
  );
}
