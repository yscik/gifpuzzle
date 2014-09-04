import {px} from "./utils";

function Grab(container)
{
    var _g = this;
    _g.on = {
      released: function(element, position) { }
    };
    
    setupEventListeners();
    
    function setupEventListeners()
    {
        document.addEventListener('mousedown', grab);
        document.addEventListener('touchstart', grab);
        document.addEventListener('mouseup', release);
        document.addEventListener('touchend', release);
        document.addEventListener('touchmove', move);
        document.addEventListener('mousemove', move);
    }

    var grabbedElement;
    var lastPos = null;

    function grab(e)
    {
      var target = e.target;
      while(target && target.classList && !target.classList.contains('grab'))
      {
        target = target.parentNode;
      }
      if(target.parentNode)
      {
        grabbedElement = target;
        grabbedElement.classList.add('grabbed');
        lastPos = null;
      }
    }
    
    function release(e)
    {
      if(!grabbedElement) return;
    
      //snapToGrid(grabbedElement);

      if(lastPos) _g.on.released(grabbedElement, lastPos);

      grabbedElement.classList.remove('grabbed');
      grabbedElement = null;
      
    }
    
    function getEventPos(e)
    {
      var p = e.touches ? e.touches[0] : e;
      return {
        x: p.clientX - container.offsetLeft,
        y: p.clientY - container.offsetTop
      };
    }
    
    function move(e)
    {
      if(grabbedElement)
      {
        var p = getEventPos(e);
        e.preventDefault();
        lastPos = p;
    
        grabbedElement.style.left = px(p.x);
        grabbedElement.style.top = px(p.y);
      }
    }
}

export default Grab;