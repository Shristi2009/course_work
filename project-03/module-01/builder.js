const a=$('<h3>');
a.text('Hello, world');
$('.slo-mo').append(a);
const para=$('<p>');
para.html('<b>This</b> is my text');
$('.slo-mo').append (para);
const image=$('<img>');
image.attr('src','http://placeimg.com/640/480/nature?1');
$('.slo-mo').append(image);
$('.normal-speed').append($('<h3>').text('Hello, world'));
$('.normal-speed').append($('<p>').html('<b>This</b> is my text'));
$('.normal-speed').append($('<img>').attr('src','http://placeimg.com/640/480/nature?1'));
$('.rewind').prepend($('<h3>').text('Hello, world'));
$('.rewind').prepend($('<p>').html('<b>This</b> is my text'));
$('.rewind').prepend($('<img>').attr('src','http://placeimg.com/640/480/nature?1'));
$('.turbo').html(`<h3>Hello, world </h3>
<p><b>This</b> is my text </p>
<img src="http://placeimg.com/640/480/nature?1"/>`);
