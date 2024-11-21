// // Helper function to generate hex hashes from strings.
// export default function (input: String) {
//   let hash = 0;

//   for (let i = 0; i < input.length; i++) {
//     hash = (hash << 5) - hash + input.charCodeAt(i);
//     hash |= 0; // Convert to 32-bit integer.
//   }

//   // Convert hash to hex and take the first 4 characters.
//   return (hash >>> 0).toString(16).substring(0, 4);
// }
// Helper function to generate numeric IDs from strings.
export default function generateId(input: string): number {
  let hash = 0;

  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0; // Convert to 32-bit integer.
  }

  // Combine hash with current timestamp
  const combined = (hash >>> 0) + Date.now();

  // Convert to string and get the last 4 digits
  const lastFourDigits = combined.toString().slice(-4);

  // Return as a string
  return lastFourDigits;
}
