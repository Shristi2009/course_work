$('.one button').click(function(){
$('.one span').text('Good Job');
});
$('.two button').click(function(){
$('.two').slideUp(5000);
});
$('.three button').click(function(){
$('.three').append($('<div> <p> with some text</p> </div>'))
});
$('.four button').click(function(){
$('.template-target').html($('template').html());
});
$('.five button').click(function(){
const clone1=$('.five').clone();
$('.prepend-target').prepend(clone1);
});
$('.six button').click(function(){
    $('.six').css('transform','rotate(180deg)');

    });

$('.seven button').click(function(){
    $('.seven').append($('<button class= "disappear"> Disappear</button>'));
   /* let clickedElement = $(this);
    clickedElement.html('<button> Dissapear</button>');
*/
$('.disappear').click(function () {
    let clickedElement = $(this);
    clickedElement.fadeout();
    $('.seven').append(clickedElement);
  })
})