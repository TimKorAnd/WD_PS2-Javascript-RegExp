let col = 8, row = 8;
res = document.getElementById('chess-board-form__result-output');
let colNum = 8;
let rowNum = 8;
    for (let row = 0; row < rowNum; row ++) {
        for (let col = 0; col < colNum; col++) {
            let cell = document.createElement('div');
            cell.className = 'row ';
            if ((col + row) % 2 === 0) {
                cell.className += 'black-cell'
            } else {
                cell.className += 'white-cell'
            }
            cell.append('__');
            res.append(cell);
        }
        cell = document.createElement('div');
        cell.className = 'col';
        res.append(cell);
    }


