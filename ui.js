export class UI {
    constructor(game){
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Creepster';
        this.livesImage = lives;
    }
    draw(context){
        context.save();
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'black';
        context.shadowBlur = 0;
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
        if(this.game.currentGameState === this.game.gameState[0]){
            context.textAlign = 'center';
            context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
            context.fillText("Welcome to the deadly forest!", this.game.width * 0.5, this.game.height * 0.5);
            context.font = this.fontSize * 1.5 + 'px ' + this.fontFamily;
            context.fillText('Press space to enter.', this.game.width * 0.5, this.game.height * 0.5 + 40);
        }else{
            //score
            context.fillText('Score: ' + this.game.score, 20, 50);
            //timer
            context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
            context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1), 20, 80);
            //lives
            for(let i = 0; i < this.game.lives; i++){
                context.drawImage(this.livesImage, 30 * i + 15, 95, 25, 25);
            }
        }
        //game over messages
        if(this.game.gameOver){
            context.textAlign = 'center';
            context.font = this.fontSize * 3 + 'px ' + this.fontFamily;
            context.fillStyle = 'white';
            context.shadowColor = 'black';
            if(this.game.score > 10){
                context.fillText('Boo-yah', this.game.width * 0.5, this.game.height * 0.5 - 20);
                context.font = this.fontSize * 1.5 + 'px ' + this.fontFamily;
                context.fillText('Well played!', this.game.width * 0.5, this.game.height * 0.5 + 40);
            } else {
                context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
                context.fillText('The forest has bested you!', this.game.width * 0.5, this.game.height * 0.5 - 20);
                context.font = this.fontSize * 1.5 + 'px ' + this.fontFamily;
                context.fillText('Better luck next time!', this.game.width * 0.5, this.game.height * 0.5 + 20);
            }
        }
        context.restore();
    }
}