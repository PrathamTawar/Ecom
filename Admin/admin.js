const toggleFormBtn = document.getElementById('toggle-form-btn');
const formSection = document.getElementById('form-section');
const productForm = document.getElementById('product-form');
const productsTableBody = document.querySelector('.products-table').querySelector('tbody');
const statValue = document.querySelector('.stat-value');


toggleFormBtn.addEventListener('click', () => {
    formSection.classList.toggle('active');
});

// Fetch products data from an API and populate the table
async function fetchProducts() {
    try {
        let products = await axios.get('http://127.0.0.1:8000/api/getproducts/0');
        products = products.data.reverse()
        // Clear existing rows
        productsTableBody.innerHTML = '';
        statValue.innerHTML = products.length
        // Add new rows
        products.forEach(product => {
            productsTableBody.innerHTML += `
            <tr>
            <td>
            <div class="product-cell">
            <img src="http://127.0.0.1:8000/api${product.product_img}" alt="${product.product_name}" class="product-image">
            <div class="product-info">
            <div class="product-name">${product.product_name}</div>
            <div class="product-category">${product.product_category}</div>
            </div>
            </div>
            </td>
            <td>${product.product_category}</td>
            <td class="price">$${product.product_price}</td>
            <td>
            <div class="actions">
            <button href="#edit-form-section" class="action-btn" id='Edit' data-id="${product.id}">✏️</button>
            <button class="action-btn" id='Delete' data-id="${product.id}">🗑️</button>
            </div>
            </td>
            </tr>
            `;
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
    
}

const editFormSection = document.getElementById('edit-form-section');
const editProductForm = document.getElementById('edit-product-form');
const cancelEditBtn = document.getElementById('cancel-edit');

async function editProduct(id) 
{
    let product = await axios.get(`http://127.0.0.1:8000/api/getproducts/${id}`);
    product = product.data;

    document.getElementById('edit-product-id').value = id;
    document.getElementById('edit-product-name').value = product.product_name;
    document.getElementById('edit-product-description').value = product.product_desc;
    document.getElementById('edit-product-category').value = product.product_category;
    document.getElementById('edit-product-price').value = product.product_price;


    document.getElementById('form-title-id').innerHTML = `Edit Product Id: ${id}`;

    editFormSection.classList.add('active');
    formSection.classList.remove('active'); 
}

editProductForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('edit-product-id').value;
    const name = document.getElementById('edit-product-name').value;
    const desc = document.getElementById('edit-product-description').value;
    const category = document.getElementById('edit-product-category').value;
    const price = document.getElementById('edit-product-price').value;
    const image = document.getElementById('edit-product-image').files[0];

    console.log(id, name, desc, category, price, image)
    
    let formData = new FormData();
    formData.append('product_name', name);
    formData.append('product_desc', desc);
    formData.append('product_category', category);
    formData.append('product_price', price);
    formData.append('product_img', image);


    changeProduct(id, 'put', formData);
});


cancelEditBtn.addEventListener('click', () => {
    editFormSection.classList.remove('active');
    editProductForm.reset();
});

productsTableBody.addEventListener('click', (e) => {
    let btn = e.target
    let id = btn.getAttribute('data-id');
    if(btn.id == 'Delete')
        {
            changeProduct(id, 'delete');
        }
        else if(btn.id == 'Edit')
            {
                editProduct(id);
            }
})
async function changeProduct(id, method, editedData = {})
{
    await axios({method: `${method}`, url: `http://127.0.0.1:8000/api/changeproducts/${id}`, data: editedData});
    fetchProducts();
}
        
        
// Handle product form submission
productForm.addEventListener('submit', async(e) => {
    e.preventDefault();
    const name = document.getElementById('product-name').value;
    const desc = document.getElementById('product-description').value;
    const category = document.getElementById('product-category').value;
    const price = document.getElementById('product-price').value;
    const image = document.getElementById('product-image').files[0];
    
    let formData = new FormData();
    formData.append('product_name', name);
    formData.append('product_desc', desc);
    formData.append('product_category', category);
    formData.append('product_price', price);
    formData.append('product_img', image);
    
    const response = await axios.post('http://127.0.0.1:8000/api/setproducts', formData);
    
    if(response.status == 200)
        {
            fetchProducts();
            productForm.reset();
        }
        else
        {
            alert("Form Not Submitted")
        }  
});
// Initialize the table with API data
fetchProducts();