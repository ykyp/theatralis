export const removeQueryParam = (query, param) => {
    const updatedQuery = query;
    delete updatedQuery[param];

    push({ query: updatedQuery }, undefined, { shallow: true });
}

export const getDatesInRange = (startDate, endDate) => {
    const date = new Date(startDate.getTime());
    date.setDate(date.getDate());
    const dates = [];
    while (date <= endDate) {
        dates.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }

    return dates;
};

export const getDayName = (date = new Date(), locale = 'en-US') => {
    return date.toLocaleDateString(locale, { weekday: 'short' });
};

export const getMonthName = (date = new Date(), locale = 'en-US') => {
    return date.toLocaleDateString(locale, { month: 'short' });
};