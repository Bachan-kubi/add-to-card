const productContainer = document.querySelector(".product-list");
const isProductDetails = document.querySelector(".product-detail");

//1- if it has product list
if (productContainer) {
  displayProducts();
} else if (isProductDetails) {
  displayProductDetails();
}

//2- display product
function displayProducts() {
  products.forEach((product) => {
    console.log(product);
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
            <div class="img-box">
                <img src="${product.colors[0].mainImage}" alt="${product.title}" />
            </div>
            <h2 class="title">${product.title}</h2>
            <span class="price">${product.price}.00</span>
        `;

    productContainer.appendChild(productCard);

    const imgBox = productCard.querySelector(".img-box");
    console.log(imgBox);
    imgBox.addEventListener("click", () => {
      sessionStorage.setItem("selectProduct", JSON.stringify(product));
      window.location.href = "product-details.html";
    });
  });
}

// 3 display product details 
function displayProductDetails(){
    const productData = JSON.parse(sessionStorage.getItem("selectProduct"));
    console.log(productData);

    
    const title = document.querySelector('.title');
    const thumbnailImage = document.querySelector('.thumbnail-img');
    const mainImg = document.querySelector('.main-img');
    const price = document.querySelector('.price');
    const sizeOption = document.querySelector('.size-options');
    const colorOption = document.querySelector('.color-options');
    const description = document.querySelector('.description');
    const addToCardBtn = document.querySelector('.btn-addToCard');
    const thumbnailList = document.querySelector(".thumbnail-img");

    // 3-default size and color if no color
    let selectedColor = productData.colors[0];
    let selectedSize =selectedColor.size[0];

    //4- upadate product data
    function updateProductDisplay(colorDAta){
      if(!colorDAta.size.includes(selectedSize)){
        selectedSize = colorDAta.size[0]
      }
    }
    mainImg.innerHTML = `<img src="${colorDAta.mainImage} alt="main image" />`
    
    

}
