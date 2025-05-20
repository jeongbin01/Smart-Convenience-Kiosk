const products = [
  {
    id: "1",
    name: "더 건강닭가슴스리라차차",
    price: 3900,
    category: "meal",
    inventory: 24,
    image: "https://tqklhszfkvzk6518638.edge.naverncp.com/product/8809895795204.jpg"
  },
  {
    id: "2",
    name: "군구마단호박샐러드",
    price: 5900,
    category: "meal",
    inventory: 24,
    image: "https://tqklhszfkvzk6518638.edge.naverncp.com/product/8809679629152.jpg"
  },
  {
    id: "3",
    name: "케이준치킨샐러드",
    price: 5400,
    category: "meal",
    inventory: 24,
    image: "https://tqklhszfkvzk6518638.edge.naverncp.com/product/8809679629145.jpg"
  },
  {
    id: "4",
    name: "직화그릴스크램블버거",
    price: 3900,
    category: "meal",
    inventory: 24,
    image: "https://tqklhszfkvzk6518638.edge.naverncp.com/product/8801068932683.jpg"
  },
  // 다른 카테고리 상품 추가
  {
    id: "5",
    name: "김치볶음라면",
    price: 1500,
    category: "cooked",
    inventory: 15,
    image: "https://via.placeholder.com/300x300?text=김치볶음라면"
  },
  {
    id: "6", 
    name: "튀김우동",
    price: 2500,
    category: "cooked",
    inventory: 10,
    image: "https://via.placeholder.com/300x300?text=튀김우동"
  },
  {
    id: "7",
    name: "꼬북칩 초코츄러스맛",
    price: 1600,
    category: "snack",
    inventory: 30,
    image: "https://via.placeholder.com/300x300?text=꼬북칩초코츄러스맛"
  },
  {
    id: "8",
    name: "농심 포테토칩",
    price: 1500,
    category: "snack",
    inventory: 25,
    image: "https://via.placeholder.com/300x300?text=농심포테토칩"
  },
  {
    id: "9",
    name: "구구콘",
    price: 1800,
    category: "icecream",
    inventory: 12,
    image: "https://via.placeholder.com/300x300?text=구구콘"
  },
  {
    id: "10",
    name: "월드콘",
    price: 2000,
    category: "icecream",
    inventory: 18,
    image: "https://via.placeholder.com/300x300?text=월드콘"
  },
  {
    id: "11",
    name: "햇반",
    price: 1800,
    category: "food",
    inventory: 20,
    image: "https://via.placeholder.com/300x300?text=햇반"
  },
  {
    id: "12",
    name: "야채참치",
    price: 2400,
    category: "food",
    inventory: 15,
    image: "https://via.placeholder.com/300x300?text=야채참치"
  },
  {
    id: "13",
    name: "코카콜라",
    price: 1500,
    category: "beverage",
    inventory: 30,
    image: "https://via.placeholder.com/300x300?text=코카콜라"
  },
  {
    id: "14",
    name: "칠성사이다",
    price: 1500,
    category: "beverage",
    inventory: 28,
    image: "https://via.placeholder.com/300x300?text=칠성사이다"
  },
  {
    id: "15",
    name: "물티슈",
    price: 1200,
    category: "household",
    inventory: 22,
    image: "https://via.placeholder.com/300x300?text=물티슈"
  },
  {
    id: "16",
    name: "휴지",
    price: 2500,
    category: "household",
    inventory: 15,
    image: "https://via.placeholder.com/300x300?text=휴지"
  }
];

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