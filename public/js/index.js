const mainBlock = document.querySelector("main.items");

function showCart() {
    const shopBlock = document.querySelector(".shop-cart-block");

    shopBlock.classList.toggle("active");

    if(shopBlock.classList.contains("active"))
        mainBlock.style.width = "60%";
    else 
        mainBlock.style.width = "90%";   
}
let items = []
async function loadData(){
    await fetch('http://localhost:3000/api/shop-items')
    .then(res => {
        return res.json()
    })
    .then(data => {
        items = data
        data.forEach((item) => {
            mainBlock.innerHTML += `<div class="item">
                <img src="img/${item.img}">
                <a href="/public/product.html?id=${item.id}"><h4>${item.name} - ${item.price}$</h4></a>
                <p>${item.desc}</p>
                <div class="add-to-cart" onclick="addToCart(${item.id})"><i class="fas fa-cart-plus"></i></div>
                </div>`;
        });
    })
}

loadData()


items.forEach((item) => {
    mainBlock.innerHTML += `<div class="item">
        <img src="img/${item.img}">
        <h4>${item.name} - ${item.price}$</h4>
        <p>${item.desc}</p>
        <div class="add-to-cart" onclick="addToCart(${item.id})"><i class="fas fa-cart-plus"></i></div>
        </div>`;
});

let shopCart = [];
if(localStorage.getItem("shopCart") != undefined){
    shopCart = JSON.parse(localStorage.getItem("shopCart"));
    showCart();
    updateShopCart();
}

function addToCart(id) {
    let itemInCart = shopCart.find((item) => item.id == id);
    if(itemInCart) {
        changeCountItems('+', id);
    } else{
        let item = items.find((item) => item.id == id);
        shopCart.push({
            ...item,
            count: 1
        });
   }
   
   updateShopCart();
}

function updateShopCart() {
    const shopCartItems = document.querySelector("#shop-cart");
    shopCartItems.innerHTML = "";

    let elementCount = 0;
    let totalPrice = 0;
    shopCart.forEach((el) => {
        shopCartItems.innerHTML += `<div class="shop-item">
            <div class="info">
                <img src="img/${el.img}" alt="${el.name}">
                <span class="title">${el.name}</span>
            </div>
            <div class="price">${el.price}$</div>
            <div class="count">
                <button class="minus" onclick="changeCountItems('-', ${el.id})">-</button>
                <input class="input-el-count" type="text" id="${el.id}" onfocusout="coutnEL(this)" value="${el.count}">
                <button class="plus" onclick="changeCountItems('+', ${el.id})">+</button>
                <button class="clear-el" onclick="clearElement(${el.id})"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        </div>`;

        elementCount += el.count;
        totalPrice += el.price * el.count;

    });

    let ft = new Intl.NumberFormat('en-US',{
        style: 'currency',
        currency: 'USD'
    });
    
    document.querySelector("#count-items").textContent = elementCount;
    document.querySelector(".go-shop b").textContent = ft.format(totalPrice);

    localStorage.setItem("shopCart", JSON.stringify(shopCart));

}

function coutnEL(el) {
    let item = shopCart.find((item) => item.id == el.id);
    if ((/^\d+$/.test(el.value)) == false || el.value < 0) {
        alert("Неверный формат!");
    } else if (el.value > item.leftItems) {
        alert(`Значение указано не верно!Количество товара должно быть от 1 до ${item.leftItems}`);
    } else {
        item.count = +el.value;
    }
    updateShopCart();
}

function clearAll() {
    shopCart = [];
    localStorage.removeItem("shopCart");
    updateShopCart();
}


function changeCountItems(action, id){
    let item = shopCart.find((item) => item.id == id);
    if(action == '-' && item.count > 1){
        item.count--;
    } else if(action == '+' && item.count < item.leftItems ) {
        item.count++;
    } else if(action == '-' && item.count == 1){
        shopCart = shopCart.filter((item) => item.id != id);
    }

    updateShopCart();
}

function clearElement(id) {
    shopCart = shopCart.filter((item) => item.id != id);
    updateShopCart();
}

async function makeOrder() {
   let insertOrder = []
   shopCart.forEach(el => {
       insertOrder.push({item_id: el.id, count: el.count})
   })

   const result = await fetch('http://localhost:3000/api/shop-items', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(insertOrder)
   })
   if(result.status == 200){
        localStorage.removeItem("shopCart")
        shopCart = []
        updateShopCart()
        document.querySelector(".go-shop").textContent = 'Заказ оформлен';
   }
}

const navItem = document.querySelectorAll("nav span")
navItem.forEach(el => {
    el.addEventListener("click", () => {
        mainBlock.innerHTML = ""
        items.forEach(item => {
            if(el.classList.value == item.category || el.classList.value == "all"){
                mainBlock.innerHTML += `<div class="item">
                    <img src="img/${item.img}">
                    <a href="/public/product.html?id=${item.id}"><h4>${item.name} - ${item.price}$</h4></a>
                    <p>${item.desc}</p>
                    <div class="add-to-cart" onclick="addToCart(${item.id})"><i class="fas fa-cart-plus"></i></div>
                    </div>`;
            }
        })
    })
})