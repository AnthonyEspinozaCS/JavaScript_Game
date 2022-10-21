const states = {
    startMenu: 0,
    inGame: 1,
    pausedGame: 2,
    inventory: 3,
    gameOver: 4,
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

    update(deltaTime){
        this.game.UI.inputTimer += deltaTime;
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

    update(deltaTime){
        this.game.UI.inputTimer += deltaTime;
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
            if(this.game.UI.inputTimer > this.game.UI.inputInterval){
                this.game.setGameState(states.inGame);
            }
        } else if(input.includes('ArrowUp')){
            if(this.game.UI.inputTimer > this.game.UI.inputInterval){
                this.game.UI.selected = Math.max(0, --this.game.UI.selected);
                this.game.UI.inputTimer = 0;
            }
        } else if(input.includes('ArrowDown')){
            if(this.game.UI.inputTimer > this.game.UI.inputInterval){
                console.log(this.game.UI.selected);
                this.game.UI.selected = Math.min(3, ++this.game.UI.selected);
                this.game.UI.inputTimer = 0;
            }
        } else if(input.includes('Enter')) {
            switch(this.game.UI.selected){
                case 0:
                    this.game.setGameState(states.inventory);
            }
        }
    }

    update(deltaTime){
        this.game.UI.inputTimer += deltaTime;
    }
}

export class inventory extends gameState {
    constructor(game){
        super('INVENTORY', game);
    }
    enter(){
        console.log('inventory');
    }

    handleInput(input){
        if(input.includes('Escape')){
            if(this.game.UI.inputTimer > this.game.UI.inputInterval){
                this.game.setGameState(states.pausedGame);
                this.game.UI.inputTimer = 0;
            }
        }
    }

    update(deltaTime){
        this.game.UI.inputTimer += deltaTime;
    }
}