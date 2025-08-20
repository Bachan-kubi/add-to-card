
const productContainer = document.querySelector('.product-list');

//1- if it has product list
if(productContainer){
    displayProducts();
}
//2- display product 
function displayProducts(){
    products.forEach(product => {
        console.log(product);
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <div class="img-box">
                <img src="${product.colors[0].mainImage}" alt="${product.title}" />
            </div>
            <h2 class="title">${product.title}</h2>
            <span class="price">${product.price}.00</span>
        `;

        productContainer.appendChild(productCard);

        const imgBox = productCard.querySelector('.img-box');
        console.log(imgBox);
        imgBox.addEventListener('click', () => {
            sessionStorage.setItem("selectProduct", JSON.stringify(product));
            window.location.href = "product-details.html";
        });
    })

        
}
