export const getAuthToken = () => {
    const tokenData = localStorage.getItem('token');
    if (!tokenData) return null;
    const parsedToken = JSON.parse(tokenData);
    return parsedToken?.token || null;
}