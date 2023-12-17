import $ from 'jquery';
import _ from 'lodash';
import '../css/main.css';

export default function createParagraph(text) {
  if (!text) {
    $('body').append('<p id="count"></p>');
  } else {
    $('body').append(`<p>${text}</p>`);
  }
}

createParagraph('Holberton Dashboard');
createParagraph('Dashboard data for the students');
$('body').append('<button id="clickButton">Click here to get started</button>');
createParagraph('');
createParagraph('Copyright - Holberton School');

function updateCounter() {
  let count = 0;
  return function () {
    count++;
    $('#count').text(`${count} clicks on the button`);
  }
}

const debounce = _.debounce(updateCounter(), 1000);
const button = $('#clickButton');

button.on('click', debounce);
