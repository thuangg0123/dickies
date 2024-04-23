import path from "./path"
import React from 'react';
import icons from './icons'

const { DashboardIcon, GroupsIcon, InventoryIcon, CategoryIcon, Person2OutlinedIcon,
    ShoppingCartOutlinedIcon, BookmarkBorderOutlinedIcon } = icons

export const nav = [
    {
        id: 1,
        value: "Men",
        path: `?gender=men`
    },
    {
        id: 2,
        value: "Women",
        path: `?gender=women`
    },
    {
        id: 3,
        value: "Kids",
        path: `?gender=kid`
    },
    {
        id: 4,
        value: "Blog",
        path: `/${path.BLOG}`
    },
    {
        id: 5,
        value: "FAQ",
        path: `/${path.FAQ}`
    }
]

export const sortPrice = [
    {
        id: 1,
        text: "Top Sellers",
        value: 'sold'
    },
    {
        id: 2,
        text: "Price Low To High",
        value: 'price'
    },
    {
        id: 3,
        text: "Price High To Low",
        value: '-price'
    },
    {
        id: 4,
        text: "Top Ratings",
        value: "totalRatings",
    },
    {
        id: 5,
        text: "Date New To Old",
        value: 'createdAt'
    },
    {
        id: 6,
        text: "Date Old To New",
        value: "-createdAt",
    },
]

export const gender = [
    "men",
    "women",
    "kid",
    "all"
]

export const voteOptions = [

    {
        id: 1,
        text: "Terrible"
    },
    {
        id: 2,
        text: "Bad"
    },
    {
        id: 3,
        text: "Neutral"
    },

    {
        id: 4,
        text: "Good"
    },
    {
        id: 5,
        text: "Perfect"
    },
]

export const category = [
    "PANTS",
    "PANT SHORTS",
    "SKATE SHORTS",
    "SHIRTS",
    "OUTERWEAR",
    "COASTS JACKETS",
    "BACKPACK",
    "SOCKS",
    "HATS",
    "SKIRTS DRESSES",
    "OVERALLS",
    "PATCHES",
    "CARPENTER PANTS",
    "JEAN PANTS",
]

export const adminSidebar = [
    {
        id: 1,
        type: "SINGLE",
        text: "Dashboard",
        path: `${path.DASHBOARD}`,
        icon: React.createElement(DashboardIcon, null)
    },
    {
        id: 2,
        type: "SINGLE",
        text: "Manage users",
        path: `${path.MANAGE_USER}`,
        icon: React.createElement(GroupsIcon, null)
    },
    {
        id: 3,
        type: "PARENT",
        text: "Manage products",
        icon: React.createElement(InventoryIcon, null),
        submenu: [
            {
                text: 'Create products',
                path: `${path.CREATE_PRODUCTS}`
            },
            {
                text: "Manage products",
                path: `${path.MANAGE_PRODUCTS}`
            }
        ]
    },
    {
        id: 4,
        type: "SINGLE",
        text: "Manage orders",
        path: `${path.MANAGE_ORDER}`,
        icon: React.createElement(CategoryIcon, null)
    }
]

export const roles = [
    {
        code: 0,
        value: "Admin"
    },
    {
        code: 111,
        value: "User"
    }
]

export const blockStatus = [
    {
        code: true,
        value: "Blocked"
    },
    {
        code: false,
        value: "Active"
    }
]

export const size = [
    {
        code: 1,
        value: ["28", "30", "32", "34", "36", "38", "40", "42"],
    },
    {
        code: 2,
        value: ["M", "L", "XL", "XXL"],
    },
    {
        code: 3,
        value: ["One Size"],
    }
]

export const memberSidebar = [
    {
        id: 1,
        type: "SINGLE",
        text: "Personal",
        path: `${path.PERSONAL}`,
        icon: React.createElement(Person2OutlinedIcon, null)
    },
    {
        id: 2,
        type: "SINGLE",
        text: "My cart",
        path: `${path.MY_CART}`,
        icon: React.createElement(ShoppingCartOutlinedIcon, null)
    },
    {
        id: 3,
        type: "SINGLE",
        text: "Wish lists",
        path: `${path.WISH_LIST}`,
        icon: React.createElement(BookmarkBorderOutlinedIcon, null)
    },
    {
        id: 4,
        type: "SINGLE",
        text: "History order",
        path: `${path.HISOTRY_ORDER}`,
        icon: React.createElement(InventoryIcon, null)
    }
]