// Helper function to generate hex hashes from strings.
export default function (input: String) {
  let hash = 0;

  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0; // Convert to 32-bit integer.
  }

  // Convert hash to hex and take the first 4 characters.
  return (hash >>> 0).toString(16).substring(0, 4);
}
