export function getDaysBetweenDates(startDate: string, endDate: string) {
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);

    const diffInMilliseconds = Math.abs(date2.getTime() - date1.getTime());
    const oneDayInMilliseconds = 1000 * 60 * 60 * 24;

    return Math.round(diffInMilliseconds / oneDayInMilliseconds);
}

//const days = getDaysBetweenDates("2024-09-23", "2024-10-30");/
//console.log(`Number of days: ${days}`); // Output: Number of days: 37