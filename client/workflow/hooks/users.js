/* global wp */
import {
  useState,
  useEffect,
} from 'react';
import getUser from 'services/users';

/**
 * Custom hook that manages the current user state.
 *
 * @return {Object} Current user object.
 */
export default function useUser() {
  const [user, setUser] = useState(getUser());

  useEffect(() => (
    wp.data.subscribe(() => {
      setUser(getUser());
    })
  ));
  return user;
}
