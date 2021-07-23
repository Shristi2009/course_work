const gameState = {
    activePlayer: 'x',
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ],
    counter: 0
  }
let player = null;
let first;
let second;
let winnerName;


  function makeGrid(){
    for(let i=0; i<9; i++) {
        const gridCell=$(`<div id="${i}" class="cell">`);
        $('.board').append(gridCell);  
    }
}

makeGrid();
//--------------------------------------------------------------

function switchMark() {
    if(gameState.activePlayer==="x"){
        gameState.activePlayer="o";
    }else{
        gameState.activePlayer="x"
    }
  }
//----------------------------------------------------------------
function onBoardClick()
{
    if (player == 2)
    {
        if ($(this).text() === "")
        {
            gameState.counter = gameState.counter + 1;
            $(this).text(gameState.activePlayer);
            $(this).css('cursor', 'not-allowed');
            updateState($(this));
            switchMark();
       
            setTimeout(function ()
            {
                winningCheck(gameState.board);
            }, 1000);
       
        }
        return;
    }
    else if (player == 1)
    {
        console.log("the player value " + player)
        if ($(this).text() === "")
        {
            gameState.counter = gameState.counter + 1;
            $(this).text(gameState.activePlayer);
            $(this).css('cursor', 'not-allowed');
            console.log("...................." + $(this));
            updateState($(this));
            switchMark();
        
            setTimeout(function ()
            {
                winningCheck(gameState.board);
            }, 1000);

            computerMove();
        }
        
    }
}
$('.board .cell').click(onBoardClick);

//--------------------------------------------------------------
function singlePlayer(){
    
    if($(this)){
        player = 1;
    }

    first=$('#firstPlayer').val('Computer');
    console.log(first);
      
}
$('.single').click(singlePlayer);
    
function doublePlayer(){
    if($(this)){
         player=2;
     }    
}

 $('.double').click(doublePlayer);

    
//----------------------------------------------------------------

    function computerMove() {
        
        while(true){
            let random = Math.floor(Math.random() * 9);
            console.log("Random value *************** " + random);
            if ( $('#random').text()===""){
                $('#random').text(gameState.activePlayer);
                $("#random").css('cursor', 'not-allowed');
                updateState($('#random'));  
                switchMark();
               
                setTimeout(function ()
                {
                    winningCheck(gameState.board);
                }, 1000);
            }
        }
}

//-----------------------------------------------------------

function resetGame(){
    $('.board .cell').text("");
    $('.board .cell').removeAttr('style');
    gameState.counter=0;
    gameState.activePlayer="x";
    $('.displayName').text("Player1 VS Player2");
    
    for(let i = 0; i < gameState.board.length; i++) {
       let currentRow= gameState.board[i];
        for(let j = 0; j <currentRow.length; j++) {
         currentRow[j]= null;

        }
    }
}

$('.restart').click(resetGame);
//-----------------------------------------------------------

function updateState(element){
    const id= Number( element.attr('id'));
    const row= Math.floor(id/3);
    const index= id % 3;
    gameState.board[row][index]=gameState.activePlayer;
    console.log(gameState)
}

//-----------------------------------------------------------------------------------------------


function winningCheck(board){

let winner;
    
    if (board[0][0]!== null && board[0][0]=== board[0][1] && board[0][0]=== board[0][2]){
        winner=getWinnerName(board[0][0]);
        alert( `${winner}is the winner`);
        resetGame();
      
    }
    else if (board[1][0]!== null && board[1][0]=== board[1][1] && board[1][0]=== board[1][2]){

        winner=getWinnerName(board[1][0]);
        alert( `${winner} is the winner`);
        resetGame();
    }
    else if (board[2][0]!== null && board[2][0]=== board[2][1] && board[2][0]=== board[2][2]){
        winner=getWinnerName(board[2][0]);
        alert( `${winner} is the winner`);
        resetGame();
    }
    else if (board[2][0]!== null && board[0][0]=== board[1][0] && board[0][0]=== board[2][0]){
        winner=getWinnerName(board[2][0]);
        alert( `${winner} is the winner`);
        resetGame();
    }
    else if (board[0][1]!== null && board[0][1]=== board[1][1] && board[0][1]=== board[2][1]){
        winner=getWinnerName(board[0][1]);
        alert( `${winner} is the winner`);
        resetGame();
    }
    else if (board[0][2]!== null && board[0][2]=== board[1][2] && board[0][2]=== board[2][2]) {
        winner=getWinnerName(board[0][2]);
        alert( `${winner} is the winner`);
        resetGame();
    }
    else if (board[0][0]!== null && board[0][0]=== board[1][1] && board[0][0]=== board[2][2]) {
        winner=getWinnerName(board[0][0]);
        alert( `${winner} is the winner`);
        resetGame();
    }
    else if (board[2][0]!== null && board[2][0]=== board[1][1] && board[2][0]=== board[0][2]) {
        winner=getWinnerName(board[2][0]);
        alert( `${winner} is the winner`);
        resetGame();
    }
    else if (gameState.counter === 9){
        alert('Draw!');
        resetGame();
    }
}
//---------------------------------------------------------------------------------------------------

function getWinnerName(winnerXorY){
    if (winnerXorY==="x"){
        winnerName= first; 
    }
    else{
        winnerName= second;
    }
    console.log(winnerName);
return winnerName;

}
//------------------------------------------------------------------------------------------------------
  
const playClick= function() {
    first=$('#firstPlayer').val();
    console.log(first);
    second=$('#secondPlayer').val();
    $('.displayName').text(first+" VS "+second);
    $('#submitPlayersName')[0].reset();
  }
