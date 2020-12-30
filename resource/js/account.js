onLoadCartNumbers();


function htmlUser() {
    accounts[currentAccount.id] = currentAccount;
    localStorage.setItem('allAccount', JSON.stringify(accounts));
    localStorage.setItem('currentAccount', JSON.stringify(accounts[currentAccount.id]));
    onLoadCartNumbers();

    document.getElementById("section").innerHTML = `<div id="manageAccount">
             <p>Xin chào, ${currentAccount.lastName} ${currentAccount.firstName} </p>
            <p>Phone: ${currentAccount.Phone}</p>
        </div>
        <div id="infoIndents">
            <h3>Quản lí đơn hàng</h3>
            <div id="indentEmpty"></div>
        </div>
        <div class="btn-func">
        <div class="button" onclick="logOut()">Đăng xuất</div>

        </div>`;
    if (currentAccount.cart.length == 0) {
        document.getElementById("indentEmpty").innerHTML = `<img src="/img/empty_cart.png" alt="">`;
    } else {
        document.getElementById("indentEmpty").innerHTML = '';
    }
    for (let i = 0; i < currentAccount.cart.length; i++) {
        document.getElementById("infoIndents").innerHTML += `
            <div id="indents">
        <div class="infoIndent" id="infoIndent--${i}">
            <h2 class="titleIndent">Thông tin đơn hàng</h2>
            <div class="input">Mã đơn hàng: ${currentAccount.cart[i].idIndent}  </div>
            <div class="input">Họ và tên: ${currentAccount.cart[i].nameCustomer}  </div>
            <div class="input">Email: ${currentAccount.cart[i].email}</div>
            <div class="input">SĐT: ${currentAccount.cart[i].numPhone}</div>
             <div class="input">Địa chỉ: ${currentAccount.cart[i].address}</div>
            <div class="input">Ghi chú: ${currentAccount.cart[i].note} </div>    
            <div class="input">Thời gian đặt hàng: ${currentAccount.cart[i].dateBuy}</div>         
        </div>
        <div id="payment_box">
            <h2 class="titleIndent">Đơn hàng</h2>
            <div id="infoCart-cart--${i}">
            </div>
            <div id="couponDiscount">
                <div class="input" id="couponDiscount--${i}">Mã giảm giá đã nhập:</div>
            </div>
            <div class="pay" id="pay--${i}">
                <div id="paymentInfo">
                    <div id="text">Tạm tính</div>
                    <div class="priceProduct" id="priceTotalTemp-cart--${i}">${currentAccount.cart[i].priceTotalTemp}₫</div>
    
                </div>
                <div id="paymentInfo">
                    <div id="text">Vận chuyển (Thanh toán khi nhận hàng)</div>
                    <div class="priceProduct" id="priceTrans-cart--${i}">${currentAccount.cart[i].priceTrans}₫</div>
    
                </div>
            </div>
            <div id="totalCash">
                <div id="textTotal" >Tổng cộng</div>
                <div id="priceProductTotal-cart--${i}" class="priceProductTotal-cart">${currentAccount.cart[i].priceProductTotal}₫</div>
            </div>
            <div class="btn-func" id="btn-func--${i}">
                <button class="btn-confirm">${currentAccount.cart[i].state}</button>
            </div>
        </div>
        
    </div>
    
            `
        if (currentAccount.cart[i].discount.nameDiscount != null) {
            document.getElementById("pay--" + i).innerHTML += ` <div id="paymentInfo">
                    <div id="text" class="nameDiscount">Mã ${currentAccount.cart[i].discount.nameDiscount}</div>
                    <div class="priceProduct" id="priceDisscount">-${currentAccount.cart[i].discount.priceDiscount}₫</div>
                </div>`
            document.getElementById("couponDiscount--" + i).innerText += " " + currentAccount.cart[i].discount.codeDiscount;
        }
        if (currentAccount.cart[i].state == 'Chờ thanh toán') {
            document.getElementById("btn-func--" + i).innerHTML = `<button onclick="pay(${i})">Thanh toán</button>`;
        }
        if (currentAccount.cart[i].dateConfirm != null) {
            document.getElementById("infoIndent--" + i).innerHTML += `<div class="input">Ngày xác nhận: ${currentAccount.cart[i].dateConfirm} </div>`

        }
        if (currentAccount.cart[i].datePay != null) {
            document.getElementById("infoIndent--" + i).innerHTML += `<div class="input">Ngày thanh toán: ${currentAccount.cart[i].datePay} </div>`

        }
        let infoCart_cart = document.getElementById("infoCart-cart--" + i);
        // let priceTotalTemp_cart = document.getElementById("priceTotalTemp-cart--" + i);
        // let priceTrans_cart = document.getElementById("priceTrans-cart--" + i);
        // let priceProductTotal_cart = document.getElementById("priceProductTotal-cart--" + i);
        // let totalCost_cart = 0;
        // let trans_cart = 15000;
        for (let j = 0; j < currentAccount.cart[i].product.length; j++) {
            // totalCost_cart += currentAccount.cart[i].product[j].incart * currentAccount.cart[i].product[j].price;
            infoCart_cart.innerHTML += `<div class="product">
                    <div id="img"><img src="${currentAccount.cart[i].product[j].img}" alt=""><span>${currentAccount.cart[i].product[j].incart}</span></div>
                    <div id="infoProduct">
                        <div id="nameProduct">${currentAccount.cart[i].product[j].name}</div>
                        <div id="describeProduct"></div>
                    </div>
                    <div class="priceProduct">${currentAccount.cart[i].product[j].incart*currentAccount.cart[i].product[j].price}₫</div>
                </div>`
        }
        // priceTotalTemp_cart.textContent = totalCost_cart + "₫";
        // priceTrans_cart.textContent = trans_cart + "₫";
        // priceProductTotal_cart.textContent = totalCost_cart + trans_cart + "₫";
    }
}

function pay(i) {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    alert("Cám ơn bạn đã thanh toán đơn hàng");
    currentAccount.cart[i].state = 'Đã thanh toán';
    currentAccount.cart[i].datePay = dateTime;
    accounts[currentAccount.id] = currentAccount;
    for (let j = 0; j < accounts[1].notice.length; j++) {
        if (accounts[1].notice[j].idIndent == currentAccount.cart[i].idIndent) {

            accounts[1].notice[j] = currentAccount.cart[i];
            accounts[1].notice[j].seen = false;
        }
    }
    localStorage.setItem('allAccount', JSON.stringify(accounts));
    document.getElementById("btn-func--" + i).innerHTML = `<button>Đã thanh toán</button>`;
    document.getElementById("infoIndent--" + i).innerHTML += `<div class="input">Ngày thanh toán: ${currentAccount.cart[i].datePay} </div>`
}

function htmlNone() {
    document.getElementById("section").innerHTML = `<div class="section__row row">
    <div class="col-sm-6 col--1">
        <div class="col1-box">
            <div class="form-login">
                <h2 class="title-box-login">đăng nhập</h2>
                <i class="	fa fa-envelope"></i><input type="text" placeholder="Email của bạn" id="userName"><br>
                <i class="fas fa-key"></i><input type="password" placeholder="Nhập mật khẩu" id="passWord"><br>
                <button class="btn-login" id="btn-login" onclick="getInfo()">Đăng nhập</button><br>
                <div class="fogretPass">
                    <a href="#">Quên mật khẩu?</a>
                </div>

            </div>
        </div>
    </div>
    <div class="col-sm-6 col--2">
        <div class="col2-box">
            <div class="form-login">
                <h2 class="title-box-login">đăng kí thành viên mới</h2>
                <i class="far fa-user-circle"></i><input id="lastName" type="text" placeholder="Tên"><br>
                <i class="far fa-user-circle"></i><input id="firstName" type="text" placeholder="Họ"><br>
                <i class="fa fa-envelope"></i><input id="userName_signUp" type="text" placeholder="Email"><br>
                <i class="fas fa-phone"></i><input id="phone" type="text" placeholder="Số điện thoại"><br>
                <i class="fas fa-key"></i><input id="password_signUp" type="password" placeholder="Mật khẩu"><br>
                <button class="btn-login" onclick="SignUp()" >Đăng ký</button>
            </div>
        </div>

    </div>
</div>`
}

function htmlAdmin() {
    let tmp = 0;
    document.getElementById("section").innerHTML = `
    
  <div id="manageAccount">
    <p>ADMIN, ${currentAccount.lastName} ${currentAccount.firstName} </p>
   <p>Phone: ${currentAccount.Phone}</p>
</div>
<div id="infoIndents">
   <h3>Quản lí tài khoản</h3>
   <div id="indentEmpty"></div>
   
</div>
<div class="btn-func">
<div class="button" onclick="logOut()">Đăng xuất</div>

</div>`;

    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].type === 'user') {
            document.getElementById("infoIndents").innerHTML += `<div class="customer" id="customer--${i}" onclick="showIndentCustomer(${i})">
            <div id="customer--name">${accounts[i].firstName} ${accounts[i].lastName}</div>
            <div id="customer--phone">${accounts[i].Phone}</div></div>
            <div class="customer--content" id="customer--content--${i}"></div>  
        `;
            if (accounts[i].cart.length == 0) {
                document.getElementById("customer--content--" + i).innerHTML = `<div id="indentEmpty"><img src="/img/empty_cart.png" alt=""></div>`;
            } else {
                document.getElementById("customer--content--" + i).innerHTML = '';
            }
            for (let j = 0; j < accounts[i].cart.length; j++) {
                document.getElementById("customer--content--" + i).innerHTML += `
                <div id="indents">
            <div class="infoIndent" id="infoIndent--${i}--${j}">
                <h2 class="titleIndent">Thông tin đơn hàng</h2>
                <div class="input">Mã đơn hàng: ${accounts[i].cart[j].idIndent}  </div>
                <div class="input">Họ và tên: ${accounts[i].cart[j].nameCustomer}  </div>
                <div class="input">Email: ${accounts[i].cart[j].email}</div>
                <div class="input">SĐT: ${accounts[i].cart[j].numPhone}</div>
                 <div class="input">Địa chỉ: ${accounts[i].cart[j].address}</div>
                <div class="input">Ghi chú: ${accounts[i].cart[j].note} </div>    
                <div class="input">Thời gian đặt hàng: ${accounts[i].cart[j].dateBuy}</div>         
            </div>
            <div id="payment_box">
                <h2 class="titleIndent">Đơn hàng</h2>
                <div id="infoCart-cart--${i}--${j}">
                </div>
                <div id="couponDiscount">
                    <div id="couponDiscount--${i}--${j}" class="input">Mã giảm giá đã nhập:</div>
                </div>
                <div id="pay--${i}--${j}" class="pay">
                    <div id="paymentInfo">
                        <div id="text">Tạm tính</div>
                        <div class="priceProduct" id="priceTotalTemp-cart--${i}--${j}">${accounts[i].cart[j].priceTotalTemp}₫</div>
        
                    </div>
                    <div id="paymentInfo">
                        <div id="text">Vận chuyển (Thanh toán khi nhận hàng)</div>
                        <div class="priceProduct" id="priceTrans-cart--${i}--${j}">${accounts[i].cart[j].priceTrans}₫</div>
        
                    </div>
                </div>
                <div id="totalCash">
                    <div id="textTotal" >Tổng cộng</div>
                    <div id="priceProductTotal-cart--${i}--${j}" class="priceProductTotal-cart">${accounts[i].cart[j].priceProductTotal}₫</div>
                </div>
                <div class="btn-func" id="btn-func--${i}--${j}">
                    <button class="btn-confirm">${accounts[i].cart[j].state}</button>
                </div>
            </div>
            
        </div>
        
                `
                if (accounts[i].cart[j].discount.nameDiscount != null) {
                    document.getElementById("pay--" + i + "--" + j).innerHTML += ` <div id="paymentInfo">
                <div id="text" class="nameDiscount">Mã ${accounts[i].cart[j].discount.nameDiscount}</div>
                <div class="priceProduct" id="priceDisscount">-${accounts[i].cart[j].discount.priceDiscount}₫</div>
            </div>`
                    document.getElementById("couponDiscount--" + i + "--" + j).innerText += " " + accounts[i].cart[j].discount.codeDiscount;
                }
                if (accounts[i].cart[j].state == 'Chờ thanh toán') {
                    document.getElementById("btn-func--" + i + "--" + j).innerHTML = `<button>${accounts[i].cart[j].state}</button>`;
                }
                if (accounts[i].cart[j].dateConfirm != null) {
                    document.getElementById("infoIndent--" + i + "--" + j).innerHTML += `<div class="input">Ngày xác nhận: ${accounts[i].cart[j].dateConfirm} </div>`

                }
                if (accounts[i].cart[j].datePay != null) {
                    document.getElementById("infoIndent--" + i + "--" + j).innerHTML += `<div class="input">Ngày thanh toán: ${accounts[i].cart[j].datePay} </div>`

                }
                let infoCart_cart = document.getElementById("infoCart-cart--" + i + "--" + j);
                // let priceTotalTemp_cart = document.getElementById("priceTotalTemp-cart--" + i + "--" + j);
                // let priceTrans_cart = document.getElementById("priceTrans-cart--" + i + "--" + j);
                // let priceProductTotal_cart = document.getElementById("priceProductTotal-cart--" + i + "--" + j);
                // let totalCost_cart = 0;
                // let trans_cart = 15000;
                for (let k = 0; k < accounts[i].cart[j].product.length; k++) {
                    // totalCost_cart += accounts[i].cart[j].product[k].incart * accounts[i].cart[j].product[k].price;
                    infoCart_cart.innerHTML += `<div class="product">
                            <div id="img"><img src="${accounts[i].cart[j].product[k].img}" alt=""><span>${accounts[i].cart[j].product[k].incart}</span></div>
                            <div id="infoProduct">
                                <div id="nameProduct">${accounts[i].cart[j].product[k].name}</div>
                                <div id="describeProduct"></div>
                            </div>
                            <div class="priceProduct">${accounts[i].cart[j].product[k].incart*accounts[i].cart[j].product[k].price}₫</div>
                        </div>`
                }
                // priceTotalTemp_cart.textContent = totalCost_cart + "₫";
                // priceTrans_cart.textContent = trans_cart + "₫";
                // priceProductTotal_cart.textContent = totalCost_cart + trans_cart + "₫";
            }
        }
    }
    // console.log(accounts.length);

    //     sectionId.innerHTML +=
    //         `<div id="btn-logOut"> <button type="button" onclick="logOut()" >Đăng xuất</button></div>`;
    //     displayIndent();
    // }

    // function displayIndent() {
    //     let indentAccounts = document.querySelectorAll("#btn-showIndent_customer");
    //     // console.log(indentAccounts[0]);
    //     for (let i = 0; i < indentAccounts.length; i++) {
    //         indentAccounts[i].addEventListener('click', () => {
    //             // console.log(accounts[i + 2]);
    //             if (accounts[i + 2].cart.length) {
    //                 if (accounts[i + 2].stateDisplay == false) {
    //                     document.getElementsByClassName("showIndent_customer")[i].style.height = "33.5rem";

    //                     document.getElementsByClassName("box_title")[i].innerHTML = `
    //                     <div class="infoIndent_content_admin_title">
    //                     <div id="nameIndent">Đơn hàng</div>
    //                     <div id="date">Ngày</div>
    //                     <div id="address">Chuyển đến</div>
    //                    <div id="price">Giá trị đơn hàng</div>
    //                     <div id="state">Trạng thái</div>
    //                 </div>`
    //                     console.log(accounts[i + 2].cart);
    //                     for (let j = 0; j < accounts[i + 2].cart.length; j++) {
    //                         document.getElementsByClassName("showIndent_customer")[i].innerHTML += `<div class="infoIndent_content_admin">
    //                             <div id="nameIndent"><img src="${accounts[i+2].cart[j].img}"> ${accounts[i+2].cart[j].name}</div>
    //                             <div id="date">${accounts[i+2].cart[j].date}</div>
    //                             <div id="address">Địa chỉ</div>
    //                            <div id="price">${accounts[i+2].cart[j].price}₫ x ${accounts[i+2].cart[j].incart} = ${accounts[i+2].cart[j].price*accounts[i+2].cart[j].incart}₫</div>
    //                             <div id="state">Đã thanh toán</div>
    //                             </div>`;
    //                     }
    //                     accounts[i + 2].stateDisplay = true;
    //                 } else {
    //                     document.getElementsByClassName("showIndent_customer")[i].style.height = "0rem";

    //                     document.getElementsByClassName("box_title")[i].innerHTML = '';
    //                     document.getElementsByClassName("showIndent_customer")[i].innerHTML = '';
    //                     accounts[i + 2].stateDisplay = false;
    //                 }
    //             } else
    //                 alert("Tài khoản chưa mua sản phẩm")


    //             // console.log("hello");

    //         });
    //         // console.log(accounts[i + 1].cart.length);

    //     }
}

function showIndentCustomer(id) {

    if (document.getElementById("customer--content--" + id).style.display === 'none') {
        document.getElementById("customer--content--" + id).style.display = 'block';
        document.getElementById("customer--" + id).style.width = "60%";

    } else {
        document.getElementById("customer--content--" + id).style.display = 'none';
        document.getElementById("customer--" + id).style.width = "30%";

    }

}
// displayIndent();
if (currentAccount.type == 'user') {
    htmlUser();
}
if (currentAccount.type == 'none') {
    htmlNone();
}

if (currentAccount.type == 'admin') {
    htmlAdmin();
}

function SignUp() {
    let flagUser_signUp = true;
    let lastName = document.getElementById("lastName").value;
    let firstName = document.getElementById("firstName").value;
    let phone = document.getElementById("phone").value;
    let userName_signUp = document.getElementById("userName_signUp").value;
    let password_signUp = document.getElementById("password_signUp").value;
    console.log(lastName);
    if (lastName == '' || firstName == '' || phone == '' || userName_signUp == '' || password_signUp == '')
        alert("Vui lòng điền đầy đủ thông tin");
    else {
        if (userName_signUp.length < 10)
            alert("Tài khoản tối thiểu 10 ký tự!!")
        else {
            for (let i = 0; i < accounts.length; i++) {
                if (accounts[i].username == userName_signUp) {
                    flagUser_signUp = false;
                }
            }
            if (flagUser_signUp == true) {
                alert("Đăng kí thành công!!");
                accounts.push({ id: accounts.length, firstName: firstName, lastName: lastName, Phone: phone, username: userName_signUp, password: password_signUp, type: 'user', cart: [], stateDisplay: false, cartTemp: [], idAccount: makeid() });
                localStorage.setItem('allAccount', JSON.stringify(accounts));
                window.location.href = "/resource/html/account.html";
                console.log(accounts);
            } else {
                alert("Tên tài khoản không phù hợp!!");
            }
        }
    }


}

function getInfo() {
    let flagUser = false;
    let flagPass = false;
    let username = document.getElementById("userName").value;
    let password = document.getElementById("passWord").value;
    for (let i = 0; i < accounts.length; i++) {
        if (username == accounts[i].username) {
            flagUser = true;
            if (password == accounts[i].password) {
                localStorage.setItem('currentAccount', JSON.stringify(accounts[i]));
                flagPass = true;
            }
            break;
        }
    }

    if (flagUser == false) {
        alert("Tai khoan khong ton tai");
    } else {
        if (flagPass == false) {
            alert("Mat khau khong dung")
        } else {
            alert("Dang nhap thanh cong");
            document.getElementById("section").innerHTML = '';
            currentAccount = localStorage.getItem('currentAccount');
            currentAccount = JSON.parse(currentAccount);
            console.log(currentAccount);
            if (currentAccount.type == 'user') {
                htmlUser();
            }
            if (currentAccount.type == 'admin') {
                htmlAdmin();
                window.location.href = "/resource/html/account.html";
            }
        }


    }
}

function logOut() {
    accounts[currentAccount.id] = currentAccount;
    localStorage.setItem('allAccount', JSON.stringify(accounts));
    localStorage.setItem('currentAccount', JSON.stringify(accounts[0]));
    window.location.href = '/resource/html/account.html';
}

function eventEnter() {
    var input = document.getElementById("section");
    input.addEventListener("keyup", function(event) {
        if (event.keyCode == 13) {
            getInfo();
        }

    })
}



eventEnter();