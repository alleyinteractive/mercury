import { useState, useEffect } from 'react';
import {
  getInProgressTaskSlug,
  getSelectedTaskSlug,
} from 'services/tasks';

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

/**
 * Custom hook to check if a transition from one task to the next is complete
 * based on comparison with the current in-progress and selected tasks.
 *
 * @return {string} Task slug to compare against (should be task which currently selected transition targets)
 */
export function useSaveOnTransitionComplete(taskSlug) {
  // Subscribe to changes in the store.
  useEffect(() => wp.data.subscribe(() => {
    const inProgress = getSelectedTaskSlug();
    const selected = getSelectedTaskSlug();

    if (
      inProgress === taskSlug
      && selected === taskSlug
    ) {
      const edits = wp.data.select('core/editor').getPostEdits();

      // Save post
      wp.data.dispatch('core/editor').savePost();
      wp.data.dispatch('core/editor').updatePost(edits);
    }
  }));
}
