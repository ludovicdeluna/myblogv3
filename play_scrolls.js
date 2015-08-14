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

!function(exports){
  'use strict';
  
  if( !exports.document.getElementById('pageContent') ){
    alert('pas la bonne page');
    return;
  }
  
  exports.navmark = null;
  
  function Viewport(top, height) {
    this.top = exports.scrollY;
    this.height = exports.document.documentElement.clientHeight;
    this.bottom = this.top + this.height;
  };
  
  function Navmark() {
    this.slide  = exports.document.getElementById('pageContent');
    this.nav    = this.slide.getElementsByTagName('nav')[0];
    this.scrollY  = exports.scrollY;
    this.attachEvents();
  };
  
  Navmark.prototype.attachEvents = function(){
    exports.document.onscroll = function(event){
      this.scrollEvent(event);
      this.scrollY = exports.scrollY;
    }.bind(this);
  };
  
  Navmark.prototype.isScrollDown = function(){
    return exports.scrollY > this.scrollY
  }
  
  Navmark.prototype.scrollEvent = function(e){
    var viewport = new Viewport();

    var slide = this.slide.getBoundingClientRect();
    if( viewport.height - 30 > slide.height ) {
      console.log('Slide too small. Nothing to move');
      return;
    }
    
    var nav = this.nav.getBoundingClientRect();
    if( slide.height - 30 <= nav.height ) {
      console.log('Nav has no space to move into slide');
      return;
    }
    
    var isBigNav = nav.height > viewport.height - 30;
    
    if( this.isScrollDown() ){
      if( isBigNav ) {
        console.log( 'Big Nav !' );
      } else {
        if( exports.scrollY + nav.height + 30 >= exports.scrollY + slide.bottom ) {
          this.nav.style.top = slide.height - nav.height - 30 + "px";
          return;
        } 
        if( nav.top < 0 ) {
          this.nav.style.top = (
            exports.scrollY -
            (exports.scrollY + slide.top) + "px"
          );
        }
      }
    } else {
      if( isBigNav ) {
        console.log( 'Big Nav !' );
      } else {
        if( exports.scrollY + viewport.height - nav.height - 30 <= exports.scrollY + slide.top ) {
          this.nav.style.top = 0;
          return;
        }
        if( (nav.bottom - viewport.height) * -1 < 30 ) {
          this.nav.style.top = (
            exports.scrollY + viewport.height - nav.height - 30 -
            (exports.scrollY + slide.top) + "px"
          );
        }
      }
    }
    
    /**
    var slide = {
      top: slide.top + viewport.top ,
      bottom: slide.bottom + viewport.top,
      height: slide.height,
    }
    **/
  
    
  };
  
  
  exports.navmark = new Navmark;
}(window)





/**
!function(exports){
  'use strict';
  
  function Navmark(track){
    this.track = track || document.getElementById('track');   
    this.nav = this.track ? this.track.getElementsByTagName('nav')[0] : null;
    this.footer = this.track ? this.track.getElementsByTagName('footer')[0] : null;

    if( !this.nav ) throw 'Navmark not instantiated';   
    this.attachEvents();
  };
  
  Navmark.prototype.attachEvents = function(){
    this.windowPageY = exports.pageYOffset;
    this.isScrolling = false;
    exports.onscroll = function(e){ this.scrollEvent(e) }.bind(this);
  };
  
  Navmark.prototype.scrollEvent = function(e){
    if( this.nav.className !== 'stick-on-scroll' || this.isScrolling ) return;

    this.isScrolling = true;
       
    var viewportScrollTop = exports.scrollY     || exports.document.documentElement.scrollTop ;
    var viewportHeight    = exports.innerHeight || exports.document.documentElement.clientHeight;
    var trackPosY         = viewportScrollTop + Math.round( this.track.getBoundingClientRect().top, 2 );
    var trackHeight       = this.track.clientHeight - Math.round(this.footer.getBoundingClientRect().height, 2) ;
    var navHeight         = Math.round(this.nav.clientHeight, 2);
    
    var posTop    = viewportScrollTop - trackPosY;
    var posBottom = posTop + viewportHeight - navHeight - 30;
    
    if( this.isScrollDown(e) ) {
      if( posTop > 0 ) {
        if( posTop + navHeight < trackHeight ) this.nav.style.top = posTop + "px";
      } else {
        this.nav.style.top = 0;
      }
    } else {
      if( posBottom > 0 && posBottom + navHeight < trackHeight ) this.nav.style.top = posBottom + "px";
    }
    
    this.isScrolling = false;
  };
  
  Navmark.prototype.isScrollDown = function(e){
    var windowPageY = this.windowPageY;
    this.windowPageY = exports.scrollY || exports.document.body.scrollTop;
    
    return e.pageY > windowPageY;
  };
   
  
  exports.Navmark = Navmark;
}(window);

!function(exports){
  exports.navmark = new Navmark( document.getElementById('pageContent') );
  console.log(navmark);
}(window);
**/
