import $ from 'jquery';
import whatInput from 'what-input';
import firebase from 'firebase';
import slick from 'slick-carousel';
// Initialize Firebase
var config = {
  apiKey: "AIzaSyD6to7A2fqVY_MGoy29U-c9HKhXXWwaYAA",
  authDomain: "benijan-e382e.firebaseapp.com",
  databaseURL: "https://benijan-e382e.firebaseio.com",
  projectId: "benijan-e382e",
  storageBucket: "",
  messagingSenderId: "930711717630"
};
firebase.initializeApp(config);
window.$ = $;

import Foundation from 'foundation-sites';
// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';




//TopBar
function dropIt() {
    document.getElementById("mobile-menu").style.top='0';
}
function pickIt() {
    document.getElementById("mobile-menu").style.top='-100vh';
}
document.getElementById("mobile-menu-button").addEventListener ("click", dropIt, false);
document.getElementById("mobile-menu-button-close").addEventListener ("click", pickIt, false);
document.getElementById("mobile-menu-item-1").addEventListener ("click", pickIt, false);
document.getElementById("mobile-menu-item-2").addEventListener ("click", pickIt, false);
document.getElementById("mobile-menu-item-4").addEventListener ("click", pickIt, false);

firebase.database().ref('/sites/tqw/portfolio').once('value').then(function(snapshot) {
  var projects = snapshot.val();
  Object.keys(projects).map(function(key, index) {
    var project = projects[key];
    project['key'] = key;
    createPortfolio(project);
    createProjects(project);

  });
  $(document).foundation();
});
//Portfolio
function createPortfolio(project) {
  var portfolio = document.getElementById("portfolio-projects");
  var cell = document.createElement('div');
  var portfolioItem = document.createElement('div');

  var portfolioItemImg = document.createElement('div');
  var projectImg = document.createElement('img');

  var portfolioItemDescription = document.createElement('div');
  var projectName = document.createElement('h5');
  var projectType = document.createElement('h6');

  cell.className = 'cell medium-6 large-4';
  portfolioItem.className = 'portfolio-item';
  portfolioItemImg.className = 'portfolio-item-img';
  portfolioItemDescription.className = 'portfolio-item-description';

  var type = document.createTextNode(project.type);
  var name = document.createTextNode(project.name);

  projectName.append(name);
  projectType.append(type);
  projectImg.src = project.img.preview;
  projectImg.setAttribute('data-open', project.key);

  portfolioItemImg.append(projectImg);
  portfolioItemDescription.append(projectType);
  portfolioItemDescription.append(projectName);
  portfolioItem.append(portfolioItemImg);
  portfolioItem.append(portfolioItemDescription);
  cell.append(portfolioItem);
  portfolio.append(cell);
}

//projects
function createProjects(project) {
  var projects = document.getElementById("projects");

  var reveal = document.createElement('div');
  var grid = document.createElement('div');

  var closeButton = document.createElement('button');
  var closeSpan = document.createElement('span');
  var closeText = document.createTextNode('X');

  var logoCell = document.createElement('div');

  var coverCell = document.createElement('div');
  var coverImg = document.createElement('img');

  var sideCell = document.createElement('div');
  var sideImg = document.createElement('img');

  var conceptCell = document.createElement('div');
  var conceptContainer = document.createElement('div');
  var conceptHeader = document.createElement('h3');
  var conceptText = document.createElement('p');
  var header = document.createTextNode(project.header);
  var text = document.createTextNode(project.description);

  var emptyCell = document.createElement('div');
  var sliderCell = document.createElement('div');
  var slider = document.createElement('div');

  reveal.className = 'large reveal';
  reveal.setAttribute("id", project.key);
  reveal.setAttribute("data-reveal", '');

  closeButton.className = 'close-button';
  closeButton.setAttribute("data-close", '');
  closeButton.setAttribute("type", 'button');
  closeSpan.setAttribute("aria-hidden", 'true');

  grid.className = 'grid-x';

  logoCell.className = 'projects-logo cell small-3';

  coverCell.className = 'cell small-9';
  coverImg.src = project.img.cover;

  sideCell.className = 'cell small-3';
  sideImg.src = project.img.side;

  conceptCell.className = 'projects-concept cell small-9';

  emptyCell.className = 'cell small-3';

  sliderCell.className = 'projects-slider cell small-9';
  slider.className = project.key;

  closeSpan.append(closeText);
  closeButton.append(closeSpan);

  coverCell.append(coverImg);

  sideCell.append(sideImg);

  conceptHeader.append(header);
  conceptText.append(text);
  conceptContainer.append(conceptHeader);
  conceptContainer.append(conceptText);
  Object.keys(project.data).map(function(key, index) {
    var p = document.createElement('p');
    p.className = 'projects-concept-data';
    var label = project.data[key].label;
    var value = project.data[key].value;
    var foo = document.createTextNode(label + ': ' + value);
    p.append(foo);
    conceptContainer.append(p);
  });
  conceptCell.append(conceptContainer);

  Object.keys(project.img.slider).map(function(key, index) {
    var div = document.createElement('div');
    var img = document.createElement('img');
    img.src = project.img.slider[key];
    div.append(img);
    slider.append(div);
  });
  sliderCell.append(slider);

  grid.append(logoCell);
  grid.append(coverCell);
  grid.append(sideCell);
  grid.append(conceptCell);
  grid.append(emptyCell);
  grid.append(sliderCell);
  reveal.append(closeButton);
  reveal.append(grid);
  projects.append(reveal);

  $('.' + project.key).slick({
    arrows: false,
    autoplay: true,
    dots: true
  });
}
