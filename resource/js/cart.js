function displayCart() {
    let cost = 0;
    if (document.querySelector(".products") != null) {
        let productContainer = document.querySelector(".products");
        productContainer.innerHTML = '';
        for (let i = 0; i < currentAccount.cartTemp.length; i++) {
            cost += currentAccount.cartTemp[i].incart * currentAccount.cartTemp[i].price;
            productContainer.innerHTML += `<div class="product">
                    <div class="product-title">
                        <img src="${currentAccount.cartTemp[i].img}" alt="">
                        <p>
                             ${currentAccount.cartTemp[i].name}<br>
                            ${currentAccount.cartTemp[i].price}₫
                        </p>
                    </div>
                    <div class="quantity"><button class="decrease" id="" style="margin-right:1rem; border-radius: 0.5rem"><</button><span id="quantity">${currentAccount.cartTemp[i].incart}</span><button class="increase" id="" style="margin-left:1rem;border-radius: 0.5rem">></button></div>
                    <div class="total"><span id="total">${currentAccount.cartTemp[i].price*currentAccount.cartTemp[i].incart}</span>₫</div>
                    <div class="removeIncart" id="" }"><img src="/img/trash.png" alt="" style="width:3rem;height:3rem"></div>

                </div>
                    `

        }

        if (cost > 0) {
            productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h2 >Tổng tiền: <span id="totalCost">${cost}</span><span>₫</span></h2>
                <div onclick="acceptBuy()">Thanh toán</div>
            </div>`;
        } else {
            productContainer.innerHTML += `<div class="empty"><img src="/img/empty_cart.png" alt="" class="empty_cart">
            <div>Không có sản phẩm nào trong giỏ hàng của bạn.</div><a href="/resource/html/index.html" class="btn_continueShopping">Tiếp tục mua sắm</a></div>`
        }
    }


}




function acceptBuy() {
    window.location.href = "/resource/html/indentCheck.html";
}

// function acceptBuy() {
//     // onLoadCartNumbers();
// var today = new Date();
// var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
// var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
// var dateTime = date + ' ' + time;
// alert("Cảm ơn quý khách đã mua sản phẩm ^^!!!");
// for (let i = 0; i < currentAccount.cartTemp.length; i++) {
//     currentAccount.cartTemp[i].date = dateTime;
//     currentAccount.cart.push(currentAccount.cartTemp[i]);
// }
// currentAccount.cartTemp.splice(0);
// accounts[currentAccount.id] = currentAccount;
// localStorage.setItem('allAccount', JSON.stringify(accounts));
// localStorage.setItem('currentAccount', JSON.stringify(currentAccount));
// displayCart();
// displayCartNumbers();
// }

onLoadCartNumbers();
displayCart();

function manipulation() {
    let removeIncart = document.querySelectorAll(".removeIncart");
    let decrease = document.querySelectorAll(".decrease");
    let quantity = document.querySelectorAll("#quantity");
    let increase = document.querySelectorAll(".increase");
    let total = document.querySelectorAll("#total");

    // console.log(removeIncart.length);
    for (let i = 0; i < removeIncart.length; i++) {
        removeIncart[i].addEventListener('click', () => {
            // localStorage.setItem('cartNumbers', )
            currentAccount.cartTemp.splice(i, 1);
            displayCartNumbers();
            localStorage.setItem('currentAccount', JSON.stringify(currentAccount));
            window.location.href = "/resource/html/cart.html";
        });
        decrease[i].addEventListener('click', () => {
            if (currentAccount.cartTemp[i].incart != 1) {
                currentAccount.cartTemp[i].incart -= 1;
                quantity[i].textContent = currentAccount.cartTemp[i].incart;
                total[i].textContent = currentAccount.cartTemp[i].incart * currentAccount.cartTemp[i].price;
                displayCartNumbers();

                localStorage.setItem('currentAccount', JSON.stringify(currentAccount));
            } else
                currentAccount.cartTemp[i].incart = 1;

        });

        increase[i].addEventListener('click', () => {
            currentAccount.cartTemp[i].incart += 1;
            quantity[i].textContent = currentAccount.cartTemp[i].incart;
            total[i].textContent = currentAccount.cartTemp[i].incart * currentAccount.cartTemp[i].price;

            displayCartNumbers();
            localStorage.setItem('currentAccount', JSON.stringify(currentAccount));

        });
    }
}

manipulation();