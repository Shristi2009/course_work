let red;
let green;
let blue;

function updateValues(){
    red=$('#red').val();
    green=$('#green').val();
    blue=$('#blue').val();                                             
}
function updatePage(){
    $('.red-value').text(red);
    $('.green-value').text(green);
    $('.blue-value').text(blue);

    let rgbColor=`rgb(${red}, ${green}, ${blue})`;
    $('.preview').css('background-color',rgbColor);
}

function updateAll(){
    updateValues();
    updatePage();
}

updateAll();
$('.controls input').on('input', updateAll);