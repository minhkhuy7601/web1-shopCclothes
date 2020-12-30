onLoadCartNumbers();

let kind = localStorage.getItem('kind');
let genre = localStorage.getItem('genre');
// console.log(genre);

let arr = [];
arr.splice(0, arr.length);
let perPage = 8;
let currentPage = 1;
let start = 0;
let end = perPage;


for (let i = 0; i < products.length; i++) {
    if (kind == 'shop')
        arr.push(products[i]);
    if (products[i].kind == kind && products[i].genre == genre)
        arr.push(products[i]);
    if (products[i].kind == kind && genre == 'null')
        arr.push(products[i]);
}


const totalPages = Math.ceil(arr.length / perPage);
const btnNext = document.querySelector(".btn-next");
const btnPrev = document.querySelector(".btn-prev");

function getCurrentPage(currentPage) {
    start = (currentPage - 1) * perPage;
    end = currentPage * perPage;
}

function renderProduct() {
    document.getElementById("products").innerHTML = ``;

    const content = arr.map((item, index) => {
        if (index >= start && index < end) {
            document.getElementById("products").innerHTML += `<div class="product">
        <a href="/resource/html/detail_product.html">
            <div class="tagProduct">
                <img src="${item.img}" alt="">
                <h2 id="name_product">${item.name}</h2>
                <p id="cost_product">${item.price}₫</p>
            </div>
        </a>
    </div>`
        }
    })
    getIndex();

}

function renderListPage() {
    document.getElementById("number-page").innerHTML += `<li class="active"><a>${1}</a></li>`
    for (var i = 2; i <= totalPages; i++) {
        document.getElementById("number-page").innerHTML += `<li><a>${i}</a></li>`

    }
}



renderListPage();

function changePage() {
    const currentPages = document.querySelectorAll(".number-page li");
    for (let i = 0; i < currentPages.length; i++) {
        currentPages[i].addEventListener('click', () => {
            let value = i + 1;
            // console.log(value);
            currentPage = value;
            $(".number-page li").removeClass('active');
            currentPages[i].classList.add('active');
            if (currentPage > 1 && currentPage < totalPages) {
                $('.btn-prev').removeClass('btn-active');
                $('.btn-next').removeClass('btn-active');

            }
            if (currentPage === 1) {
                $('.btn-next').removeClass('btn-active');
                $('.btn-prev').addClass('btn-active');

            }
            if (currentPage === totalPages) {
                $('.btn-prev').removeClass('btn-active');
                $('.btn-next').addClass('btn-active');
            }
            getCurrentPage(currentPage);
            // console.log(getCurrentPage(currentPage));
            renderProduct();
        })
    }
}

changePage();
btnNext.addEventListener('click', () => {
    currentPage++;
    if (currentPage > totalPages)
        currentPage = totalPages;
    if (currentPage === totalPages) {
        $('.btn-next').addClass('btn-active');
    }
    $('.btn-prev').removeClass('btn-active');
    $(".number-page li").removeClass('active');
    $(`.number-page li:eq(${currentPage-1})`).addClass('active');



    getCurrentPage(currentPage)
    renderProduct();
})

btnPrev.addEventListener('click', () => {
    currentPage--;
    if (currentPage <= 1)
        currentPage = 1;
    if (currentPage === 1) {
        $('.btn-prev').addClass('btn-active');
    }
    $('.btn-next').removeClass('btn-active');
    $(".number-page li").removeClass('active');
    $(`.number-page li:eq(${currentPage-1})`).addClass('active');
    getCurrentPage(currentPage)
    renderProduct();
})
renderProduct();

function getIndex() {
    let product = document.querySelectorAll(".product");
    for (let i = 0; i < product.length; i++) {
        product[i].addEventListener('click', () => {
            for (let j = 0; j < products.length; j++)
                if (product[i].getElementsByTagName("h2")[0].textContent == products[j].name) {
                    localStorage.setItem('indexItem', j);
                    break;
                }

        })
    }
}


// function onLoadCartNumbers() {
//     let productNumbers = localStorage.getItem('cartNumbers');
//     if (productNumbers) {
//         document.querySelector('.cart-count').textContent = productNumbers;
//     }
//     if (localStorage.getItem("allProduct") != null) {

//         products = localStorage.getItem("allProduct");
//         products = JSON.parse(products);
//     }

// }