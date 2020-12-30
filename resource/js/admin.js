onLoadCartNumbers();

let perPage = 6;
let currentPage = 1;
let start = 0;
let end = perPage;

// let totalPages = Math.ceil(products.length / perPage);
let totalPages;

const btnNext = document.querySelector(".btn-next");
const btnPrev = document.querySelector(".btn-prev");


function getCurrentPage(currentPage) {
    start = (currentPage - 1) * perPage;
    end = currentPage * perPage;
}




function renderProduct() {
    totalPages = Math.ceil(products.length / perPage);
    document.getElementById("products").innerHTML = ``;

    const content = products.map((item, index) => {
        if (index >= start && index < end) {
            document.getElementById("products").innerHTML += `<div class="product">
            <div class="tagProduct">
        <a href="/resource/html/detail_product.html">

                <img src="${item.img}" alt="">
                <h2 id="name_product">${item.name}</h2>
                <p id="cost_product">${item.price}₫</p>
        </a>
            <div type="button" data-toggle="modal"  data-target="#myModal" id="removeProduct">
            remove
          </div>
          
            </div>
    </div>`
        }
    })
    getIndex();
    removeProduct();

}
renderProduct();
renderListPage();
changePage();

function renderListPage() {
    document.getElementById("number-page").innerHTML = '';
    document.getElementById("number-page").innerHTML += `<li class="active"><a>${1}</a></li>`
    for (var i = 2; i <= totalPages; i++) {
        document.getElementById("number-page").innerHTML += `<li><a>${i}</a></li>`
    }
}



// renderListPage();

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
    // renderProduct();


function removeProduct() {
    let remove = document.querySelectorAll("#removeProduct");
    let name = document.querySelectorAll("#name_product");
    for (let i = 0; i < remove.length; i++) {
        remove[i].addEventListener('click', () => {

            for (let j = 0; j < products.length; j++) {
                if (products[j].name == name[i].textContent) {
                    document.getElementById("box_modal").innerHTML = `<div class="modal" id="myModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div id="tilte_question">BẠN CÓ MUỐN XÓA SẢN PHẨM NÀY KHÔNG???</div>
                    <div id="box_img_name">
                       <img src="${products[j].img}" alt="">
                        <div>${products[j].name}</div>
                    </div>
                    <div id="box_yes_no">
                     <button type="button" id="noRemove" data-dismiss="modal">KHÔNG</button>
                      <button id="yesRemove" onclick="modalRemove(${j})" data-dismiss="modal">CÓ</button>
                    </div>
                </div>
            </div>
        </div>`

                }
            }
            // console.log(products);
            // renderProduct();
            // renderListPage();
            // changePage();
        })
    }
}



function modalRemove(j) {
    products.splice(j, 1);
    localStorage.setItem('allProduct', JSON.stringify(products));
    // console.log(products);
    // products
    renderProduct();
    renderListPage();
    changePage();

}
// removeProduct();

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