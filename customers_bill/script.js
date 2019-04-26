const GOODS = [
    {
        category: 'furniture',
        name: 'Chair',
        amount: 1,
        price: 20
    },
    {
        category: 'supplies',
        name: 'Gel Pen',
        amount: 20,
        price: 2
    },
    {
        category: 'other',
        name: 'Trash Bin',
        amount: 1,
        price: 5
    },
    {
        category: 'furniture',
        name: 'Sofa',
        amount: 1,
        price: 50
    },
    {
        category: 'supplies',
        name: 'Notebook',
        amount: 3,
        price: 3
    },
    {
        category: 'other',
        name: 'Calendar 2019',
        amount: 1,
        price: 3
    }
];
const SORT_ARROW_UP = '▲';
const SORT_ARROW_DOWN = '▼';
let tableBody = document.getElementById('tbody');
let total = document.getElementById('total');

window.onload = () => {eventsLoader()};

function searchByName(event) {
    let searchRegExp;

    try {
        searchRegExp = new RegExp(event.target.value,'i');
    } catch {
        /*escape spec. symbols*/
        searchRegExp = new RegExp(event.target.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),'gi')
    }

    GOODS.forEach((currGood, i) =>{
        GOODS[i].searched = searchRegExp.test(currGood.name);
    });
    viewTable();

}

function filterByCategorySelect(event) {
    let filter = event.target.value;
    GOODS.forEach((currGood, i) =>{
        GOODS[i].filteredByCategory = (currGood.category === filter || filter === '')
    });
    viewTable();
}
/*draw row with one good*/
function drawTR(currGood) {
    //console.log(currGood);
    let tr = document.createElement('tr');
    for (let currField in currGood) {
        if (currField === 'searched' || currField === 'filteredByCategory') continue;
        let td = tr.appendChild(document.createElement('td'));
        td.innerHTML = currGood[currField];
    }
    tableBody.appendChild(tr);
}
/*show the table*/
function viewTable(){
    let sum = 0;
    let clearTableBody = () => {
        while(tableBody.hasChildNodes())
        {
            tableBody.removeChild(tableBody.firstChild);
        }
        total.innerText = '$';
    };
    //console.log(GOODS);
    clearTableBody();
    GOODS.forEach((currGood) =>{
        if ((currGood.searched === undefined || currGood.searched) && (currGood.filteredByCategory === undefined || currGood.filteredByCategory)) {
            drawTR(currGood);
            sum += (currGood.price * currGood.amount);
        }
    });
    total.innerText = sum+'$';
}

function sortBy(event) {
    let field = event.target.innerText.toLowerCase().split(' ');
    event.target.innerText = event.target.innerText.replace((field[1] === SORT_ARROW_UP ? SORT_ARROW_UP : SORT_ARROW_DOWN),
            (field[1] !== SORT_ARROW_UP ? SORT_ARROW_UP : SORT_ARROW_DOWN));


    GOODS.sort((a,b)=>{

        if (a[field[0]] > b[field[0]]) {
            return field[1] !== SORT_ARROW_UP ? 1 : -1;
        }
        return field[1] === SORT_ARROW_UP ? 1 : -1;
    });

    viewTable();

}

function eventsLoader() {
    const searchInputElem = document.getElementById('search-by-name');
    searchInputElem.addEventListener('input',(event) => searchByName(event));

    const  filterSelectElem = document.getElementById('filter-by-category');
    filterSelectElem.addEventListener('change',(event) => filterByCategorySelect(event))

    const categorySortElem = document.getElementById('category-arrow-sort');
    categorySortElem.addEventListener('click',(event) => sortBy(event));

    const nameSortElem = document.getElementById('name-arrow-sort');
    nameSortElem.addEventListener('click',(event) => sortBy(event));

    viewTable();
}