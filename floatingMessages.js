export class FloatingMessage {
    constructor(value, x, y, targetX, targetY){
        this.value = value;
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.markedForDeletion = false;
        this.timer = 0;
    }
    update(deltaTime){
        this.x += (this.targetX - this.x) * 0.03;
        this.y += (this.targetY - this.y) * 0.03;
        this.timer += deltaTime;
        if(this.timer > 1000) this.markedForDeletion = true;
    }
    draw(context){
        context.font = '30px Creepster';
        context.fillStyle = 'black';
        context.fillText(this.value, this.x + 2, this.y + 2);
        context.fillStyle = 'white';
        context.fillText(this.value, this.x, this.y);
    }
}