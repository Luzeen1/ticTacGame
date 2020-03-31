$(document).ready(function(){

    let gameIsActive;
    let currentPlayer ;
    let gameBoard ;
    var round, movesNumber;
    let xPoints,oPoints;
    var changePossible, restartClickable;
    
    

    initGame();
    initNewFiveRounds();


    function initGame(){
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    movesNumber=0;
    changePossible=true;
    gameIsActive=true;
    displayTurn('1');
    setClassAtrr("class","x");
    restartClickable=false;
    }

    function initNewFiveRounds(){
        round=0;
        xPoints=0;
        oPoints=0;
        document.querySelector('#finalResult').innerHTML="";
        updateRound();
    }


    

document.addEventListener('click',btnClickedHandler);

function btnClickedHandler(event){

    const clickedCell = event.target;
    if(clickedCell.getAttribute('id') == 'reset' && restartClickable){restartGameHandler();}
    else{
    const clickedCellIndex = parseInt(
        clickedCell.getAttribute('id')
     );

      //if the clicked cell has already been clicked OR the game is no longer active
      if (gameBoard[clickedCellIndex] !== "" || !gameIsActive) {
        return;
     }
    availableCellClicked(clickedCell,clickedCellIndex);
    movesNumber++;

    if(movesNumber>4){
     gameResultChecker();
      }
    if(changePossible){ 
        otherPlayerTurn();}
    }

}
  
function availableCellClicked(clickedCell,clickedCellIndex){
    gameBoard[clickedCellIndex] = currentPlayer;
         if(currentPlayer=='X'){
            document.getElementById(clickedCell.getAttribute('id')).style.backgroundColor="CadetBlue";}
         else{
              document.getElementById(clickedCell.getAttribute('id')).style.backgroundColor="#c66d7e"; }
    clickedCell.innerHTML = currentPlayer; 
}
       

        const winningOptions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

function gameResultChecker(){   
    let isThereWinner = false; 
    for (let i = 0; i <= 7; i++) {
           const winOption = winningOptions[i];
           let firstCellInOption = gameBoard[winOption[0]];
           let secondCellInOption = gameBoard[winOption[1]];
           let thirdCellInOption = gameBoard[winOption[2]];
            if (firstCellInOption === '' || secondCellInOption === '' || thirdCellInOption === '') {
                continue;
             }
            if (firstCellInOption === secondCellInOption && secondCellInOption === thirdCellInOption) {
                isThereWinner = true; 
                 break
            }
    }
    if (isThereWinner) {
            gameIsActive = false;
            if(currentPlayer=='X'){
                 displayRoundWinner('1');
                 xPoints++;
                 checkFiveRounds();
                 addRoundRow(round,'1','0');
            }
            else{
                displayRoundWinner('2');
                oPoints++;
                checkFiveRounds();
                addRoundRow(round,'0','1');
            }
            changePossible=false;
            restartClickable=true;
            return;
    }

    let isDraw = !gameBoard.includes("");
    if(isDraw){
          gameIsActive=false;
          checkFiveRounds();
          displayDrawResult('#turnsBoardUpdates',"Round Result : "+'<br\>'+"The Round Ended In A Draw !");
          addRoundRow(round,'0','0');
          setClassAtrr("class","drawClass");
          changePossible=false;
          restartClickable=true;
          return;
         }
      
}


function otherPlayerTurn(){
    currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
    if(currentPlayer=='O'){
        setClassAtrr("class","o")
        displayTurn('2');
    }
    else {
        setClassAtrr("class","x");
        displayTurn('1');
    }
}

    //check if round = 5
function checkFiveRounds(){
    if(round== 5){
        if(xPoints>oPoints){
            displayFinalWinner('X');
            return;
        }
        if(oPoints>xPoints){
            displayFinalWinner('O');
            return;
        }
        else {
            displayDrawResult('#finalResult','The Game Endded In A Draw !');
            return;
            }
    }
}

function addRoundRow(round,p1,p2){
    document.querySelector('#row'+round).innerHTML="<td>"+"#"+round+"</td>"+"<td>"+p1+"</td>"+"<td>"+p2+"</td>";}

function displayRoundWinner(p){
    document.querySelector("#turnsBoardUpdates").innerHTML="Round Result : "+'<br\>'+" The Winner Is Player - "+ p +" !";}

function displayFinalWinner(p){
    document.querySelector("#finalResult").innerHTML="The Winner In 5 Rounds Is "+ p +" Player !";}

function displayDrawResult(id,msg){
    document.querySelector(id).innerHTML=msg;}

function displayTurn(p){
    document.querySelector("#turnsBoardUpdates").innerHTML="PLAYER "+p+'<br\>'+"It's Your Turn ..";}

function setClassAtrr(attr,val){
    document.querySelector("#turnsBoardUpdates").setAttribute(attr,val);}





function updateRound(){
    round++;
    document.querySelector('#round').innerHTML="Round #" + round ;   
}


function restartGameHandler() {
        
    if(round==5){
        document.querySelectorAll('.row').forEach(row=>{row.innerHTML=""});
        initNewFiveRounds();
    }
    else{updateRound();}
    initGame();
    document.querySelectorAll('.tic')
            .forEach(ticCell =>{ ticCell.innerHTML = '?'; ticCell.style.backgroundColor="#333";});
       
               
    }

});
