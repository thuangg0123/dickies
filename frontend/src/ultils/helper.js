export const createSlug = (str) => {
    str = str.toLowerCase().trim();
    str = str.replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
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

export const generateRange = (start, end) => {
    const length = end + 1 - start
    return Array.from({ length }, (_, index) => {
        return start + index
    })
}

export function getBase64(file) {
    if (!file) {
        return ''
    }
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
    })
}