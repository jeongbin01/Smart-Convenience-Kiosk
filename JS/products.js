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
    image: "img/스타벅스_에스프레소_크림.png"
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
  },
  {
    id: "17",
    name: "2%",
    price: 1800,
    category: "beverage",
    inventory: 9,
    image: "img/2%.png"
  },
  {
    id: "18",
    name: "딸기 우유",
    price: 1600,
    category: "beverage",
    inventory: 13,
    image: "img/딸기_우유.png"
  },
  {
    id: "19",
    name: "밀크티티",
    price: 2500,
    category: "beverage",
    inventory: 8,
    image: "img/밀크티.png"
  },
  {
    id: "20",
    name: "비타500",
    price: 1200,
    category: "beverage",
    inventory: 18,
    image: "img/비타500.png"
  },
  {
    id: "21",
    name: "사이다",
    price: 1700,
    category: "beverage",
    inventory: 14,
    image: "img/사이다.png"
  },
  {
    id: "22",
    name: "스타벅스 프라푸치노",
    price: 3300,
    category: "beverage",
    inventory: 7,
    image: "img/스타벅스_프라푸치노.png"
  },
  {
    id: "23",
    name: "얼음컵",
    price: 500,
    category: "beverage",
    inventory: 20,
    image: "img/얼음컵.png"
  },
  {
    id: "24",
    name: "카페라떼",
    price: 2000,
    category: "beverage",
    inventory: 10,
    image: "img/카페라떼.png"
  },
  {
    id: "25",
    name: "케토레이",
    price: 1600,
    category: "beverage",
    inventory: 11,
    image: "img/케토레이.png"
  },
  {
    id: "26",
    name: "토레타",
    price: 1800,
    category: "beverage",
    inventory: 6,
    image: "img/토레타.png"
  },
  {
    id: "27",
    name: "트로피카나 스파클링 청포도",
    price: 1700,
    category: "beverage",
    inventory: 12,
    image: "img/트로피카나_스파클링_청포도.png"
  },
  {
    id: "28",
    name: "트로피카나 오렌지",
    price: 1700,
    category: "beverage",
    inventory: 15,
    image: "img/트로피카나_오렌지.png"
  },
  {
    id: "29",
    name: "파워에이드",
    price: 1600,
    category: "beverage",
    inventory: 19,
    image: "img/파워에이드.png"
  },
  {
    id: "30",
    name: "핫식스",
    price: 1500,
    category: "beverage",
    inventory: 13,
    image: "img/핫식스.png"
  }
];


// 카테고리 목록
const categories = [
  { id: "all", name: "전체" },
  { id: "beverage", name: "음료" },
  { id: "snack", name: "간식" },
  { id: "dairy", name: "유제품" },
  { id: "sauce", name: "소스/조미료" },
  { id: "agricultural", name: "농산물" },
  { id: "processed", name: "가공식품" },
  { id: "living", name: "생활용품" },
  { id: "electronics", name: "전자/완구" },
  { id: "fashion", name: "패션/잡화" },
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
  const savedProducts = localStorage.getItem('products');
  if (!savedProducts) {
    return initializeProducts();
  }
  return JSON.parse(savedProducts);
}

// 상품 하나 가져오기
function getProduct(productId) {
  const product = getProducts().find(product => product.id === productId);
  if (!product) {
    throw new Error(`Product with ID ${productId} not found.`);
  }
  return product;
}

// 페이지 로드 시 상품 초기화
document.addEventListener('DOMContentLoaded', () => {
  initializeProducts();
});