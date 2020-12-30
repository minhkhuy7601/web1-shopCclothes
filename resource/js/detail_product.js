onLoadCartNumbers();

let index = localStorage.getItem('indexItem');
console.log(index);

if (document.getElementById("box_container") != null) {
    document.getElementById("box_container").innerHTML = `<section class="section">
    <div class="row row_section">
        <div class="col-sm-7 col_section col1_section">
            <img src="${products[index].img}" id="main_img" alt="">
            <div class="img_detail">
                <img id="img1_detail" onclick="document.getElementById('main_img').src='${products[index].img}'" src="${products[index].img}" alt="">
                <img id="img2_detail" onclick="document.getElementById('main_img').src='${products[index].img_back}'"  src="${products[index].img_back}" alt="">
            </div>
        </div>
        <div class=" col-sm-5 col_section col2_section">
            <div class="box_col2">
                <div class="title_price_product">
                    <h2>${products[index].name}</h2>
                    <p>${products[index].price}₫</p>
                </div>
                <select name="" id="select_color">
                        <option value="">${products[index].color}</option>
                    </select>
                <select name="" id="select_size">
                        <option value="">S</option>
                        <option value="">M</option>
                        <option value="">L</option>
                        <option value="">XL</option>

                    </select>


                <button class="add-cart btn--detail" type="button" onclick="addCart()" class="btn btn-primary" data-toggle="modal" data-target="#myModal">
                            thêm vào giỏ
                    </button>
                <div class="modal" id="myModal">
                    <div class="modal-dialog" id="modal-dialog">
                        <div class="modal-content" id="modal-content">
                            <i class="fas fa-check-square">ĐÃ THÊM VÀO GIỎ THÀNH CÔNG</i>
                            <div class="box_img_name">
                                <img src="${products[index].img}" class="modal--img" alt="">
                                <div class="name_product">${products[index].name}</div>
                            </div>
                            <button type="button" class="continue" data-dismiss="modal">Tiếp tục mua sắm</button>
                            <button class="reviewCart" onclick="reviewCart()">Xem giỏ hàng</button>                                               
                            <button type="button" class="close" data-dismiss="modal"><img src="/img/cancel.png" alt=""></button>
                        </div>
                    </div>
                </div>
                <div class="buy btn--detail" onclick="acceptBuy()">mua ngay</div>
                <div class="detail">
                    <p>Chi tiết sản phẩm:</p>
                    <div class="content_detail">${products[index].detail} </div>

                </div>
            </div>

        </div>
    </div>

    </section>`
}

function acceptBuy() {
    cartNumbers(products[index]);
    if (currentAccount.type == 'user')
        window.location.href = "/resource/html/indentCheck.html";
}
document.getElementById('img1_detail').addEventListener('click', () => {
    document.getElementById('img1_detail').style.border = "3px solid rgb(17, 45, 78)";
    document.getElementById('img2_detail').style.border = "none";
});
document.getElementById('img2_detail').addEventListener('click', () => {
    document.getElementById('img2_detail').style.border = "3px solid rgb(17, 45, 78)";
    document.getElementById('img1_detail').style.border = "none";
})


function addCart() {
    cartNumbers(products[index]);
    console.log("hello");
}


function reviewCart() {
    window.location.href = "/resource/html/cart.html";
}


function cartNumbers(products) {
    if (currentAccount.type == 'none') {
        alert("Bạn cần đăng nhập để mua sản phẩm!!!");
        window.location.href = "/resource/html/account.html";
    } else {
        if (currentAccount.type == 'admin') {
            alert("Admin không có thao tác này!!");
            window.location.href = "/resource/html/account.html";

        } else {
            let flag = true;
            for (let i = 0; i < currentAccount.cartTemp.length; i++) {
                if (currentAccount.cartTemp[i].name == products.name) {
                    flag = false;
                    currentAccount.cartTemp[i].incart += 1;
                }
            }
            if (flag) {
                currentAccount.cartTemp.push(products);
                currentAccount.cartTemp[currentAccount.cartTemp.length - 1].incart = 1;
            }
            displayCartNumbers();
            localStorage.setItem('currentAccount', JSON.stringify(currentAccount));
            console.log(currentAccount.cartTemp);
        }
    }
}