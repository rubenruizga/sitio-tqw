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


$(document).foundation();

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

//Portfolio
firebase.database().ref('/sites/tqw/portfolio').once('value').then(function(snapshot) {
  var projects = snapshot.val();
  var portfolio = document.getElementById("portfolio-projects");
  Object.keys(projects).map(function(key, index) {
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

    var type = document.createTextNode(projects[key].type);
    var name = document.createTextNode(projects[key].name);

    projectName.append(name);
    projectType.append(type);
    projectImg.src = projects[key].previewImg;

    portfolioItemImg.append(projectImg);
    portfolioItemDescription.append(projectType);
    portfolioItemDescription.append(projectName);
    portfolioItem.append(portfolioItemImg);
    portfolioItem.append(portfolioItemDescription);
    cell.append(portfolioItem);
    portfolio.append(cell);
  });
  //projects
  $(document).ready(function(){
    $('.slider1').slick({
      arrows: false,
      autoplay: true
    });
    $('.slider2').slick({
      arrows: false,
      autoplay: true
    });
    var foo = $('#foo');
    foo.on('click', function(e){
    	$('.slider1').slick('slickNext');
    });
  });

});
