import React, { useEffect } from "react";

export const useDebounce = (value, ms) => {
    const [debounceValue, setDebounceValue] = useState('')
    useEffect(() => {
        const setTimeOutId = setTimeOut(() => {
            setDebounceValue(value)
        }, ms)
        return () => {
            clearTimeout(setTimeOutId)
        }
    }, [value, ms])
    return debounceValue
}