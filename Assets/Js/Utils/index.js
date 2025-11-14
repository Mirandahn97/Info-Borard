export const getLocalTime = (date) => {
    const stamp = new Date(date)
    return new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit'
    }).format(stamp);
}