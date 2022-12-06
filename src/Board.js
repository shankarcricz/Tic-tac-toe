import React, { useEffect } from "react";

const Board = () => {

    let winning_comb = [[0,1,2], [0,3,6], [1,4,7], [3,4,5],[6,7,8], [2,5,8], [0,4,8], [2,4,6]]
   
    const eventListener = () => {
        let cols = document.querySelectorAll('.col');
        cols.forEach((col, ind) => {
            col.addEventListener('click', (e)=> {
                if(e.target.classList.contains('x') || e.target.classList.contains('o')) return;
                document.querySelector('.info2').classList.remove('hide');
                
                document.querySelector('.info').classList.add('hide');
                let currentPlayer = document.querySelector('.container');
                let cp = currentPlayer.classList.contains('ex')? 'ex' : 'circle';
                let playerNow = cp==='ex'?'o':'x';
                document.querySelector('.info2').innerHTML = `Player ${playerNow}'s turn`;
                e.target.classList.add(cp==='ex'?'x':'o');
                if(cp==='ex') {
                    currentPlayer.classList.remove('ex');
                    currentPlayer.classList.add('circle');
                } else {
                    currentPlayer.classList.remove('circle');
                    currentPlayer.classList.add('ex');
                }
                
            
                if(checkForWinner(cp==='ex'?'x':'o', ind,cols)) {
                    winnerMsg(cp, cols);
                }
                else if(checkForDraw(cols)) {
                    draw(cols);
                }
                e.stopImmediatePropagation();
                
            })
        })
    }
    const checkForDraw = (cols) => {
        for(let col of cols) {
            if(!col.classList.contains('x') && !col.classList.contains('o')) {
                return false
            }
        }
        return true
       
    }
    const draw = (cols) => {
        document.querySelector('.container').classList.add('hide');
        document.querySelector('.winner').classList.remove('hide');
        document.querySelector('.winnerMsg').innerHTML = 'Match Drawn!';
        let restart = document.getElementById('restart');
        document.querySelector('.info2').classList.add('hide');
        restart.addEventListener('click', ()=>loadGame(cols));
    }
    const winnerMsg = (cp, cols) => {
        document.querySelector('.container').classList.add('hide');
        let winner = cp==='ex'?'x':'o';
        document.querySelector('.winner').classList.remove('hide');
        document.querySelector('.winnerMsg').innerHTML = `winner is ${winner}`;
        let restart = document.getElementById('restart');
        document.querySelector('.info2').classList.add('hide');
        restart.addEventListener('click', ()=>loadGame(cols));
    }
    const loadGame = (cols) => {
        cols.forEach(col=>{
            col.classList.remove('x');
            col.classList.remove('o');
            let currentPlayer = document.querySelector('.container');
            currentPlayer.classList.remove('circle');
            currentPlayer.classList.add('ex');
            document.querySelector('.container').classList.remove('hide');
            document.querySelector('.winnerMsg').innerHTML = '';
            document.querySelector('.info').classList.remove('hide');
            
            document.querySelector('.winner').classList.add('hide');
        })

    }
    const checkForWinner = (cp, ind, cols) => {
        return winning_comb.some(comb => {
            return comb.every(ind => {
                return cols[ind].classList.contains(cp)
            })
        })
    }
    useEffect(()=>{
        eventListener();
    }) 

    return(
        <div>
            <div className="header mb-5">
                <h1 className="text-info">Welcome to TIC TAC TOE!</h1>
                <h4 className="text-secondary info">Player X to start the Game!</h4>
                <h4 className="text-secondary info2 hide"></h4>
            </div>
            <div className="container ex w-50">
            <div className="row">
                <div className="col"></div>
                <div className="col"></div>
                <div className="col"></div>
            </div>
            <div className="row">
                <div className="col"></div>
                <div className="col"></div>
                <div className="col"></div>
            </div>
            <div className="row">
                <div className="col"></div>
                <div className="col"></div>
                <div className="col"></div>
            </div>
            </div>
            <div className="winner hide">
                <h1 className="winnerMsg"></h1>
                <button id="restart" className="btn-success btn" type='button'>Play Again!</button>
            </div>
        </div>
        
        
    );
}

export default Board;

