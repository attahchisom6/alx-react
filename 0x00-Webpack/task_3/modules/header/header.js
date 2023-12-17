import $ from 'jquery';
import './header.css';
const image = require('../../assets/holberton-logo.jpg');

$('body').append('<header></header>');
$('header').append('<div id="logo"><img src="' + image + '" alt="Holberton logo"></div>', '<h1>Holberton Dashboard</h1>');

console.log('Init header');
