let isNoughtsTurn = true;
let isItTie = false;

let container = document.querySelector(".container");
let menu = document.querySelector(".menu");
let bar = document.querySelector(".bar");

let p2 = document.querySelector("p:nth-child(3)");
let p2TextOriginal = p2.textContent;

let header1 = document.querySelector(".header:first-child");
let header2 = document.querySelector(".header:nth-last-of-type(1)");

let square1 = document.querySelectorAll(".square")[0];
let square2 = document.querySelectorAll(".square")[1];
let square3 = document.querySelectorAll(".square")[2];
let square4 = document.querySelectorAll(".square")[3];
let square5 = document.querySelectorAll(".square")[4];
let square6 = document.querySelectorAll(".square")[5];
let square7 = document.querySelectorAll(".square")[6];
let square8 = document.querySelectorAll(".square")[7];
let square9 = document.querySelectorAll(".square")[8];

let yesBtn = document.querySelectorAll("button")[0];
let noBtn = document.querySelectorAll("button")[1];

let currentX, currentY, initialX, initialY;
let offsetX = 0, offsetY = 0;

let squares = [square1, square2, square3, square4, square5, square6, square7, square8, square9];
let boardMapped = ['', '', '', '', '', '', '', '', ''];

async function main()
{
    restart();
    drawWhosTurn();

    for(const square of squares)
        if(square.hasChildNodes())
        {
            console.log(square.childNodes[0]);
            square.removeChild(square.childNodes[0]);
        }

    let i = 0;
    while(checkIsGameEnded() === false)
    {
        await wait(1);
    };
    await wait(1000);
    goToEndingWindow();
}

function wait(milisec) {
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, milisec);
    })
}

function drawWhosTurn()
{
    console.log(header1);
    console.log(header2);
    if(isNoughtsTurn)
    {
        container.style.backgroundImage = "linear-gradient(to right, #005f7a 55%, #ffa085)";
        header2.style.color = "#ffa085";
        header1.style.color = "white";
    }
    else
    {
        container.style.backgroundImage = "linear-gradient(to left, #ffa085 55%, #005f7a)";
        header1.style.color = "#005f7a";
        header2.style.color = "black";
    }
}

function fillTheField(e)
{
    let number = (e.target.id);
    number = number.slice(1);

    if(boardMapped[number - 1] === '')
    {
        var newITag = document.createElement("i");

        if(isNoughtsTurn === true)
        {
            newITag.className = "nought fa-regular fa-circle fa-8x";
            boardMapped[number - 1] = 'o';
        }
        else if(isNoughtsTurn === false)
        {
            newITag.className = "cross fa-solid fa-xmark fa-10x";
            boardMapped[number - 1] = 'x';
        }

        isNoughtsTurn = !isNoughtsTurn;
        drawWhosTurn();
        e.target.appendChild(newITag);
    }

    /*if(checkIsGameEnded() === true)
    {
        goToEndingWindow();
    }*/
}

function checkIsGameEnded()
{
    if(boardMapped[0] === boardMapped[1] && boardMapped[1] === boardMapped[2] && boardMapped[0] !== '')
        return true;
    if(boardMapped[3] === boardMapped[4] && boardMapped[4] === boardMapped[5] && boardMapped[3] !== '')
        return true;
    if(boardMapped[6] === boardMapped[7] && boardMapped[7] === boardMapped[8] && boardMapped[6] !== '')
        return true;
    if(boardMapped[0] === boardMapped[3] && boardMapped[3] === boardMapped[6] && boardMapped[0] !== '')
        return true;
    if(boardMapped[1] === boardMapped[4] && boardMapped[4] === boardMapped[7] && boardMapped[1] !== '')
        return true;
    if(boardMapped[2] === boardMapped[5] && boardMapped[5] === boardMapped[8] && boardMapped[2] !== '')
        return true;
    if(boardMapped[0] === boardMapped[4] && boardMapped[4] === boardMapped[8] && boardMapped[0] !== '')
        return true;
    if(boardMapped[2] === boardMapped[4] && boardMapped[4] === boardMapped[6] && boardMapped[2] !== '')
        return true;
    if(boardMapped[0] !== '' && boardMapped[1] !== '' && boardMapped[2] !== '' && boardMapped[3] !== '' && boardMapped[4] !== '' && boardMapped[5] !== '' && boardMapped[6] !== '' && boardMapped[7] !== '' && boardMapped[8] !== '')
    {
        isItTie = true;
        return true;
    }
    return false;
}

function goToEndingWindow()
{
    p2.textContent = p2TextOriginal;
    
    if(isItTie === false)
    {
        if(isNoughtsTurn === true)
            p2.textContent = "CROSSES HAVE WON. " + p2.textContent;
        else
            p2.textContent = "NOUGHTS HAVE WON. " + p2.textContent;
    }
    else
        p2.textContent = "WE'VE GOT A TIE. " + p2.textContent;
    
    container.style.display = "none";
    menu.style.display = "flex";
}

function restart()
{
    isNoughtsTurn = true;
    isItTie = false;

    for(let i = 0; i < boardMapped.length; i++)
        boardMapped[i] = '';

    menu.style.display = "none";
    container.style.display = "flex";
}

function exit()
{
    let newWindow = open(location, '_self');
    newWindow.close();
    return false;
}

function dragStart(e)
{
    initialX = e.clientX - offsetX;
    initialY = e.clientY - offsetY;

    if(e.target === bar)
        active = true;
}

function dragEnd(e)
{
    initialX = currentX;
    initialY = currentY;

    active = false;
}

function drag(e)
{
    if(active)
    {
        e.preventDefault();

        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;

        offsetX = currentX;
        offsetY = currentY;

        setTranslate(currentX, currentY, menu);
    }
}

function setTranslate(x, y, elem)
{
    elem.style.transform = "translate3d(" + x + "px, " + y + "px, 0";
}

square1.addEventListener("click", fillTheField);
square2.addEventListener("click", fillTheField);
square3.addEventListener("click", fillTheField);
square4.addEventListener("click", fillTheField);
square5.addEventListener("click", fillTheField);
square6.addEventListener("click", fillTheField);
square7.addEventListener("click", fillTheField);
square8.addEventListener("click", fillTheField);
square9.addEventListener("click", fillTheField);

bar.addEventListener("mousedown", dragStart, false);
bar.addEventListener("mouseup", dragEnd, false);
bar.addEventListener("mousemove", drag, false);

yesBtn.addEventListener("click", main);
noBtn.addEventListener("click", exit);

main();