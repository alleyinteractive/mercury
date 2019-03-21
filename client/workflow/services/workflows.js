/* global wp */

/**
 * WordPress dependencies.
 */
const {
  apiFetch,
} = wp;

/**
 * Get a meta value from Gutenberg.
 */
export default async function getWorkflows(setWorkflows) {
  const fetchArgs = {
    path: '/mercury/v1/workflows',
    method: 'GET',
  };
  const workflows = await apiFetch(fetchArgs).then((data) => data);
  setWorkflows(workflows);
}
