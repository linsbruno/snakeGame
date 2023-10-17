const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const size = 30; //definição do tamanho padrão de cada elemento da Snake

const snake = [
    { x: 200, y: 200},
    { x: 230, y: 200}, //Array com cada "tamanho" da Snake
];

let direction

const drawSnake = () => {    // função que desenha a snake
    ctx.fillStyle = "#ddd";     // Adiciona a cor da snake

    snake.forEach((position, index) => {
        if (index == snake.length -1) {
            ctx.fillStyle = "#fff"
        }                             // percorre todo array da Snake e SE encoontrar o ultimo, muda a cor da snake

        ctx.fillRect(position.x, position.y, size, size);  // Desenha a snake na tela
    }) 
}

const moveSnake = () => {
    if (!direction) return
    
    const head = snake[snake.length -1];

    if(direction == "right") {
        snake.push( { x: head.x + size, y: head.y})
    }

    if(direction == "left") {
        snake.push( { x: head.x - size, y: head.y})
    }
    if(direction == "down") {
        snake.push( { x: head.x , y: head.y + size})
    }
    if(direction == "up") {
        snake.push( { x: head.x, y: head.y - size})
    }
    snake.shift();

}

setInterval(() => {
    ctx.clearRect(0,0,600,600)

    moveSnake();
    drawSnake(); // chama a função de desenhar a snake.
}, 300)
