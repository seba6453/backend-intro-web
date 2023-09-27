export const randomCaracter = (longitud: number) => {
    const banco = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let random = "";
    for (let i = 0; i < longitud; i++) {
        random += banco.charAt(Math.floor(Math.random() * banco.length));
    }
    return random;
};