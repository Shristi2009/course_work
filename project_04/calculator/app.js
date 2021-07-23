let heldValue= null;
let heldOperation= null;
let nextValue= null;



$('.digits button').click(function(){
    if(nextValue==null){
           nextValue="0";
       }
                                                                   
   let numberText= $(this).text();
   nextValue= nextValue + numberText;
   $('.next-value').text(nextValue);
   updateDisplay();
  // $('.next-value').append(numberText);
  // console.log(numberText);
  // alert(numberText);
});


//$('.digits button').click(showValue);

function showValue(location, value) {
    if(value==null){
            $(location).text('');
        }else{
            $(location).text(Number(value));
        }
 }



function updateDisplay() {
    showValue('.next-value', nextValue);
    showValue('.held-value', heldValue);
}
//----------------------------------------------------------------------
function clearAll(){
    heldValue= null;
    heldOperation= null;
    nextValue= null;
    $('.next-operation').text('');
    updateDisplay();
}

$('.clear-all').click(clearAll);

//----------------------------------------------------------------------

function clearEntry(){
    
    nextValue= null;
    updateDisplay();
}

$('.clear-entry').click(clearEntry);

//----------------------------------------------------------------------








function setHeldOperation(operation) {
    if (heldOperation !== null){
        heldValue=heldOperation(heldValue, nextValue);
    }else if (nextValue !==null && heldOperation==null){
        heldValue=nextValue;
    }
    nextValue=null;
    heldOperation=operation;
}







//-----------------------------------------------------------------------

function add(x, y) {
    addition=Number(x) + Number(y);
    return addition;
}

    
$('.add').click(function(){
    setHeldOperation(add);
    $('.next-operation').text('+');
    updateDisplay();

});

//----------------------------------------------------------------------        


function subtract(x, y) {
    subtraction=Number(x) - Number(y);
     return subtraction;
}
        
    

$('.subtract').click(function(){
    setHeldOperation(subtract);
    $('.next-operation').text('-');
    updateDisplay();
    });

//----------------------------------------------------------------------


function multiply(x, y) {
    multiplication=Number(x) * Number(y);
    return multiplication;
 }
            

$('.multiply').click(function(){       
    setHeldOperation(multiply);
    $('.next-operation').text('*');
    updateDisplay();
    });

//---------------------------------------------------------------------    

function divide(x, y) {
    division=Number(x) / Number(y);
    return division;
}

$('.divide').click(function(){
    setHeldOperation(divide);
    $('.next-operation').text('/');
    updateDisplay();
    });

//-----------------------------------------------------------------------

$('.equals').click(function(){
    setHeldOperation(null);
    $('.next-operation').text('');
    updateDisplay();
      });
    