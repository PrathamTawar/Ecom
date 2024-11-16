const productGrid = document.querySelector('.product-grid');
const priceSlider = document.querySelector('.price-slider');
const priceInputs = document.querySelectorAll('.price-input');
const applyFilters = document.querySelector('.apply-filters');
let allProducts = [];
async function getProducts()
{
    data = await axios.get('http://127.0.0.1:8000/api/getproducts/0')
    allProducts = data.data
    console.log(allProducts)
    displayProducts(allProducts)
}

getProducts()


function displayProducts(data)
{
    productGrid.innerHTML = ''
    data.forEach(product => {

        let productCard = document.createElement('div')
        productCard.classList.add('product-card')

        productCard.innerHTML = `
                    <span class="badge">New</span>
                    <div class="product-image">
                        <img src="http://127.0.0.1:8000/api${product.product_img}" alt="${product.product_name}">
                    </div>
                    <div class="product-info">
                        <div class="product-category">${product.product_category}</div>
                        <h3>${product.product_name}</h3>
                        <div class="product-rating">⭐⭐⭐⭐⭐ <span>(4.8)</span></div>
                        <p>${product.product_desc}</p>
                        <span class="price">$${product.product_price}</span>
                    </div>`

        productGrid.appendChild(productCard)

        let productActions = document.createElement('div')
        productCard.appendChild(productActions)
        productActions.classList.add('product-actions')

        let addToCartBtn = document.createElement('button')
        addToCartBtn.classList.add('add-to-cart')
        addToCartBtn.textContent = 'Add to Cart'
        let buyNowBtn = document.createElement('button')
        buyNowBtn.classList.add('buy-now')
        buyNowBtn.textContent = 'Buy Now'
        productActions.appendChild(addToCartBtn)
        productActions.appendChild(buyNowBtn)
        
    });
}


function filterByPriceRange(min, max)
{
    let filteredProducts = allProducts.filter(product => min <= product.product_price && product.product_price <= max)
    displayProducts(filteredProducts)
}

applyFilters.addEventListener('click', () => {
    let min = priceInputs[0].value
    let max = priceInputs[1].value
    priceSlider.setAttribute('min', min)
    priceSlider.setAttribute('max', max)
    filterByPriceRange(min, max)
})

priceSlider.addEventListener('change', (e) => {
    
    let minPrice = e.target.min
    let price = e.target.value
    
    filterByPriceRange(minPrice, price)
})
