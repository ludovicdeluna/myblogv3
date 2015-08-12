/*
 * Ceci est une ardoise JavaScript.
 *
 * Saisissez du code JavaScript, puis faites un clic droit ou sélectionnez à partir du menu Exécuter :
 * 1. Exécuter pour évaluer le texte sélectionné (Ctrl+R),
 * 2. Examiner pour mettre en place un objet Inspector sur le résultat (Ctrl+I), ou,
 * 3. Afficher pour insérer le résultat dans un commentaire après la sélection. (Ctrl+L)
 */

/*
 * Mon element actuel est repositionné par rapport à la position top de la fenêtre,
 * mais il est dans un div (position relative) et donc le positionnement se fait
 * par rapport à lui. Il faut trouver sa position au parent pour faire les bons calculs
 */

!function(){
  'use strict';
  var nav = document.getElementsByTagName('nav')[0];
  var navContainer = document.getElementById('pageContent');
  var position = {Y: window.pageYOffset};
  var doc = document.documentElement;
  
  var height = Math.max(doc.clientHeight, window.innerHeight || 0)
  
  nav.style.position = "absolute";
  nav.style.right = "30px";
  
  var isScrollDown = function(e, position){
    var result = e.pageY > position.Y;
    position.Y = window.pageYOffset;
    var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
    return result;
  }
  
  var blockBottomNav = function(){
    var bottom = nav.getBoundingClientRect().bottom;
    if( bottom < height ) {
      var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
      nav.style.top = (top - navContainer.offsetTop) + "px";
      console.log(nav.style);
    }
    /**
    if( bottom > height ) {
      console.log('dépasse');
    } else {
      console.log('pas encore');
    }
    **/
  }
   
  document.onscroll = function(e){ (isScrollDown(e, position) ? blockBottomNav() : false) };
  document.onscroll = null;
  console.log("loaded");
  
  function goUp(){
    var containerTop = document.getElementById("pageContent").offsetTop;
    var pageTop = window.pageYOffset;  
    document.getElementsByTagName('nav')[0].style.top = (pageTop - containerTop) + "px";    
  }
  
  function goDown(){
    
    var windowTopY      = window.pageYOffset;
    var containerTopY   = document.getElementById("pageContent").offsetTop;
    var containerHeight = document.getElementById("pageContent").clientHeight;
    var navHeight       = document.getElementsByTagName('nav')[0].clientHeight;
    
    var windowHeight = document.documentElement.clientHeight;
    var navHeight = ( document.getElementsByTagName('nav')[0]
                      .getBoundingClientRect().height );
    var pos = (windowTopY - containerTopY) ;
    document.getElementsByTagName('nav')[0].style.top = pos + "px";
  }
  
  function oldgoUpNew(){
    var windowY   = window.pageYOffset;
    var container = document.getElementById("pageContent").getBoundingClientRect();
    var nav       = document.getElementsByTagName("nav")[0].getBoundingClientRect();
    
    var pos = windowY - container.Top;
    console.log(container);
  }
  
  function goUpNew(){
    var nav       = document.getElementsByTagName("nav")[0];
    var container = document.getElementById("pageContent");
    var position  = {Y: window.pageYOffset};
    document.onscroll = function(e){
      var scrollY = document.documentElement.scrollTop || document.body.scrollTop ;
      var viewBottom = document.documentElement.clientHeight || document.body.clientHeight
      var tabTop  = Math.round( container.getBoundingClientRect().top, 2) + scrollY ;
      var posTop = scrollY - tabTop;
      var posBottom = posTop + viewBottom - nav.getBoundingClientRect().height ;
      
      if( isScrollDown(e, position) ) {
        if( posTop > 0){
          nav.style.top = posTop + "px";      
        }
      } else {
        if( posBottom > 0) {
          nav.style.top = posBottom - 30 + "px";
        }
      }
    }
    
    /**    
    var nav = function(navigation){
      return  { object: navigation,
                bounds: navigation.getBoundingClientRect(),
                top: navigation.getBoundingClientRect().top + scrollY
              };
    }(document.getElementsByTagName("nav")[0]);
    **/
    
    //console.log(posBottom);
    
    /**
    nav.bounds  = nav.object.getBoundingClientRect();
    var nav     = document.getElementsByTagName("nav")[0];
    var sidebar = document.getElementById("pageContent");
    var navPos  = nav.getBoundingClientRect();
    
    var   = navPos.top + scrollY;
    console.log( pos );
    **/
    
  }
  
  goUpNew();
  
  
  
}();