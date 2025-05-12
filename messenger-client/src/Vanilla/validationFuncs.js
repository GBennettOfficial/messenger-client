
export const isAlphabetic = (str) => {
    return /^[A-Za-z]+$/.test(str);
}

export const isAlphaNumeric = (str) => {
    return /^[A-Za-z0-9]+$/.test(str);
}

export const isEmail = (str) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(str);
}