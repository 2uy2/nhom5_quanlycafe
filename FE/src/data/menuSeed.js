export const MENU_STORAGE_KEY = "smart-cafe-menu-items";

export const categories = ["Tất cả", "Đồ uống", "Đồ ăn", "Bánh ngọt", "Khuyến mãi"];

export const emptyForm = {
  id: "",
  name: "",
  price: "",
  category: "Đồ uống",
  status: "available",
  description: "",
  image: "",
};

export const initialMenuItems = [
  {
    id: "MN-001",
    name: "Cold Brew Cam Vàng",
    price: 59000,
    category: "Đồ uống",
    status: "available",
    description: "Cà phê ủ lạnh kết hợp cam vàng, hậu vị tươi và nhẹ.",
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80",
    updatedAt: "2026-04-15T08:00:00.000Z",
  },
  {
    id: "MN-002",
    name: "Latte Hạt Dẻ",
    price: 65000,
    category: "Đồ uống",
    status: "available",
    description: "Espresso, sữa tươi và syrup hạt dẻ cho ca làm việc dài.",
    image:
      "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=900&q=80",
    updatedAt: "2026-04-15T08:10:00.000Z",
  },
  {
    id: "MN-003",
    name: "Matcha Dừa Non",
    price: 62000,
    category: "Đồ uống",
    status: "sold_out",
    description: "Matcha, sữa dừa và topping dừa non cho ngày nóng.",
    image:
      "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=900&q=80",
    updatedAt: "2026-04-15T08:20:00.000Z",
  },
  {
    id: "MN-004",
    name: "Bánh Mì Gà Xốt Nấm",
    price: 49000,
    category: "Đồ ăn",
    status: "available",
    description: "Bánh mì nóng, gà xé, nấm áp chảo và xốt đặc trưng.",
    image:
      "https://images.unsplash.com/photo-1606755962773-d324e9a13086?auto=format&fit=crop&w=900&q=80",
    updatedAt: "2026-04-15T08:30:00.000Z",
  },
  {
    id: "MN-005",
    name: "Croissant Trứng Muối",
    price: 45000,
    category: "Bánh ngọt",
    status: "available",
    description: "Croissant bơ giòn với kem trứng muối béo nhẹ.",
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=80",
    updatedAt: "2026-04-15T08:40:00.000Z",
  },
];
