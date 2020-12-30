onLoadCartNumbers();
let kindProduct = document.getElementById("kind");
let option = document.querySelectorAll("#kind");
let nameProduct = document.getElementById("nameProduct");
let imgProduct = document.getElementById("img_front");
let imgBackProduct = document.getElementById("img_back");
let priceProduct = document.getElementById("priceProduct");
let colorProduct = document.getElementById("colorProduct");
let detailProduct = document.getElementById("detail");
let genreProduct = document.getElementById("genre");
let inp = document.querySelectorAll(".inp");

for (var i = 0; i < option.length; i++) {
    option[i].addEventListener('click', () => {
        kind();
    });
}

function kind() {
    switch (kindProduct.value) {
        case 'top':
            document.getElementById("genre").innerHTML =
                `<option value="t-shirt">t_shirt</option>
                <option value="hoodie">hoddie</option>
                <option value="jacket">jacket</option>`;
            break;
        case 'bottom':
            document.getElementById("genre").innerHTML =
                `<option value="pant">pant</option>
                <option value="short">short</option>
                 <option value="jean">jean</option>`;
            break;
        case 'bag':
            document.getElementById("genre").innerHTML =
                `<option value="backpack">backpack</option>
                <option value="bowler_bag">bowler_bag</option>`
            break;
    }
}




function save() {
    let flag = true;

    let numberPrice = priceProduct.value;
    numberPrice = parseInt(numberPrice);
    for (let i = 0; i < inp.length; i++)
        if (inp[i].value == '')
            flag = false;

    if (!numberPrice || numberPrice < 0) {
        alert("Nhap lai gia tien san pham!!!");
        flag = false;
    } else {
        if (flag == true) {
            console.log("ok");
            products.push({
                name: nameProduct.value,
                tag: nameProduct.value.replace(/ /g, ""),
                img: "/img/" + kindProduct.value + "s/" + imgProduct.value.slice(12),
                img_back: "/img/" + kindProduct.value + "s/" + imgBackProduct.value.slice(12),
                color: colorProduct.value,
                detail: detailProduct.value,
                price: numberPrice,
                incart: 0,
                kind: kindProduct.value,
                genre: genreProduct.value

            })
            localStorage.setItem('allProduct', JSON.stringify(products));
            console.log(products);
            alert("Thêm sản phẩm thành công");
            window.location.href = "/resource/html/addProduct_Admin.html";
        } else alert("Vui lòng nhập đủ thông tin!!");
    }





    // console.log(document.getElementById("img_front").value);

    // console.log(document.getElementById("img_front").value.slice(12));
    // // console.log(document.getElementById("gender").value);
}