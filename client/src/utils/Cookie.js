export function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
    return null;
}

export function isTokenExpired(token) {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log(payload)
        return payload.exp * 1000 < Date.now();
    } catch (error) {
        console.log(error)
        return true;
    }
}