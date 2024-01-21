import { translate } from '@docusaurus/Translate';
import { useHistory, useLocation } from '@docusaurus/router';
import React, { useEffect, useState } from 'react';
import { prepareUserState } from '../..';
import styles from './styles.module.css';

export const SearchNameQueryKey = 'name';

export function readSearchName(search: string) {
  return new URLSearchParams(search).get(SearchNameQueryKey);
}

export default function SearchBar() {
    const history = useHistory();
    const location = useLocation();
    const [value, setValue] = useState<string | null>(null);

    useEffect(() => {
      setValue(readSearchName(location.search));
    }, [location]);

    function readSearchName(search: string) {
        return new URLSearchParams(search).get(SearchNameQueryKey);
    }

    return (
      <div className={styles.searchContainer}>
        <input
          id="searchbar"
          placeholder={translate({
            message: 'Search...',
            id: 'showcase.searchBar.placeholder',
          })}
          value={value ?? undefined}
          onInput={(e) => {
            setValue(e.currentTarget.value);
            const newSearch = new URLSearchParams(location.search);
            newSearch.delete(SearchNameQueryKey);
            if (e.currentTarget.value) {
              newSearch.set(SearchNameQueryKey, e.currentTarget.value);
            }
            history.push({
              ...location,
              search: newSearch.toString(),
              state: prepareUserState(),
            });
            setTimeout(() => {
              document.getElementById('searchbar')?.focus();
            }, 0);
          }}
        />
      </div>
    );
  }