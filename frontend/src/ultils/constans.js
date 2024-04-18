import path from "./path"

export const nav = [
    {
        id: 1,
        value: "Men",
        path: `/${path.MEN}`
    },
    {
        id: 2,
        value: "Women",
        path: `/${path.WOMEN}`
    },
    {
        id: 3,
        value: "Kids",
        path: `/${path.KIDS}`
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