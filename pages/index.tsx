import { Button, Htag, Paragraph, Tag } from '../components';

export default function Home() {
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
      <Tag size='m' color='grey'>nuev</Tag>
    </>
  );
}
