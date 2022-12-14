import { Background } from './background.js';
import { ClimbingEnemy, FlyingEnemy, GroundEnemy } from './enemies.js';
import { inGame, inventory, pausedGame, startMenu } from './gameStates.js';
import { InputHandler } from './input.js';
import { Player } from './player.js'
import { UI } from './ui.js'

window.addEventListener('load', function(){
    const canvas = canvas1;
    const ctx = canvas.getContext('2d');
    canvas.width = 900;
    canvas.height = 500;

    class Game {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.groundMargin = 40;
            this.speed = 0;
            this.maxSpeed = 6;
            this.debug = false;
            this.particles = [];
            this.collisions = [];
            this.maxParticles = 200;
            this.lives = 5;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.UI = new UI(this);
            this.enemies = [];
            this.floatingMessages = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.score = 0;
            this.winningScore = 50;
            this.fontColor = 'white';
            this.time = 20000;
            this.minTime = 0;
            this.gameState = [new startMenu(this), new inGame(this), new pausedGame(this), new inventory(this)];
            this.currentGameState = this.gameState[3];
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
            this.gameOver = false;
            }
        update(deltaTime){
            if(this.currentGameState === this.gameState[1]) this.time -= deltaTime;
            if (this.time < this.minTime) this.gameOver = true;
            this.currentGameState.handleInput(this.input.keys);
            this.currentGameState.update(deltaTime);
            this.background.update();
            if(this.currentGameState === this.gameState[1]) this.player.update(this.input.keys, deltaTime);
            // handle enemies
            if(this.enemyTimer > this.enemyInterval){
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime);
                if(enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy), 1);
            });
            //handle messages
            this.floatingMessages.forEach(message => {
                message.update(deltaTime);
            });
            //handle particles
            this.particles.forEach((particle, index) => {
                particle.update();
            });
            if(this.particles.length > this.maxParticles) {
                this.particles.length = this.maxParticles;
            }
            //handle collision sprites
            this.collisions.forEach((collision, index) => {
                collision.update(deltaTime);
            });
            this.floatingMessages = this.floatingMessages.filter(message => !message.markedForDeletion);
            this.particles = this.particles.filter(particle => !particle.markedForDeletion);
            this.collisions = this.collisions.filter(collision => !collision.markedForDeletion);
            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
        }
        draw(context, deltaTime){
            this.background.draw(context);
            if(this.currentGameState === this.gameState[1]){
                this.player.draw(context);
                this.enemies.forEach(enemy => {
                    enemy.draw(context);
                });
                this.particles.forEach(particle => {
                    particle.draw(context);
                });
                
                this.collisions.forEach(collision => {
                    collision.draw(context);
                });
                this.floatingMessages.forEach(message => {
                    message.draw(context);
                });
            }
            this.UI.draw(context, deltaTime);
        }
        addEnemy(){
            if(this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this));
            else if(this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
            this.enemies.push(new FlyingEnemy(this));
        }
        setGameState(state){
            this.currentGameState = this.gameState[state];
            this.currentGameState.enter();
        }
    }

    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;

    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx, deltaTime);
        if(!game.gameOver) requestAnimationFrame(animate);
    }
    animate(0);
});