// products = localStorage.getItem('allProduct');
// products = JSON.parse(products);
// console.log(products);
onLoadCartNumbers();
// console.log(products);





function renderNewArrival() {
    let newArrival = document.getElementById("newArrival");
    newArrival.innerHTML = '';
    const content = products.map((item, index) => {
        if (index < products.length && index >= products.length - 6)
            newArrival.innerHTML += `<div class="product">
        <a href="/resource/html/detail_product.html">
            <div class="tagProduct">
                <img src="${item.img}" alt="">
                <h2 id="name_product">${item.name}</h2>
                <p id="cost_product">${item.price}₫</p>
            </div>
        </a>
    </div>`
    })
    getIndex();


}

renderNewArrival();

function getIndex() {
    let product = document.querySelectorAll(".product");
    for (let i = 0; i < product.length; i++) {
        product[i].addEventListener('click', () => {
            onLoadCartNumbers();
            // products = localStorage.getItem('allProduct');
            // products = JSON.parse(products);
            console.log(products.length);

            for (let j = 0; j < products.length; j++)
                if (product[i].getElementsByTagName("h2")[0].textContent == products[j].name) {
                    localStorage.setItem('indexItem', j);
                    break;
                }

        })
    }
}