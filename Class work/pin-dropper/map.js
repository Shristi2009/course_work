 function onMapclick(event){
     
     const appElement = $(this);
     const target = $(event.target);
     const userPressedShiftKey = event.shiftKey;
     if(userPressedShiftKey && target.hasClass('pin')){
         target.remove();

     }else if(!target.hasClass('pin')){
        const pinX = event.offsetX;
        const pinY = event.offsetY;
       let newElement= $('<div class="pin">');
       newElement.css('left',pinX).css('top',pinY);
        appElement.append(newElement);
     }
 }
 
 $('.app').click(onMapclick);
     
 
    
 