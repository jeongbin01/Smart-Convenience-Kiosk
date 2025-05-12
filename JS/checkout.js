// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
  // 테마 설정
  initTheme();
  
  // 장바구니 표시
  renderCart();
  
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
  if (savedTheme === null && (currentHour >= 18 || currentHour < 6)) {
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
  // 결제 버튼 클릭 이벤트
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', processCheckout);
  }
  
  // 영수증 모달 닫기 버튼
  const closeModal = document.querySelector('.close-modal');
  if (closeModal) {
    closeModal.addEventListener('click', function() {
      document.getElementById('receipt-modal').style.display = 'none';
    });
  }
  
  // 인쇄 버튼
  const printBtn = document.getElementById('print-receipt');
  if (printBtn) {
    printBtn.addEventListener('click', function() {
      window.print();
    });
  }
  
  // 모달 외부 클릭 시 닫기
  window.addEventListener('click', function(event) {
    const modal = document.getElementById('receipt-modal');
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
}

// 장바구니 표시
function renderCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  const totalItemsElement = document.getElementById('total-items');
  const totalPriceElement = document.getElementById('total-price');
  const cart = initializeCart();
  
  // 컨테이너 비우기
  cartItemsContainer.innerHTML = '';
  
  // 장바구니가 비어있을 경우
  if (cart.length === 0) {
    const template = document.getElementById('empty-cart');
    const emptyCart = document.importNode(template.content, true);
    cartItemsContainer.appendChild(emptyCart);
    
    totalItemsElement.textContent = '0개';
    totalPriceElement.textContent = '0원';
    
    // 결제 버튼 비활성화
    document.getElementById('checkout-btn').disabled = true;
    return;
  }
  
  // 장바구니 아이템 표시
  cart.forEach(item => {
    const cartItemElement = createCartItemElement(item);
    cartItemsContainer.appendChild(cartItemElement);
  });
  
  // 총합 표시
  totalItemsElement.textContent = `${getTotalItems()}개`;
  totalPriceElement.textContent = `${getTotalPrice().toLocaleString()}원`;
}

// 장바구니 아이템 요소 생성
function createCartItemElement(item) {
  const template = document.getElementById('cart-item-template');
  const cartItem = document.importNode(template.content, true);
  
  // 상품 이미지
  cartItem.querySelector('.item-image').src = item.image;
  cartItem.querySelector('.item-image').alt = item.name;
  
  // 상품 정보
  cartItem.querySelector('.item-name').textContent = item.name;
  cartItem.querySelector('.item-price').textContent = 
    `${item.price.toLocaleString()}원 x ${item.quantity} = ${(item.price * item.quantity).toLocaleString()}원`;
  
  // 수량
  const quantityElement = cartItem.querySelector('.quantity-value');
  quantityElement.textContent = item.quantity;
  
  // 수량 감소 버튼
  const decrementBtn = cartItem.querySelector('.decrement');
  decrementBtn.addEventListener('click', function() {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
    renderCart();
  });
  
  // 수량 증가 버튼
  const incrementBtn = cartItem.querySelector('.increment');
  incrementBtn.addEventListener('click', function() {
    const product = getProduct(item.id);
    if (item.quantity < product.inventory) {
      updateQuantity(item.id, item.quantity + 1);
      renderCart();
    } else {
      showToast(`재고가 부족합니다. 최대 ${product.inventory}개 구매 가능합니다.`, 'warning');
    }
  });
  
  // 삭제 버튼
  const removeBtn = cartItem.querySelector('.remove-btn');
  removeBtn.addEventListener('click', function() {
    removeFromCart(item.id);
    renderCart();
  });
  
  return cartItem.firstElementChild;
}

// 결제 처리
function processCheckout() {
  const cart = initializeCart();
  
  if (cart.length === 0) {
    showToast('장바구니가 비어있습니다.', 'error');
    return;
  }
  
  // 재고 업데이트
  cart.forEach(item => {
    const product = getProduct(item.id);
    const newInventory = Math.max(0, product.inventory - item.quantity);
    updateProductInventory(item.id, newInventory);
  });
  
  // 영수증 생성
  generateReceipt(cart);
  
  // 영수증 모달 표시
  document.getElementById('receipt-modal').style.display = 'block';
  
  // 장바구니 비우기
  clearCart();
}

// 영수증 생성
function generateReceipt(cart) {
  const receiptItems = document.getElementById('receipt-items');
  const receiptTotal = document.getElementById('receipt-total');
  const receiptDate = document.getElementById('receipt-date');
  
  // 날짜 설정
  const now = new Date();
  const dateOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit' 
  };
  receiptDate.textContent = now.toLocaleDateString('ko-KR', dateOptions);
  
  // 영수증 아이템 목록 비우기
  receiptItems.innerHTML = '';
  
  // 영수증 아이템 추가
  cart.forEach(item => {
    const receiptItem = document.createElement('div');
    receiptItem.className = 'receipt-item';
    receiptItem.innerHTML = `
      <span>${item.name} x ${item.quantity}</span>
      <span>${(item.price * item.quantity).toLocaleString()}원</span>
    `;
    receiptItems.appendChild(receiptItem);
  });
  
  // 총액 표시
  receiptTotal.textContent = `${getTotalPrice().toLocaleString()}원`;
}

// 토스트 알림 표시 (app.js와 동일한 함수)
function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  
  if (!toast) return;
  
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  
  setTimeout(() => {
    toast.className = 'toast';
  }, 3000);
}
