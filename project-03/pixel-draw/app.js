const PALETTE = [ 'red' , 'blue' , 'yellow' , 'green' , 'cyan' , 'brown' , 'indigo'    ];
   

    function makeGrid(){
        for(let i=0; i<64; i++){
            const a=$('<div>');
            a.attr('class','cell');
            $('.grid').append(a);  
        }
}

    
    
    makeGrid();

//--------------------------------------------------------------------------------------------------------------------------------------
    function makePalette(){
        const PALETTE = [ 'red' , 'blue' , 'yellow' , 'green' , 'cyan' , 'brown' , 'indigo'    ];
        for(let i=0; i<PALETTE.length; i++){
            const nextColor = PALETTE[i];
            const buttonColor= $('<button>');
            buttonColor.css('background-color',nextColor);
            $('.palette').append(buttonColor);
        }

        $('.palette button').first().addClass('active');
}

    

    makePalette();

//----------------------------------------------------------------------------------------------------------------------------------------


    function onPaletteClick() {
        const PALETTE = [ 'red' , 'blue' , 'yellow' , 'green' , 'cyan' , 'brown' , 'indigo'    ];
        $('.palette button').removeClass('active');
        $(this).addClass('active');
    }
    
   
   
    $('.palette button').click(onPaletteClick);

//----------------------------------------------------------------------------------------------------------------------------------------
    
    function onGridClick(){
         const activeColor =  $('.active').css('background-color');
       //  $(this).css('background-color', activeColor);
         
         
        if($(this).css('background-color')== activeColor){
    
     
           $(this).css('background-color', "");
        }else{
            $(this).css('background-color', activeColor)
        }
    }
    

    $('.grid .cell').click(onGridClick);

      

