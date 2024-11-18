const productGrid = document.querySelector('.product-grid');
const priceSlider = document.querySelector('.price-slider');
const priceInputs = document.querySelectorAll('.price-input');
const applyFilters = document.querySelector('.apply-filters');
const NumberCart = document.querySelector('#Number-Of-Item-In-Cart')
let allProducts = [];
async function getProducts()
{
    data = await axios.get('http://127.0.0.1:8000/api/getproducts/0')
    allProducts = data.data
    console.log(allProducts)
    displayProducts(allProducts)
    cartCounter(allProducts)
}



function cartCounter(data)
{
    let total = data.reduce((acc, product) => acc + product.product_cartQuantity, 0)
    NumberCart.style.display = total? 'flex': 'none'
    NumberCart.innerHTML = total
}

function createCards(product, index, data)
{
    let productCard = document.createElement('div')
    productCard.classList.add('product-card')
    
    productCard.innerHTML = `
    ${index >= Math.floor(data.length/2)? `<span class="badge">New</span>` : ''}
    <div class="product-image">
    <img src="http://127.0.0.1:8000/api${product.product_img}" alt="${product.product_name}">
    </div>
    <div class="product-info">
    <div class="product-category">${product.product_category}</div>
    <h3>${product.product_name}</h3>
    <div class="product-rating">⭐⭐⭐⭐⭐ <span>(4.8)</span></div>
    <p>${product.product_desc}</p>
    <span class="price">$${product.product_price}</span>
    <div class="product-actions">
    <button class="add-to-cart" data-id="${product.id}">${product.product_isInCart? `In cart: ${product.product_cartQuantity}`: 'add to cart'}</button>    
    <button class="buy-now" data-id="${product.id}">Buy Now</button>
    </div>
    </div>`
    
    productGrid.appendChild(productCard)
}

function displayProducts(data)
{
    productGrid.innerHTML = ''
    data.forEach((product, index) => {
        createCards(product, index, data)
    });
    
    let addToCart = document.querySelectorAll('.add-to-cart')
    buyProduct(addToCart)
}


async function buyProduct(btns)
{
    btns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            let id = e.target.getAttribute('data-id')
            await axios.put(`http://127.0.0.1:8000/api/cartitems/${id}`, {product_isInCart: true})
        })
    })
}



// -----FILTERS-------
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

getProducts()