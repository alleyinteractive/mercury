/* eslint-disable */

import { useState, useEffect } from 'react';
import {
  getInProgressTaskSlug,
  getSelectedTaskSlug,
  setDefaultSelectedTaskSlug,
} from '../services/tasks';

/**
 * Custom hook that manages the active task state.
 *
 * @return {string} In progress task slug.
 */
export function useInProgressTaskSlug() {
  const [
    inProgressTaskSlug,
    setInProgressTaskSlugState,
  ] = useState(getInProgressTaskSlug());

  // Subscribe to changes in the store.
  useEffect(() => wp.data.subscribe(() => {
      const newSlug = getInProgressTaskSlug();
      if (inProgressTaskSlug !== newSlug) {
        setInProgressTaskSlugState(newSlug);
      }
  }));

  return inProgressTaskSlug;
}

/**
 * Custom hook that manages the active task state.
 *
 * @return {string} Selected task slug.
 */
export function useSelectedTaskSlug() {
  const [
    selectedTaskSlug,
    setSelectedTaskSlugState,
  ] = useState(getSelectedTaskSlug());

  // Subscribe to changes in the store.
  useEffect(() => wp.data.subscribe(() => {
      const newSlug = getSelectedTaskSlug();
      if (selectedTaskSlug !== newSlug) {
        setSelectedTaskSlugState(newSlug);
      }
  }));

  return selectedTaskSlug;
}
