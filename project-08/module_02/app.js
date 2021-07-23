const CARD_URL = `https://api.magicthegathering.io/v1/cards?pageSize=20`

function renderCard(card) {
}

function renderCardList(cardList) {
}

function fetchCardList(url)
{
    $('.searching').addClass('active')
    fetch(url)
    .then(function (res) {
        return res.json();
      }) // convert to json
    .then((function (data) {
       $('.searching').removeClass('active')
        renderCardList(data.cards);
        console.log(data.cards);
        
      
    }))// render the card list && SECRET THING HERE
        .catch(function (error){
        $('.searching').removeClass('active')
        console.log(error);
    }); // render an error message

}

$('#card-search').on('submit', function (event)
{
     // prevent the form from actually submitting 
    event.preventDefault();
  // read the `cardName` and `cardText` from #cname and #ctext
    const cardName = $('#cname').val()
    const cardText=$('#ctext').val()
  // clear the values for the two elements
    $('#cname').val('');
    $('#ctext').val('');
  // build the URL for fetchCardList
    `${CARD_URL}&name=${cardName}&text=${cardText}`
  // call fetchCardList
    fetchCardList(CARD_URL)
    
});

$('#results').on('click', '.card .set-name', function () {
});

fetchCardList(CARD_URL);