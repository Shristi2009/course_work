

$('.task-input button').click(function(event) {
    // const properInput = $(event.target).parent().find('input');
    const inputVal = $('.task-input input').val();
    // append an li with the value of input
    // val to .task-list do this to tasklist
    // $('<h1>hi holt</h1>');
    if(inputVal.length !== 0) {
        // make the li to append
        const myListItem = $('<li></li>');
        myListItem.text(inputVal);
        const theListItem = '<li>' + inputVal + '</li>';
        $('.task-list').append(myListItem);
        // clear out the input
        $('.task-input input').val('');
    }
});
$('.decider button').click(function(e) {
    $('.status').toggleClass('active');
    if ($('span.status').hasClass('active')){
        $('.status').text('on')
       // $('.decider button').text('turn OFF')
       $(this).text('turn Ooff')
       $('.decider img').attr('src','https://media.giphy.com/media/szmSyB2PnehgY/giphy.gif')
    }else{
        $('.status').text('off')
        //$('.decider button').text('turn ON')
        $(e.target).text('turn OONN')
        $('.decider img').attr('src','https://si.wsj.net/public/resources/images/BN-WB523_1109RO_12S_20171109172506.jpg')
    }
});

$('.cool-kids button').click(function(e){
    const bgcolor=$(e.target).css('background-color')
    $('.cool-kids main').css('background-color',bgcolor)
})