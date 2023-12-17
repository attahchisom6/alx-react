import image from './image.png';

export default function () => {
  const img = document.createElement('img');
  img.src = image;
  document.body.appendChild(img);
}
