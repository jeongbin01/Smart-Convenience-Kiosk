// 카테고리 목록
const categories = [
  { id: "all", name: "전체" },
  { id: "meal", name: "간편식사" },
  { id: "cooked", name: "즉석조리" },
  { id: "snack", name: "과자류" },
  { id: "icecream", name: "아이스크림" },
  { id: "food", name: "식품" },
  { id: "beverage", name: "음료" },
  { id: "household", name: "생활용품" },
];

// 로컬 스토리지에서 상품 정보 불러오기 또는 초기 상태 저장
function initializeProducts() {
  const savedProducts = localStorage.getItem('products');

  // 저장된 상품 정보가 없으면 초기 상태 저장
  if (!savedProducts) {
    localStorage.setItem('products', JSON.stringify(products));
    return products;
  }

  // 저장된 상품 정보가 있으면 불러오기
  return JSON.parse(savedProducts);
}

// 상품 정보 저장하기
function saveProducts(products) {
  localStorage.setItem('products', JSON.stringify(products));
}

// 상품 재고 업데이트
function updateProductInventory(productId, newInventory) {
  const products = getProducts();

  if (!products) {
    console.error('Failed to retrieve products. Cannot update inventory.');
    return null;
  }
  
  const updatedProducts = products.map(product => {
    if (product.id === productId) {
      return { ...product, inventory: newInventory };
    }
    return product;
  });

  saveProducts(updatedProducts);
  return updatedProducts;
}

// 상품 정보 가져오기
function getProducts() {
  try {
    const savedProducts = localStorage.getItem('products');
    if (!savedProducts) {
      return initializeProducts();
    }
    return JSON.parse(savedProducts);
  } catch (error) {
    console.error('Error loading products:', error);
    return initializeProducts();
  }
}

// 상품 하나 가져오기
function getProduct(productId) {
  try {
    const product = getProducts().find(product => product.id === productId);
    if (!product) {
      throw new Error(`Product with ID ${productId} not found.`);
    }
    return product;
  } catch (error) {
    console.error(`Error getting product ${productId}:`, error);
    throw error;
  }
}

// 페이지 로드 시 상품 초기화
document.addEventListener('DOMContentLoaded', () => {
  initializeProducts();
});