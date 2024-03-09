import icons from './icons'

const { StarIcon, StarOutlineIcon } = icons

export const createSlug = (str) => {
    str = str.toLowerCase().trim(); // Chuyển đổi chuỗi sang chữ thường và loại bỏ khoảng trắng đầu cuối
    str = str.replace(/[^a-z0-9 -]/g, '') // Loại bỏ các ký tự không phải chữ cái, số, hoặc dấu gạch ngang
        .replace(/\s+/g, '-') // Thay thế các khoảng trắng liên tiếp bằng dấu gạch ngang
        .replace(/-+/g, '-'); // Loại bỏ các dấu gạch ngang liên tiếp
    return str;
}

// export const formatMoney = (number) => Number(number.toFixed(1).toLocaleString())

// export const renderStarFromNumber = (number) => {
//     if (!Number(number)) {
//         return
//     }
//     const stars = []
//     for (let i = 0; i < +number; i++) {
//         stars.push(<StarIcon />)
//     }
//     for (let i = 5; i > +number; i--) {
//         stars.push(<StarOutlineIcon />)
//     }
//     return stars
// }