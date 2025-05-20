// DOM이 로드된 후 실행
document.a3ddEventListener('DOMContentLoaded', function () {
  initTheme();
  initCategories();
  renderProducts('all');
  setupEventListeners();
});

// 테마 초기화
function initTheme() {
  const themeSwitch = document.getElementById('theme-switch');
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
    themeSwitch.checked = true;
  }

  const currentHour = new Date().getHours();
  if (!savedTheme && (currentHour >= 18 || currentHour < 6)) {
    document.body.setAttribute('data-theme', 'dark');
    themeSwitch.checked = true;
    localStorage.setItem('theme', 'dark');
  }

  themeSwitch.addEventListener('change', function () {
    if (this.checked) {
      document.body.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  });
}

// 카테고리 초기화
function initCategories() {
  const categoryContainer = document.querySelector('.category-container');
  if (!categoryContainer) return;

  // 기존 버튼들을 지우고 동적으로 생성
  categoryContainer.innerHTML = '';

  // categories 배열에서 동적으로 버튼 생성
  categories.forEach(category => {
    const button = document.createElement('button');
    button.className = 'category-btn';
    button.dataset.category = category.id;
    button.textContent = category.name;

    // 전체 카테고리를 기본으로 active
    if (category.id === 'all') {
      button.classList.add('active');
    }

    categoryContainer.appendChild(button);
  });
}

// 이벤트 리스너 설정
function setupEventListeners() {
  // 카테고리 버튼 클릭
  const categoryButtons = document.querySelectorAll('.category-btn');
  categoryButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      categoryButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      renderProducts(this.dataset.category);
    });
  });

  // 장바구니 버튼 클릭
  const cartButton = document.getElementById('cart-btn');
  if (cartButton) {
    cartButton.addEventListener('click', () => {
      window.location.href = 'checkout.html';
    });
  }

  // 검색 기능
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  if (searchInput && searchBtn) {
    searchBtn.addEventListener('click', () => searchProducts(searchInput.value));
    searchInput.addEventListener('keyup', e => {
      if (e.key === 'Enter') searchProducts(searchInput.value);
    });
  }
}

// 상품 검색
function searchProducts(query) {
  const container = document.getElementById('products');
  const all = !query.trim();
  const products = getProducts();
  const q = query.trim().toLowerCase();

  container.innerHTML = '';

  if (all) {
    renderProducts('all');
    return;
  }

  const results = products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q)
  );

  if (results.length === 0) {
    container.innerHTML = `
      <div class="no-products">
        <p>검색 결과가 없습니다.</p>
      </div>
    `;
    return;
  }

  results.forEach(p => {
    container.appendChild(createProductCard(p));
  });

  // 검색 시 카테고리 액티브 해제
  document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
}

// 상품 목록 렌더링
function renderProducts(categoryFilter) {
  const container = document.getElementById('products');
  const products = getProducts();

  if (!container || !products) return;

  container.innerHTML = '';

  const list = categoryFilter === 'all'
    ? products
    : products.filter(p => p.category === categoryFilter);

  if (list.length === 0) {
    container.innerHTML = `
      <div class="no-products">
        <p>해당 카테고리에 상품이 없습니다.</p>
      </div>
    `;
    return;
  }

  list.forEach(p => {
    container.appendChild(createProductCard(p));
  });
}

// ── 이미지 URL 확장자 보정 헬퍼 ──
function normalizeImageUrl(url) {
  // 끝에 .jpg/.jpeg/.png/.gif 가 없으면 .jpg 붙여주기
  if (!/\.(jpe?g|png|gif)$/i.test(url)) {
    return url.replace(/\/+$/, '') + '.jpg';
  }
  return url;
}

// ── 상품 카드 생성 ──
function createProductCard(product) {
  const tpl = document.getElementById('product-template');
  if (!tpl) return null;

  const node = document.importNode(tpl.content, true);
  const imgEl = node.querySelector('.product-image img');
  const inv = node.querySelector('.inventory');

  // 원본 URL → 보정된 URL
  const imageUrl = normalizeImageUrl(product.image);
  imgEl.src = imageUrl;
  imgEl.alt = product.name;

  // 나머지 필드 세팅
  node.querySelector('.product-name').textContent = product.name;
  node.querySelector('.product-price').textContent = `${product.price.toLocaleString()}원`;

  if (product.inventory <= 0) {
    inv.textContent = '품절';
    inv.classList.add('soldout');
    node.querySelector('.add-to-cart-btn').disabled = true;
  } else {
    inv.textContent = `남은 수량: ${product.inventory}`;
    if (product.inventory <= 3) inv.classList.add('low');
  }

  node.querySelector('.add-to-cart-btn')
    .addEventListener('click', () => {
      if (addToCart(product)) {
        product.inventory--;
        updateProductInventory(product.id, product.inventory);
        inv.textContent = product.inventory
          ? `남은 수량: ${product.inventory}`
          : '품절';
        if (product.inventory <= 0) {
          node.querySelector('.add-to-cart-btn').disabled = true;
          inv.classList.add('soldout');
        }
        if (product.inventory <= 3) inv.classList.add('low');
      }
    });

  return node.firstElementChild;
}