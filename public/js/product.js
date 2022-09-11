const mainBlock = document.querySelector("main.items");


async function  loadData() {
    const url = new URL(window.location)
    
    await fetch('http://localhost:3000/api/shop-items/' + url.searchParams.get('id'))
    .then(res => {
        return res.json()
    })
    .then(data => {
        mainBlock.innerHTML += `<div class="item">
                <img src="img/${data.img}">
                <h4>${data.name} - ${data.price}$</h4>
                <p>${data.desc}</p>
                <p>Осталось: ${data.leftItems}</p>
                </div>`;
    })
}

loadData()