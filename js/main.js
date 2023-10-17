const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const audio = new Audio("../assets/pluss.wav")

const size = 30; //definição do tamanho padrão de cada elemento da Snake

const snake = [
    { x: 0, y: 0},
     //Array com cada "tamanho" da Snake
];

const randomNumber = (min , max ) => {
    return Math.round(Math.random() * (max - min) + min)
}

const randomPosition = () => {
    const number = randomNumber(0 , canvas.width - size)
    return Math.round(number/30) * 30
}

const randomColor = () => {
    const r = randomNumber(0,255)
    const g = randomNumber(0,255)
    const b = randomNumber(0,255)

    return `rgb(${r},${g},${b})`
}

const food = {
    x: randomPosition(),
    y: randomPosition(),
    color: randomColor()
}

let direction , loopId

const drawFood = () => {
    const { x, y, color} = food

    ctx.shadowColor = "red"
    ctx.shadowBlur = 9
    ctx.fillStyle = color
    ctx.fillRect ( x, y, size , size)
    ctx.shadowBlur = 0
}
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
    if (!direction) return // se o "direction" for vazio, pula todo o escopo
    
    const head = snake[snake.length -1];  // pega o ultimo valor do array 'a cabeça"

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

    snake.shift(); //exclui o ultimo valor do array

}

const drawGrid = () => {
    ctx.lineWidth = 1
    ctx.strokeStyle = "#252525"

    for ( let i = 30; i < canvas.width; i += 30 ){
        ctx.beginPath()
        ctx.lineTo(i, 0)
        ctx.lineTo(i, 600)
        ctx.stroke()

        ctx.beginPath()
        ctx.lineTo(0, i)
        ctx.lineTo(600, i)
        ctx.stroke()

    }
}

const checkEat = () => {
    const  head = snake [snake.length -1]

    if ( head.x == food.x && head.y == food.y) {
        snake.push(head)
        audio.play()

        let x = randomPosition()
        let y = randomPosition()

        while (snake.find((position) => position.x == x && position.y == y)){
            x = randomPosition();
            y = randomPosition();
        }
        food.x = x;
        food.y = y;
        food.color = randomColor()
    }
}

const checkColidion = () => {
    const head = snake[snake.length -1]
    const canvasLimit = canvas.width - size
    const neckIndex = snake.length - 2

    const wallColision = head.x < 0 ||  head.x > canvasLimit || head.y < 0 || head.y > canvasLimit

    const selfColision = snake.find((position, index) => {
        return index < neckIndex && position.x == head.x && position.y == head.y
    })

    if (wallColision || selfColision) {
        alert ("voce perdeu")
    }
}

const gameOver = () => {
    direction = undefined
}


const gameLoop = () => {    // função que faz o jogo rodar
    clearInterval(loopId)  //limpa o timeout antes de inicializa-lo novamente
    
    ctx.clearRect(0,0,600,600);  // faz a limpeza da tela
    drawGrid();    //Desenha o grid
    drawFood();
    moveSnake();   //move a snake
    drawSnake();   // chama a função de desenhar e redefinir valores da snake.
    checkEat();

    loopId = setTimeout (() => {
        gameLoop();  // a função SE AUTO CHAMA e fica em loop
    },300)
}

gameLoop();

document.addEventListener("keydown",({key})=>{
    if (key == "ArrowRight" && direction != "left") {
        direction = "right"
    }
    if (key == "ArrowLeft" && direction != "right") {
        direction = "left"
    }
    if (key == "ArrowUp" && direction != "down") {
        direction = "up"
    }
    if (key == "ArrowDown" && direction != "up") {
        direction = "down"
    }
});
