import { useState, useEffect } from 'react';

const useDebounce = (value: string, delay: number) => {
    // Initial: chỉ lần 1 lần duy nhất - là lần đầu " "
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Khi nhập nhanh vượt qua delay, chưa kịp thực hiện callback trong setTimeout thì callback của usEffect đã được gọi lại
        //  do value truyền vào làm dependencies
        const timerId = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(timerId);
        };
    }, [value]);

    return debouncedValue;
};

export default useDebounce;
