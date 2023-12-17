export default ((text = "Hello Another WebPack!") => {
  const element = document.createElement('h1');
  element.innerHtml = text;
  return element;
});
