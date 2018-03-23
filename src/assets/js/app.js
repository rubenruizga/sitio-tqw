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
  projectImg.src = project.previewImg;
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

  var nameCell = document.createElement('div');
  var blockCell = document.createElement('div');
  var centeredCell = document.createElement('div');
  var projectName = document.createElement('h3');
  var name = document.createTextNode(project.name);

  var coverCell = document.createElement('div');
  var coverImg = document.createElement('img');

  var sideCell = document.createElement('div');
  var sideImg = document.createElement('img');

  var conceptCell = document.createElement('div');
  var conceptHeader = document.createElement('h3');
  var conceptText = document.createElement('p');
  var header = document.createTextNode('project.header');
  var text = document.createTextNode('project.text');

  var emptyCell = document.createElement('div');
  var sliderCell = document.createElement('div');
  var slider = document.createElement('div');
  var div = document.createElement('div');
  var div1 = document.createElement('div');
  var div2 = document.createElement('div');
  var img = document.createElement('img');
  var img1 = document.createElement('img');
  var img2 = document.createElement('img');

  reveal.className = 'large reveal';
  reveal.setAttribute("id", project.key);
  reveal.setAttribute("data-reveal", '');

  grid.className = 'grid-x';

  nameCell.className = 'cell small-3';
  blockCell.className = 'block';
  centeredCell.className = 'centered';

  coverCell.className = 'cell small-9';
  coverImg.src = "assets/img/LiUNA-Local-1.png";

  sideCell.className = 'cell small-3';
  sideImg.src = "assets/img/Globe-and-Mail-detail-office-tower.png";

  conceptCell.className = 'projects-concept cell small-9';

  emptyCell.className = 'cell small-3';

  sliderCell.className = 'cell small-9';
  slider.className = project.key;
  img.src = 'assets/img/LiUNA-Local-1.png';
  img1.src = 'assets/img/LiUNA-Local-1.png';
  img2.src = 'assets/img/LiUNA-Local-1.png';

  projectName.append(name);
  centeredCell.append(projectName);
  blockCell.append(centeredCell);
  nameCell.append(blockCell);

  coverCell.append(coverImg);

  sideCell.append(sideImg);

  conceptHeader.append(header);
  conceptText.append(text);
  conceptCell.append(conceptHeader);
  conceptCell.append(conceptText);

  div.append(img);
  div1.append(img1);
  div2.append(img2);
  slider.append(div);
  slider.append(div1);
  slider.append(div2);
  slider.append(div);
  slider.append(div);
  sliderCell.append(slider);

  grid.append(nameCell);
  grid.append(coverCell);
  grid.append(sideCell);
  grid.append(conceptCell);
  grid.append(emptyCell);
  grid.append(sliderCell);
  reveal.append(grid);
  projects.append(reveal);

  $('.' + project.key).slick({
    arrows: false,
    autoplay: true
  });
}
