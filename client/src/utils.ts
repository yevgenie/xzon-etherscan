export const Colors = {
    gray: "#bdc3c7",
    green: "#27ae60",
    blue: "#2980b9",
    orange: "#e74c3c",
    darkBlue: "#2c3e50"
}

export const toWei = (value: number) => {
    return (value / 1000000000000000000).toFixed(5);
}