function getGenre(name, sub) {
    localStorage.setItem('kind', name);
    localStorage.setItem('genre', sub);
}

function transformPageSearch() {
    var input = document.getElementById("box_search");
    input.addEventListener("keyup", function(event) {
        if (event.keyCode == 13) {
            localStorage.setItem('inputSearch', input.value);
            window.location.href = "/resource/html/search.html";

        }

    })
}

function onLoadCartNumbers() {

    if (localStorage.getItem('allProduct') != null) {

        products = localStorage.getItem('allProduct');
        products = JSON.parse(products);
    }
    if (localStorage.getItem('allAccount') != null) {

        accounts = localStorage.getItem('allAccount');
        accounts = JSON.parse(accounts);
    }
    if (localStorage.getItem('currentAccount') != null) {
        currentAccount = localStorage.getItem('currentAccount');
        currentAccount = JSON.parse(currentAccount);
    }


    // console.log(currentAccount);

    if (localStorage.getItem('idIndent') != null) {
        idIndent = localStorage.getItem('idIndent');
        idIndent = JSON.parse(idIndent);
    }
    if (localStorage.getItem('listDiscount') != null) {
        listDiscount = localStorage.getItem('listDiscount');
        listDiscount = JSON.parse(listDiscount);
    }
    if (currentAccount.type == 'admin') {
        document.getElementById("menu-header").innerHTML += `<li>
            <a>Admin</a>
            <ul class="menu__sub">
                <li><a href="/resource/html/addProduct_Admin.html">add product</a></li>
                <li><a href="/resource/html/admin.html">remove product</a></li>
                <li>
                    <a style="color: white;" data-toggle="modal" data-target="#myModal">set discount</a>
                </li>
            </ul>
        </li>`


        document.getElementById("boxNotification").innerHTML = `<a href="/resource/html/notification.html" class="icon cart-head"><img id="imgNotice" src="/img/notification.png" alt="">
            <span id="noticeNumber">0</span></a>`;
        notification();

    }
    displayCartNumbers();


}

function setDiscount() {
    let discount = {};
    let bool = true;
    let name = document.getElementById("nameDisccount").value;
    let amount = document.getElementById("amountDisscount").value;
    let code = document.getElementById("codeDisscount").value;
    let cost = document.getElementById("CostDisscont").value;
    amount = parseInt(amount);
    cost = parseInt(cost);
    if (name === '' || amount === '' || code === '' || cost === '') {
        bool = false;
        alert("Vui lòng nhập đầy đủ thông tin")
    } else {
        if (!amount) {
            alert("Nhập lại số lượng");
            bool = false;
        }
        if (!cost) {
            alert("Nhập lại số tiền");
            bool = false;
        }
        if (code.length > 10) {
            alert("Mã code tối đa 10 ký tự");
            bool = false;
        } else {

        }

    }
    if (bool == true) {
        discount.name = name;
        discount.amount = amount;
        discount.cost = cost;
        discount.code = code;
        discount.user = [];
        listDiscount.push(discount);
        // console.log(listDiscount);
        localStorage.setItem('listDiscount', JSON.stringify(listDiscount));
        alert("Thêm thành công");
    }

}

function displayCartNumbers() {
    if (currentAccount.type != 'admin') {
        let tmp = 0;
        for (let i = 0; i < currentAccount.cartTemp.length; i++) {
            tmp += currentAccount.cartTemp[i].incart;
        }
        document.getElementsByClassName("cart-count")[0].textContent = tmp;
    }
}

function notification() {
    let countNotification = 0;
    for (let i = 0; i < accounts[1].notice.length; i++) {
        if (accounts[1].notice[i].seen == false)
            countNotification += 1;
    }
    if (countNotification > 0) {
        document.getElementById("imgNotice").style.animation = "demo 0.15s infinite";
    } else {
        document.getElementById("imgNotice").style.animation = "";
    }
    document.getElementById("noticeNumber").innerHTML = `<span>${countNotification}</span>`
}

function makeid() {
    let text = "";
    let possible = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";
    for (let i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}


transformPageSearch();