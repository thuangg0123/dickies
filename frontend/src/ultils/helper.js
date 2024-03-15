import icons from './icons'

const { StarIcon, StarOutlineIcon } = icons

export const createSlug = (str) => {
    str = str.toLowerCase().trim(); // Chuyển đổi chuỗi sang chữ thường và loại bỏ khoảng trắng đầu cuối
    str = str.replace(/[^a-z0-9 -]/g, '') // Loại bỏ các ký tự không phải chữ cái, số, hoặc dấu gạch ngang
        .replace(/\s+/g, '-') // Thay thế các khoảng trắng liên tiếp bằng dấu gạch ngang
        .replace(/-+/g, '-'); // Loại bỏ các dấu gạch ngang liên tiếp
    return str;
}