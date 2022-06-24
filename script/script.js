const products = JSON.parse(localStorage.getItem('id')) ?
    JSON.parse(localStorage.getItem('id')) : [{
        id: 1,
        item: 'Samsung',
        createDate: new Date()
    }];

function addItems() {}
// Load data
function readItems() {
    console.log(lists);
    let contents = document.querySelector('#');
    contents.innerHTML = "";
    lists.forEach((item, index) => {
        document.querySelector('#').innerHTML +=
            contents.innerHTML +=
            `
        <li class="bg-gradient list-unstyled" id="${index}">
        <input type="checkbox" onclick="itemCompleted(${index})" class="chkItem form-check-input">
function readItems() {
        `;
    })
};

const btnAddItem = document.querySelector('#addItem');
btnAddItem.addEventListener('click', addItems);
document.querySelector('#sorting').addEventListener('click', () => {
    localStorage.setItem('items', JSON.stringify(lists));
    readItems();
});