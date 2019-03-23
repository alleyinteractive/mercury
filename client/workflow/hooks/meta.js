/* global wp */
/* eslint-disable */

import { useState, useEffect } from 'react';
import { getMeta, setMeta } from '../services/meta';
import getWorkflows from '../services/workflows';

/**
 * Custom hook that manages a meta state.
 *
 * @param  {string} metaKey      Meta key in the core/editor WP store.
 * @param  {string} defaultValue Default value to populate the store if empty.
 * @return {mixed} Meta value.
 */
export default function useMeta(metaKey, defaultValue) {
  // If metaKey value is empty, populate with the defaultValue.
  let metaValue = getMeta(metaKey);
  if ('' === metaValue && undefined !== defaultValue) {
    metaValue = defaultValue;
    setMeta(defaultValue);
  }

  // Setup local state.
  const [value, setValue] = useState(metaValue);
  // Subscribe to changes in the store.
  useEffect(() => wp.data.subscribe(() => {
      const newMeta = getMeta(metaKey);
      if (value !== newMeta) {
        setValue(newMeta);
      }
  }));

  return value;
}
