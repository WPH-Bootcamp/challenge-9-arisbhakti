// AuthPage
export type SignInForm = {
  email: string;
  password: string;
  remember: boolean;
};

export type SignUpForm = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export type SignInErrors = {
  email?: string;
  password?: string;
  form?: string;
};

export type SignUpErrors = {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  form?: string;
};

// Home
export type RecommendedItem = {
  id: number;
  name: string;
  star: number;
  place: string;
  logo: string;
  images: string[];
  category: string;
  reviewCount: number;
  isFrequentlyOrdered: boolean;
};

export type RecommendedResponse = {
  success: boolean;
  message: string;
  data?: {
    recommendations?: RecommendedItem[];
    restaurants?: RecommendedItem[];
    pagination?: {
      page?: number;
      limit?: number;
      total?: number;
      totalPages?: number;
    };
  };
};

// Category
export type RestaurantItem = {
  id: number;
  name: string;
  star: number;
  place: string;
  logo: string;
  images: string[];
  category: string;
  reviewCount: number;
  menuCount: number;
  priceRange?: { min: number; max: number };
};

export type CategoryResponse = {
  success: boolean;
  message: string;
  data?: {
    restaurants?: RestaurantItem[];
  };
};

// Details
export type MenuItem = {
  id: number;
  foodName: string;
  price: number;
  type: "food" | "drink";
  image: string;
};

export type ReviewItem = {
  id: number;
  star: number;
  comment: string;
  createdAt: string;
  user: {
    id: number;
    name: string;
    avatar: string | null;
  };
};

export type RestaurantDetail = {
  id: number;
  name: string;
  star: number;
  averageRating: number;
  place: string;
  coordinates?: {
    lat: number;
    long: number;
  };
  logo: string;
  images: string[];
  category: string;
  totalMenus: number;
  totalReviews: number;
  menus: MenuItem[];
  reviews: ReviewItem[];
};

export type DetailResponse = {
  success: boolean;
  message: string;
  data?: RestaurantDetail;
};

// MyCart
export type CartMenu = {
  id: number;
  foodName: string;
  price: number;
  type: "food" | "drink";
  image: string;
};

export type CartItem = {
  id: number;
  menu: CartMenu;
  quantity: number;
  itemTotal: number;
};

export type CartRestaurant = {
  restaurant: {
    id: number;
    name: string;
    logo: string;
  };
  items: CartItem[];
  subtotal: number;
};

export type CartResponse = {
  success: boolean;
  message: string;
  data?: {
    cart?: CartRestaurant[];
    summary?: {
      totalItems: number;
      totalPrice: number;
      restaurantCount: number;
    };
  };
};

// Checkout
export type CheckoutCartItem = {
  id: number;
  menu: {
    id: number;
    foodName: string;
    price: number;
    type: "food" | "drink";
    image: string;
  };
  quantity: number;
  itemTotal: number;
};

export type CheckoutCartGroup = {
  restaurant: {
    id: number;
    name: string;
    logo: string;
  };
  items: CheckoutCartItem[];
  subtotal: number;
};

export type CheckoutState = {
  cart?: CheckoutCartGroup[];
  summary?: {
    totalItems: number;
    totalPrice: number;
    restaurantCount: number;
  };
};

// CheckoutBottomBar
export type CartSummaryResponse = {
  success: boolean;
  message: string;
  data?: {
    summary?: {
      totalItems: number;
      totalPrice: number;
      restaurantCount: number;
    };
  };
};

// Success
export type SuccessPayload = {
  date: string;
  paymentMethod: string;
  totalItems: number;
  price: number;
  deliveryFee: number;
  serviceFee: number;
  total: number;
};

// Profile + ProfileModal
export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string | null;
};

export type ProfileResponse = {
  success: boolean;
  message: string;
  data?: {
    user?: User;
  };
};

export type ProfileModalProps = {
  user?: User;
};

// ReviewModal
export type ReviewModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: {
    id: number;
    transactionId: string;
    restaurants: {
      restaurant: { id: number; name: string; logo: string };
      items: { menuId: number }[];
    }[];
  } | null;
};

export type MyReview = {
  id: number;
  star: number;
  comment: string;
  transactionId: string;
};

export type ReviewsResponse = {
  success: boolean;
  message: string;
  data?: {
    reviews?: MyReview[];
  };
};

// MyOrders
export type OrderItem = {
  menuId: number;
  menuName: string;
  price: number;
  image: string;
  quantity: number;
  itemTotal: number;
};

export type OrderRestaurant = {
  restaurant: {
    id: number;
    name: string;
    logo: string;
  };
  items: OrderItem[];
  subtotal: number;
};

export type Order = {
  id: number;
  transactionId: string;
  status: "done" | "preparing" | "on_the_way" | "delivered" | "cancelled";
  paymentMethod: string;
  deliveryAddress: string;
  phone: string;
  pricing: {
    subtotal: number;
    serviceFee: number;
    deliveryFee: number;
    totalPrice: number;
  };
  restaurants: OrderRestaurant[];
  createdAt: string;
  updatedAt: string;
};

export type OrdersResponse = {
  success: boolean;
  message: string;
  data?: {
    orders?: Order[];
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
};
