import icons from './icons'

const { StarIcon, StarOutlineIcon } = icons

export const createSlug = (str) => {
    str = str.toLowerCase().trim(); // Chuyển đổi chuỗi sang chữ thường và loại bỏ khoảng trắng đầu cuối
    str = str.replace(/[^a-z0-9 -]/g, '') // Loại bỏ các ký tự không phải chữ cái, số, hoặc dấu gạch ngang
        .replace(/\s+/g, '-') // Thay thế các khoảng trắng liên tiếp bằng dấu gạch ngang
        .replace(/-+/g, '-'); // Loại bỏ các dấu gạch ngang liên tiếp
    return str;
}

export const validate = (payload, setInvalidFields) => {
    let invalids = 0
    const formatPayload = Object.entries(payload)
    formatPayload.forEach(element => {
        if (element[1].trim() === '') {
            invalids++
            setInvalidFields(prev => [...prev, { name: element[0], message: 'Require this field.' }])
        }
    });
    formatPayload.forEach(element => {
        switch (element[0]) {
            case 'email':
                const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                if (!element[1].match(regex)) {
                    invalids++
                    setInvalidFields(prev => [...prev, { name: element[0], message: 'Email invalid' }])
                }
                break;
            case 'password':
                if (element[1].length < 6) {
                    invalids++
                    setInvalidFields(prev => [...prev, { name: element[0], message: 'Password must be at least 6 characters or more' }])
                }
                break;

            default:
                break;
        }
    });
    return invalids
}