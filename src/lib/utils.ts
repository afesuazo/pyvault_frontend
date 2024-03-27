// @ts-ignore
export function debounce(func, wait) {
    let timeout :any;
    let allowCall = true;

    return function executedFunction(...args: any) {
        const later = () => {
            allowCall = true;
        };

        const callNow = allowCall;
        if (!timeout) {
            timeout = setTimeout(later, wait);
        } else {
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        }

        if (callNow) {
            allowCall = false;
            func(...args);
        }
    };
}