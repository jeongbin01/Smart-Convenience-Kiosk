
// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
  // 테마 설정
  initTheme();
  
  // 상품 목록 표시
  renderProducts('all');
  
  // 이벤트 리스너 설정
  setupEventListeners();
});

// 테마 초기화
function initTheme() {
  const themeSwitch = document.getElementById('theme-switch');
  
  // 저장된 테마가 있으면 적용
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
    themeSwitch.checked = true;
  }
  
  // 야간 모드 자동 설정 (저녁 6시 ~ 아침 6시)
  const currentHour = new Date().getHours();
  if (!savedTheme && (currentHour >= 18 || currentHour < 6)) {
    document.body.setAttribute('data-theme', 'dark');
    themeSwitch.checked = true;
    localStorage.setItem('theme', 'dark');
  }
  
  // 테마 변경 이벤트
  themeSwitch.addEventListener('change', function() {
    if (this.checked) {
      document.body.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  });
}

// 이벤트 리스너 설정
function setupEventListeners() {
  // 카테고리 버튼 클릭 이벤트
  const categoryButtons = document.querySelectorAll('.category-btn');
  categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
      const category = this.dataset.category;
      
      // 활성 카테고리 표시 업데이트
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // 선택한 카테고리에 맞는 상품 표시
      renderProducts(category);
    });
  });
  
  // 장바구니 버튼 클릭 이벤트
  const cartButton = document.getElementById('cart-btn');
  if (cartButton) {
    cartButton.addEventListener('click', function() {
      window.location.href = 'checkout.html';
    });
  }
}

// 상품 목록 표시
function renderProducts(categoryFilter) {
  const productsContainer = document.getElementById('products-container');
  const products = getProducts();
  
  // 컨테이너 비우기
  productsContainer.innerHTML = '';
  
  // 선택한 카테고리에 맞는 상품 필터링
  const filteredProducts = categoryFilter === 'all' 
    ? products 
    : products.filter(product => product.category === categoryFilter);
  
  // 상품이 없으면 메시지 표시
  if (filteredProducts.length === 0) {
    productsContainer.innerHTML = `
      <div class="no-products">
        <p>해당 카테고리에 상품이 없습니다.</p>
      </div>
    `;
    return;
  }
  
  // 상품 카드 생성
  filteredProducts.forEach(product => {
    const productElement = createProductCard(product);
    productsContainer.appendChild(productElement);
  });
}

// 상품 카드 생성
function createProductCard(product) {
  const template = document.getElementById('product-template');
  const productCard = document.importNode(template.content, true);
  
  // 상품 이미지
  const productImage = productCard.querySelector('.product-image img');
  productImage.src = product.image;
  productImage.alt = product.name;
  
  // 상품 정보
  productCard.querySelector('.product-name').textContent = product.name;
  productCard.querySelector('.product-price').textContent = `${product.price.toLocaleString()}원`;
  
  // 재고 상태
  const inventoryElement = productCard.querySelector('.inventory');
  
  if (product.inventory <= 0) {
    inventoryElement.textContent = '품절';
    inventoryElement.classList.add('soldout');
    productCard.querySelector('.add-to-cart-btn').disabled = true;
  } else if (product.inventory <= 3) {
    inventoryElement.textContent = `남은 수량: ${product.inventory}`;
    inventoryElement.classList.add('low');
  } else {
    inventoryElement.textContent = `남은 수량: ${product.inventory}`;
  }
  
  // 장바구니 담기 버튼
  const addToCartBtn = productCard.querySelector('.add-to-cart-btn');
  addToCartBtn.addEventListener('click', function() {
    // 장바구니에 상품 추가 성공하면 재고 감소
    if (addToCart(product)) {
      // 재고 감소
      const newInventory = product.inventory - 1;
      updateProductInventory(product.id, newInventory);
      
      // 품절 처리
      if (newInventory <= 0) {
        inventoryElement.textContent = '품절';
        inventoryElement.classList.add('soldout');
        this.disabled = true;
      } else {
        inventoryElement.textContent = `남은 수량: ${newInventory}`;
        if (newInventory <= 3) {
          inventoryElement.classList.add('low');
        }
      }
      
      // 상품 목록 새로고침 없이 재고 UI만 업데이트
      product.inventory = newInventory;
    }
  });
  
  return productCard.firstElementChild;
}