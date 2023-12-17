import $ from 'jquery';
import _ from 'lodash';
import './body.css';

export default function createParagraph(text) {
  if (!text) {
    $('body').append('<p id="count"></p>');
  } else {
    $('body').append(`<p>${text}</p>`);
  }
}

createParagraph('Dashboard data for the students');
$('body').append('<button id="clickButton">Click here to get started</button>');
createParagraph('');

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
