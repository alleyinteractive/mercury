import { URL, serializeURL } from 'whatwg-url';

/**
 * Convert relative urls to absolute, leave absolute urls alone.
 *
 * @param {string} url
 * @returns {string|boolean} - relative url, or false if not an internal url
 */
export default function resolveUrl(url) {
  if ('string' !== typeof url) {
    return false;
  }

  try {
    // It's a complete URL, return it
    const urlObj = new URL(url);

    if (urlObj.host) {
      return url;
    }
  } catch (e) {
    // Provided URL is relative, make it absolute.
    const urlTrimmed = '/' === url[0] ? url.slice(1) : url;
    const serialized = serializeURL({
      host: window.location.host,
      scheme: 'https',
      username: '',
      password: '',
      path: [urlTrimmed],
      query: null,
      port: null,
    }, true);

    return serialized;
  }

  // Return URL if not returned previously.
  return url;
}
