/**
 * Generates a unique 4-digit ID (between 1000 and 9999).
 * @returns {number} The generated 4-digit unique ID.
 */
export function generateUniqueId() {
    // Generates a random 4-digit number (between 1000 and 9999)
    return Math.floor(Math.random() * 9000) + 1000;
  }
  