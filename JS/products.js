// 상품 데이터
const products = [
  {
    id: "1",
    name: "초코파이",
    price: 1500,
    category: "snack",
    inventory: 15,
    image: "img/초코파이.png"
  },
  {
    id: "2",
    name: "포카칩",
    price: 1800,
    category: "snack",
    inventory: 10,
    image: "img/포카칩.png"
  },
  {
    id: "3",
    name: "콜라",
    price: 2000,
    category: "beverage",
    inventory: 20,
    image: "img/콜라.png"
  },
  {
    id: "4",
    name: "바나나우유",
    price: 1500,
    category: "dairy",
    inventory: 12,
    image: "img/바나나우유.png"
  },
  {
    id: "5",
    name: "초코에몽",
    price: 1300,
    category: "dairy",
    inventory: 8,
    image: "img/초코에몽.png"
  },
  {
    id: "6",
    name: "불닭볶음면",
    price: 2500,
    category: "processed",
    inventory: 15,
    image: "img/불닭볶음면.png"
  },
  {
    id: "7",
    name: "치킨마요덮밥",
    price: 4500,
    category: "processed",
    inventory: 5,
    image: "img/치킨마요덮밥.png"
  },
  {
    id: "8",
    name: "치킨몬스터 도시락",
    price: 6000,
    category: "processed",
    inventory: 3,
    image: "img/치킨몬스터 도시락.png"
  },
  {
    id: "9",
    name: "김치",
    price: 3500,
    category: "agricultural",
    inventory: 7,
    image: "img/김치.png"
  },
  {
    id: "10",
    name: "딸기 샌드위치",
    price: 3200,
    category: "snack",
    inventory: 6,
    image: "img/딸기 샌드위치.png"
  },
  {
    id: "11",
    name: "메로나",
    price: 1200,
    category: "dairy",
    inventory: 18,
    image: "img/메로나.png"
  },
  {
    id: "12",
    name: "삼다수",
    price: 1000,
    category: "beverage",
    inventory: 24,
    image: "img/삼다수.png"
  },
  {
    id: "13",
    name: "스타벅스 에스프레소 크림",
    price: 2800,
    category: "beverage",
    inventory: 9,
    image: "img/스타벅스_에소프레소_크림.png"
  },
  {
    id: "14",
    name: "밤 티라미수 컵",
    price: 4500,
    category: "snack",
    inventory: 4,
    image: "img/밤_티라미수_컵.png"
  },
  {
    id: "15",
    name: "샴푸",
    price: 8000,
    category: "living",
    inventory: 6,
    image: "img/샴푸.png"
  },
  {
    id: "16",
    name: "치약",
    price: 4000,
    category: "living",
    inventory: 12,
    image: "img/치약.png"
  }
];


// 카테고리 목록
const categories = [
  { id: "all", name: "전체" },
  { id: "beverage", name: "음료" },
  { id: "snack", name: "제과" },
  { id: "dairy", name: "유제품" },
  { id: "sauce", name: "소스&조미료" },
  { id: "agricultural", name: "농수축산물" },
  { id: "processed", name: "가공기타" },
  { id: "living", name: "생활용품" },
  { id: "electronics", name: "가전/문⦁완구" },
  { id: "fashion", name: "의류⦁잡화⦁테넌트" },
  { id: "pet", name: "반려동물용품" }
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
  const updatedProducts = getProducts().map(product => 
    product.id === productId 
      ? { ...product, inventory: newInventory } 
      : product
  );
  
  saveProducts(updatedProducts);
  return updatedProducts;
}

// 상품 정보 가져오기
function getProducts() {
  const savedProducts = localStorage.getItem('products');
  if (!savedProducts) {
    // 저장된 상품이 없으면 초기화하고 반환
    return initializeProducts();
  }
  return JSON.parse(savedProducts);
}

// 상품 하나 가져오기
function getProduct(productId) {
  return getProducts().find(product => product.id === productId);
}

// 페이지 로드 시 상품 초기화
document.addEventListener('DOMContentLoaded', () => {
  initializeProducts();
});