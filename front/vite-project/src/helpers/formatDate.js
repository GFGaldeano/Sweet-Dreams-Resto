export function formatDate(dateString) {
    
    if (!dateString || typeof dateString !== "string") {
        throw new Error("Invalid date string");
    }

   
    const [year, month, day] = dateString.split("-");

    
    return `${day}/${month}/${year}`;
}
