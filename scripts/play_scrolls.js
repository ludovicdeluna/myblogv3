
!function(exports){
  'use strict';
  
  var yPosBeforeScroll = 0;
  function isScrollDown() {
    return yPosBeforeScroll < exports.scrollY;
  }
  
  function Viewport() {
    this.top = exports.scrollY;
    this.height = exports.document.documentElement.clientHeight;  
    this.bottom = this.top + this.height;
  }
  
  function VisualElmWith(viewport){
    var VisualElm = function(element){
      this.element = element;
      this.refresh();
    };
    
    VisualElm.prototype.refresh = function(){
      var elm = this.element.getBoundingClientRect();      
      this.elmdebug = elm;
      this.bottomFromTop = elm.bottom;
      this.top = elm.top;
      this.height = elm.height;
      return true;
    };
       
    VisualElm.prototype.absTop = function(){
      return viewport.top + this.top;
    };
    
    VisualElm.prototype.absBottom = function(){
      return viewport.top + this.bottomFromTop ;
    };
    
    VisualElm.prototype.bottom = function(){
      return this.absBottom() - viewport.bottom;
    };
    
    return VisualElm;
  }
  
  function Navmark() {
    yPosBeforeScroll = exports.scrollY;
    this.nav = document.getElementsByTagName('nav')[0];
    this.slide = this.nav.parentNode;
    this.attachEvents();
  }
  
  Navmark.prototype.attachEvents = function(){
    exports.document.onscroll = function(event){
      this.scrollEvent(event);
      yPosBeforeScroll = exports.scrollY;
    }.bind(this);
  };
  
  Navmark.prototype.scrollEvent = function(e){
    var viewport = new Viewport;
    var VisualElm = new VisualElmWith( viewport );
    
    var nav = new VisualElm(this.nav);
    var slide = new VisualElm(this.slide);
    

    if( slide.top < 0 ) {
      if( nav.height >= viewport.height ) {
        if( isScrollDown() ){
          if( slide.bottom() > 0 ) {
            if( nav.element.style.position == "fixed" ) {
              console.log( slide.elmdebug );
              return;
            }
            if( nav.bottom() < 0 ) {
              nav.element.style.position = "fixed";
              nav.element.style.bottom = "0";
              nav.element.style.top = "";
            }
          }
        } else {
          if( nav.element.style.position == "absolute" ) return;
          nav.element.style.position = "absolute";
          nav.element.style.bottom = "";
          nav.element.style.top = viewport.top - (nav.height - viewport.height) - (viewport.top + slide.top) + "px";          
        }
      }
    }
    
    yPosBeforeScroll = exports.scrollY;
  };
  
  exports.onload = function(){
    exports.navmark = new Navmark;
    console.log('Script loaded.');
  };

  function testme(){
    var viewport = new Viewport;
    var VisualElm = new VisualElmWith(viewport);
    
    var navElm = new VisualElm(nav);
    
    var slide = nav.parentNode;
    var slideElm = new VisualElm(slide);
    
    return {slide: slideElm, nav: navElm, viewport: viewport};
  }

}(window)






!function(exports){
  'use strict';

  function Viewport(top, height) {
    this.top = exports.scrollY;
    this.height = exports.document.documentElement.clientHeight;
    this.bottom = this.top + this.height;
  }

  function absTop(elm) {
    return exports.scrollY + elm.top;
  }

  function absBottom(elm) {
    return exports.scrollY + elm.bottom;
  }

  function Navmark() {
    console.log('loading...');
    this.slide  = exports.document.getElementById('pageContent');
    this.nav    = this.slide.getElementsByTagName('nav')[0];
    this.scrollY  = exports.scrollY;
    this.attachEvents();
    console.log('loaded.');
  }

  Navmark.prototype.isScrollDown = function(){
    return exports.scrollY > this.scrollY
  };

  Navmark.prototype.attachEvents = function(){
    exports.document.onscroll = function(event){
      this.scrollEvent(event);
      this.scrollY = exports.scrollY;
      console.log(exports.scrollY);
    }.bind(this);
  };

  Navmark.prototype.scrollEvent = function(e){
    var viewport = new Viewport();
    var slide = this.slide.getBoundingClientRect();
    var nav = this.nav.getBoundingClientRect();

    if( this.isScrollDown ){
      console.log( slide.top + " < " + 0  + " && " + absTop(slide) + nav.height + " > " + viewport.bottom )
      if( nav.top < viewport.top && absBottom(nav) >= viewport.bottom ){
        //this.nav.style.bottom = "0px";
        //this.nav.style.position = "fixed";
        return;
      }
    } else {
      console.log('up');
    }
  };


}(window)

