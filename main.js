const filterInput = document.querySelector('#filter');
const productListUL = document.querySelector('.collection');
const msg = document.querySelector('.msg');
const nameInput = document.querySelector('.product-name');
const priceInput = document.querySelector('.product-price');
const addBtn = document.querySelector('.add-product');
const deleteBtn = document.querySelector('.delete-product');
const formElm = document.querySelector('form');

let productData = getDataFromLocalStorage();

function getDataFromLocalStorage() {
    let items = '';
    if (localStorage.getItem('productItems') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('productItems'));
    }
    return items;
}

function saveDataToLocalStorage(item) {
    let itemId = parseInt(item.id);
    let items = '';
    let f1 = false;
    if (localStorage.getItem('productItems') === null) {
        items = [];
        items.push(item);
        localStorage.setItem('productItems', JSON.stringify(items));
    } else {
        items = JSON.parse(localStorage.getItem('productItems'));
        for (let i = 0; i < items.length; i++) {
            let x = parseInt(items[i].id);
            if (x === itemId) {
                items[i] = (item);
                localStorage.setItem('productItems', JSON.stringify(items));
                f1 = true;
                break;
            }
        }
        if (f1 === false) {
            items.push(item);
            localStorage.setItem('productItems', JSON.stringify(items));
        }
    }
    return items;
}


function deleteItemFromLocalStorage(id) {

    const items = JSON.parse(localStorage.getItem('productItems'));

    let result = productData.filter((productItem) => {
        location.reload();
        return parseInt(productItem.id) !== id;
    });
    localStorage.setItem('productItems', JSON.stringify(result));

    if (result.length === 0) {
        location.reload();
    }
}

//getData


function getData(productList) {
    let li = '';
    if (productList.length > 0) {

        msg.innerHTML = '';
        let count = 0;
        productList.forEach(({ id, name, price }) => {
            // const { id, name, price } = product;
            count = count + 1;
            let li = document.createElement('li');
            li.className = 'list-group-item collection-item';
            li.id = `product-${id}`;
            li.innerHTML = `<strong>${id+1}.${name}</strong>
            <button class="delete-product">Delete</button>
            `;

            productListUL.appendChild(li);

        });
    } else {
        // showMessage(true, null);
        showMessage('add item');
        count = 0
    }
}
getData(productData);
//addData
const addItem = (e) => {
    e.preventDefault();
    const name = nameInput.value;

    let id;
    if (productData.length === 0) {
        id = 0;
    } else {
        id = productData[productData.length - 1].id + 1;
    }
    if (name === '') {
        alert("please fill up necessary information");
    } else {
        const data = {
            id,
            name

        };
        productData.push(data);
        saveDataToLocalStorage(data);
        productListUL.innerHTML = '';
        getData(productData);
        nameInput.value = '';
        priceInput.value = '';
    }

};

addBtn.addEventListener('click', addItem);

//delete item
const deleteData = e => {
    if (e.target.classList.contains('delete-product')) {
        e.preventDefault();
        // e.target.parentElement.remove();

        //removing from target UI(user interface)
        const target = e.target.parentElement;
        e.target.parentElement.parentElement.removeChild(target); //ul


        const id = parseInt(target.id.split('-')[1]);
        console.log(id);

        deleteItemFromLocalStorage(id);

    }

};
productListUL.addEventListener('click', deleteData);

//searchItem
const searchItem = (e) => {
    const text = e.target.value.toLowerCase();
    let itemLength = 0;
    document.querySelectorAll('.collection .collection-item').forEach(item => {
        const productName = item.firstElementChild.textContent.toLocaleLowerCase();
        if (productName.indexOf(text) === -1) {
            // showMessage(null, true);

            item.style.display = 'none';

        } else {
            item.style.display = 'block';
            ++itemLength;
        }
    });
    (itemLength > 0) ? showMessage(): showMessage('No item found');
}
filterInput.addEventListener('keyup', searchItem);

function showMessage(message = '') {
    msg.innerHTML = message;
}