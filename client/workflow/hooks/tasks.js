/* global wp */
/* eslint-disable */

import { useState, useEffect } from 'react';
import { getInProgressTaskSlug, setInProgressTaskSlug } from '../services/tasks';

/**
 * Custom hook that manages the active task state.
 *
 * @return {string} IN PROGRESS task slug.
 */
export default function useInProgressTaskSlug() {
  const [
    inProgressTaskSlug,
    setInProgressTaskSlug,
  ] = useState(getInProgressTaskSlug());

  // Subscribe to changes in the store.
  useEffect(() => wp.data.subscribe(() => {
      const newSlug = getInProgressTaskSlug();
      if (inProgressTaskSlug !== newSlug) {
        setInProgressTaskSlug(newSlug);
      }
  }));

  return inProgressTaskSlug;
}
