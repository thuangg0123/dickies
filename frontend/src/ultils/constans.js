import path from "./path"
import React from 'react';
import icons from './icons'

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
    "kid"
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

const { DashboardIcon, GroupsIcon, InventoryIcon, CategoryIcon } = icons

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
                path: `${path.MANAGE_ORDER}`
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