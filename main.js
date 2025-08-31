const productContainer = document.querySelector(".product-list");
const isProductDetails = document.querySelector(".product-detail");
const isCartPage = document.querySelector(".cart");
console.log(isCartPage);

//1- if it has product list
if (productContainer) {
  displayProducts();
} else if (isProductDetails) {
  displayProductDetails();
} else if (isCartPage) {
  displayCart();
}

//2- display product
function displayProducts() {
  products.forEach((product) => {
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
    imgBox.addEventListener("click", () => {
      sessionStorage.setItem("selectProduct", JSON.stringify(product));
      window.location.href = "product-details.html";
    });
  });
}

// 3 display product details
function displayProductDetails() {
  const productData = JSON.parse(sessionStorage.getItem("selectProduct"));
  console.log(productData);

  const title = document.querySelector(".title");
  // const thumbnailImage = document.querySelector(".thumbnail-img");
  const mainImg = document.querySelector(".main-img");
  const price = document.querySelector(".price");
  const sizeOption = document.querySelector(".size-options");
  const colorOption = document.querySelector(".color-options");
  const description = document.querySelector(".description");
  const addToCardBtn = document.querySelector("#btn-addToCard");
  const thumbnailList = document.querySelector(".thumbnail-img");

  // 3-default size and color if no color
  let selectedColor = productData.colors[0];
  let selectedSize = selectedColor.sizes[0];

  //4- upadate product data
  function updateProductDisplay(colorData) {
    if (!colorData.sizes.includes(selectedSize)) {
      selectedSize = colorData.sizes[0];
    }
    // 5- show main image when its clicked
    mainImg.innerHTML = `<img src="${colorData.mainImage}" alt="main image" />`;
    thumbnailList.innerHTML = "";
    const allThumbnails = [colorData.mainImage].concat(
      colorData.thumbnails.slice(0, 3)
    );
    allThumbnails.forEach((thumb) => {
      const img = document.createElement("img");
      img.src = thumb;
      thumbnailList.appendChild(img);
      img.addEventListener("click", () => {
        mainImg.innerHTML = `<img src="${thumb}" alt="main image" />`;
      });
    });
    colorOption.innerHTML = "";
    productData.colors.forEach((color) => {
      const img = document.createElement("img");
      img.src = color.mainImage;
      if (color.name === productData.name) {
        img.classList.add("selected");
      }
      colorOption.appendChild(img);
      img.addEventListener("click", () => {
        selectedColor = color;
        updateProductDisplay(color);
      });
    });
    sizeOption.innerHTML = "";
    selectedColor.sizes.forEach((size) => {
      const btn = document.createElement("button");
      btn.textContent = size;
      if (size === selectedSize) {
        btn.classList.add("selected");
      }
      sizeOption.appendChild(btn);
      btn.addEventListener("click", () => {
        document.querySelectorAll(".size-options button").forEach((el) => {
          el.classList.remove("selected");
          btn.classList.add("selected");
          selectedSize = size;
        });
      });
    });
  }
  title.textContent = productData.title;
  price.textContent = productData.price;
  description.textContent = productData.description;
  updateProductDisplay(selectedColor);

  addToCardBtn.addEventListener("click",()=>{
    console.log(productData, selectedColor, selectedSize);
    addToCart(productData, selectedColor, selectedSize);
    // alert("Item added to cart");
  });
}

// add button for cart fucntion 
function addToCart(product, color, size){
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  const existingItems = cart.find((item)=>{
    return item.id===product.id && item.color === color.name && item.size === size
  });
  if(existingItems){
    existingItems.quantity +=1;
  }else{
    cart.push({
      id: product.id,
      title: product.title,
      color: color.name,
      size: size,
      quantity: 1,
      image: color.mainImage,
      price: product.price,

    });
  }
  sessionStorage.setItem("cart", JSON.stringify(cart));
  console.log("New item added:", existingItems);
}
// 4 display cart page
function displayCart(){
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  const cartItemContainer = document.querySelector(".cart-items");
  const subTotal = document.querySelector(".subtotal");
  const grandTotal = document.querySelector(".grand-total");
  cartItemContainer.innerHTML = "";
  if(cart.length === 0){
    cartItemContainer.innerHTML = "<p>Your cart is empty</p>";
    subTotal.textContent = "0.00";
    grandTotal.textContent = "0.00";
    return;
  }
  let subtotal = 0;
  cart.forEach((item, index)=>{
    const itemTotal = parseFloat(item.price.replace("$", "")) * item.quantity;
    subtotal += itemTotal;
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
    
        <div class="product">
          <img src="${item.image}">
          <div class="item-detail">
            <p>${item.title}</p>
            <div class="size-color-box">
              <span class="size">${item.size}</span>
              <span class="color">${item.color}</span>
            </div>
          </div>
        </div>
        <span class="price">${item.price}</span>
        <div class="quantity">
          <input type="number" value="${item.quantity}" data-id="${index}" min="1" />
        </div>
        <span class="total-price">${itemTotal}</span>
        <button class="remove-btn" data-id="${index}"><i class="ri-delete-bin-line"></i>Remove</button>
      
    `;
    cartItemContainer.appendChild(cartItem);
  });

  subtotal.textContent = `${subtotal.toFixed(2)}`;
  grandTotal.textContent = `${subtotal.toFixed(2)}`;
}

