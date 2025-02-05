
export function getRandomInt(min = 0, max = 1) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function mapColor(value, start = [243, 245, 159], end = [54, 99, 12]) {
    value = value / 100;
    const r = start[0] + (end[0] - start[0]) * value;
    const g = start[1] + (end[1] - start[1]) * value;
    const b = start[2] + (end[2] - start[2]) * value;
    return `rgb(${r}, ${g}, ${b})`;

    /* rgb(134, 211, 14) */
}