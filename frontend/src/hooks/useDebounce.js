import { useEffect, useState } from "react";

export const useDebounce = (value, ms) => {
    const [debounceValue, setDebounceValue] = useState('')
    useEffect(() => {
        const setTimeOutId = setTimeout(() => {
            setDebounceValue(value)
        }, ms)
        return () => {
            clearTimeout(setTimeOutId)
        }
    }, [value, ms])
    return debounceValue
}