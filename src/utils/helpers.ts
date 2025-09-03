/**
 * Generate a random ID
 * @returns A random string ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

/**
 * Format a timestamp to a readable date
 * @param timestamp The timestamp to format
 * @returns A formatted date string
 */
export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * Format a timestamp to a relative time (e.g., "2 hours ago")
 * @param timestamp The timestamp to format
 * @returns A relative time string
 */
export const formatRelativeTime = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp;
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) {
    return `${days} day${days === 1 ? '' : 's'} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  } else {
    return 'Just now';
  }
};

/**
 * Truncate a string to a specified length
 * @param str The string to truncate
 * @param length The maximum length
 * @returns The truncated string
 */
export const truncateString = (str: string, length: number): string => {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
};

/**
 * Format a price in dollars
 * @param price The price to format
 * @returns A formatted price string
 */
export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

/**
 * Check if a URL is an image
 * @param url The URL to check
 * @returns Whether the URL is an image
 */
export const isImageUrl = (url: string): boolean => {
  return /\.(jpg|jpeg|png|webp|avif|gif)$/.test(url);
};

/**
 * Get the file extension from a file name
 * @param filename The file name
 * @returns The file extension
 */
export const getFileExtension = (filename: string): string => {
  return filename.split('.').pop() || '';
};

/**
 * Convert a File object to a base64 string
 * @param file The file to convert
 * @returns A Promise that resolves to the base64 string
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

