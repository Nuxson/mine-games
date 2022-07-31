const dom = {
    gameBox: document.getElementById('game-box'),
    btn: document.getElementById('btn')
}

function renderGameCell(){
    const cells = []
    for(let i=0; i < 16; i++){
        cells.push(`<div id=${i} class="mines__item"></div>`)
    }
    dom.gameBox.innerHTML = cells.join('');
}
renderGameCell();

//Перетасовка массива
function getRandomArray(array){
    const newArray = []
    while (array.length){
        const idx = Math.floor(Math.random() * array.length);
        const value = array.splice(idx, 1);
        newArray.push(...value)
    }
    return newArray;
}

//Генерация матрицы миного поля
function getMinesMatrix(){
    const matrix = [];
    const minesCount = 3;
    let minesTotal = 0;


    for (let i=16; i > 0; i--) {
        if(minesTotal < minesCount){
            minesTotal++;
            matrix.push(true);
        } else {
            matrix.push(false);
        }
    }
    const randomMatrix = getRandomArray(matrix);
    return randomMatrix
    
}
const minesMatrix = getMinesMatrix();
const clickedCellsId = [];

//Обработка клика по ячейке игрового поля 

dom.gameBox.querySelectorAll('.mines__item').forEach((cellElem) => {
    cellElem.onclick = handleCellClick
})

//Функция обработки клика по ячейке 
function handleCellClick(event){
    const cell = event.target
    const cellId = event.target.id
    clickedCellsId.push(+cellId);
    
    if (minesMatrix[cellId]){
        cell.classList.add('fail');
        cell.innerHTML = '<i class="ic_sad"></i>'
        renderCellMinesInfo()
    }
    else{
        cell.classList.add('success')
        cell.innerHTML = '<i class="ic_smail"></i>'
    }
    
}
console.log(minesMatrix);

//Отображение информации о мином поле после взырва
function renderCellMinesInfo(){
    minesMatrix.forEach((isMine, idx)=> {
        const cell = document.getElementById(idx);
        const isClecked = clickedCellsId.includes(idx);

        if (isMine){
            cell.className = `mines__item fail ${isClecked ? '' : 'info'}`;
            cell.innerHTML = '<i class="ic_sad"></i>'
        }
        else{
            cell.className = `mines__item success ${isClecked ? '' : 'info'}`;
            cell.innerHTML = '<i class="ic_smail"></i>'
        }  
    })
}
//Перезагрузка
dom.btn.onclick = () => {
    location.reload();
}
