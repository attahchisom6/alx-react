// import JSDOM from 'jsdom';
// const { window } = new JSDOM('');
const $ = require('jquery') // ( window );

export default function createParagraph(text) {
  $('body').append(`<p>${text}</p>`);
};

createParagraph("Holberton Dashboard");
createParagraph("Dashboard data for the students");
createParagraph("Copyright - Holberton School");
