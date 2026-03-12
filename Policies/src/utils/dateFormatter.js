/**
 * Format a date to YYYY-MM-DD string for HTML date inputs
 * @param {Date | string | null | undefined} date - The date to format
 * @returns {string} - Formatted date string (YYYY-MM-DD) or empty string
 */
export const formatDateForInput = (date) => {
  if (!date) return "";
  
  try {
    // If it's already a string in YYYY-MM-DD format, return it
    if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}/.test(date)) {
      return date.split("T")[0]; // Handle ISO strings with time component
    }
    
    // Convert to Date object if it's a string
    const dateObj = typeof date === "string" ? new Date(date) : date;
    
    if (!(dateObj instanceof Date) || isNaN(dateObj)) {
      return "";
    }
    
    // Format as YYYY-MM-DD
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    
    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error("Error formatting date:", error, date);
    return "";
  }
};

/**
 * Format a date to display format (e.g., "Jan 15, 2024")
 * @param {Date | string | null | undefined} date - The date to format
 * @returns {string} - Formatted date string or empty string
 */
export const formatDateForDisplay = (date) => {
  if (!date) return "";
  
  try {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    
    if (!(dateObj instanceof Date) || isNaN(dateObj)) {
      return "";
    }
    
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch (error) {
    console.error("Error formatting date for display:", error, date);
    return "";
  }
};
