export const formatDate = (date: Date) => date.toISOString().split('T')[0];

export const getDateFromFilter = (filter: string) => {
    const now = new Date();
    const from = new Date();

    switch (filter) {
        case "day":
            from.setDate(now.getDate() - 1);
            break;
        case "week":
            from.setDate(now.getDate() - 7);
            break;
        case "month":
            from.setMonth(now.getMonth() - 1);
            break;
        case "year":
            from.setFullYear(now.getFullYear() - 1);
            break;
        default:
            from.setDate(now.getDate());
    }

    return formatDate(from);
};

export const getToday = () => formatDate(new Date());

export const getLast24hRange = () => {
    const now = new Date();
    const from = new Date();
    from.setHours(now.getHours() - 24);

    return {
        dateFrom: formatDate(from),
        dateTo: formatDate(now),
    };
};

export const getMonthRange = () => {
    const now = new Date();
    const from = new Date();
    from.setMonth(now.getMonth() - 1);

    return {
        dateFrom: formatDate(from),
        dateTo: formatDate(now),
    };
};

export const getYearRange = () => {
    const now = new Date();
    const from = new Date();
    from.setFullYear(now.getFullYear() - 1);

    return {
        dateFrom: formatDate(from),
        dateTo: formatDate(now),
    };
};