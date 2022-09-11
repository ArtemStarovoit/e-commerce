const search = document.querySelector('header input')

window.addEventListener('keydown', async (event) => {
    if(event.key == "Enter" && search.value != "" && search == document.activeElement){
        let searchText = search.value

        await fetch('http://localhost:3000/api/shop-items/search', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({search: searchText})
        })
        .then(res => {return res.json()})
        .then(data => {
            mainBlock.innerHTML= ""
            data.forEach((item) => {
                mainBlock.innerHTML += `<div class="item">
                    <img src="img/${item.img}">
                    <a href="/public/product.html?id=${item.id}"><h4>${item.name} - ${item.price}$</h4></a>
                    <p>${item.desc}</p>
                    <div class="add-to-cart" onclick="addToCart(${item.id})"><i class="fas fa-cart-plus"></i></div>
                    </div>`;
        })
    })
  } 
})