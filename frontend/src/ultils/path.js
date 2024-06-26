const path = {
    PUBLIC: '/',
    HOME: '',
    ALL: '*',
    LOGIN: 'login',
    PRODUCTS: "products",
    FAQ: "faq",
    BLOG: "blog",
    DETAIL_PRODUCT_G_C_T_P: 'products/:gender/:category/:slug/:productId',
    FINAL_REGISTER: 'final-register/:status',
    RESET_PASSWORD: 'reset-password/:token',
    NOT_FOUND: 'not-found',
    DETAIL_CART: 'my-cart',
    CHECKOUT: 'checkout',
    WISH_LIST: "wish-list",

    // Admin
    ADMIN: "admin",
    DASHBOARD: "dashboard",
    MANAGE_USER: "manage-user",
    MANAGE_PRODUCTS: "manage-products",
    MANAGE_ORDER: "manage-order",
    CREATE_PRODUCTS: "create-products",

    //member
    MEMBER: "member",
    PERSONAL: "personal",
    HISOTRY_ORDER: "history-order",
}

export default path