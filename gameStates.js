const states = {
    startMenu: 0,
    inGame: 1,
    pausedGame: 2,
    gameOver: 3,
}

class gameState {
    constructor(state, game){
        this.state = state;
        this.game = game;
    }
}

export class startMenu extends gameState {
    constructor(game){
        super('START MENU', game);
    }
    enter(){

    }

    handleInput(input){
        if(input.includes(' ')){
            console.log('Starting game');
            this.game.setGameState(states.inGame);
        }
    }
}

export class inGame extends gameState {
    constructor(game){
        super('IN GAME', game);
    }
    enter(){
        console.log('in Game');
    }

    handleInput(input){
        if(input.includes('p')){
            this.game.setGameState(states.pausedGame);
        }
    }
}

export class pausedGame extends gameState {
    constructor(game){
        super('PAUSED GAME', game);
    }

    enter(){
        console.log('Paused game');
        this.game.speed = 0;
    }

    handleInput(input){
        if(input.includes('Escape')){
            this.game.setGameState(states.inGame);
        }
    }
}