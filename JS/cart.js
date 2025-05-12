
// 장바구니 상태
let cart = [];

// 초기화 함수
function initializeCart() {
  const savedCart = localStorage.getItem('cartItems');
  
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
  
  updateCartCount();
  return cart;
}

// 장바구니 저장
function saveCart() {
  localStorage.setItem('cartItems', JSON.stringify(cart));
  updateCartCount();
}

// 장바구니에 상품 추가
function addToCart(product, quantity = 1) {
  // 재고 확인
  if (product.inventory <= 0) {
    showToast('상품이 품절되었습니다.', 'error');
    return false;
  }
  
  // 장바구니에 같은 상품이 있는지 확인
  const existingItem = cart.find(item => item.id === product.id);
  
  // 추가하려는 수량 계산
  const newQuantity = existingItem 
    ? existingItem.quantity + quantity 
    : quantity;
    
  // 재고 충분한지 확인
  if (newQuantity > product.inventory) {
    showToast(`재고가 부족합니다. 최대 ${product.inventory}개 구매 가능합니다.`, 'warning');
    return false;
  }
  
  if (existingItem) {
    // 기존 아이템 수량 업데이트
    cart = cart.map(item => 
      item.id === product.id 
        ? { ...item, quantity: item.quantity + quantity } 
        : item
    );
  } else {
    // 새 아이템 추가
    cart.push({ ...product, quantity });
  }
  
  saveCart();
  showToast(`${product.name} ${quantity}개를 장바구니에 담았습니다.`, 'success');
  return true;
}

// 장바구니에서 상품 제거
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
}

// 장바구니 상품 수량 업데이트
function updateQuantity(productId, quantity) {
  // 상품 찾기
  const product = getProduct(productId);
  
  if (!product) {
    showToast('상품을 찾을 수 없습니다.', 'error');
    return false;
  }
  
  // 재고 확인
  if (quantity > product.inventory) {
    showToast(`재고가 부족합니다. 최대 ${product.inventory}개 구매 가능합니다.`, 'warning');
    return false;
  }
  
  if (quantity <= 0) {
    removeFromCart(productId);
  } else {
    cart = cart.map(item => 
      item.id === productId ? { ...item, quantity } : item
    );
    saveCart();
  }
  
  return true;
}

// 장바구니 비우기
function clearCart() {
  cart = [];
  saveCart();
}

// 장바구니 총 상품 개수 계산
function getTotalItems() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

// 장바구니 총 금액 계산
function getTotalPrice() {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// 장바구니 카운트 업데이트
function updateCartCount() {
  const cartCountElement = document.getElementById('cart-count');
  if (cartCountElement) {
    cartCountElement.textContent = getTotalItems();
  }
}

// 토스트 알림 표시
function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  
  if (!toast) return;
  
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  
  setTimeout(() => {
    toast.className = 'toast';
  }, 3000);
}

// 장바구니 초기화
initializeCart();