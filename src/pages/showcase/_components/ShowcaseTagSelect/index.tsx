import React, {
  useCallback,
  useState,
  useEffect,
  type ComponentProps,
  type ReactNode,
  type ReactElement,
} from 'react';
import {useHistory, useLocation} from '@docusaurus/router';
import {toggleListItem} from '@site/src/utils/jsUtils';
import styles from './styles.module.css';
import { ProjectTagType } from '@site/src/shared/constants/ProjectConsts';
import { prepareUserState } from '../ShowcaseUserState';

interface Props extends ComponentProps<'input'> {
  icon: ReactElement<ComponentProps<'svg'>>;
  label: ReactNode;
  tag: ProjectTagType;
}

const TagQueryStringKey = 'tags';

export function readSearchTags(search: string): ProjectTagType[] {
  return new URLSearchParams(search).getAll(TagQueryStringKey) as ProjectTagType[];
}

function replaceSearchTags(search: string, newTags: ProjectTagType[]) {
  const searchParams = new URLSearchParams(search);
  searchParams.delete(TagQueryStringKey);
  newTags.forEach((tag) => searchParams.append(TagQueryStringKey, tag));
  return searchParams.toString();
}

function ShowcaseTagSelect(
  {id, icon, label, tag, ...rest}: Props,
  ref: React.ForwardedRef<HTMLLabelElement>,
) {
  const location = useLocation();
  const history = useHistory();
  const [selected, setSelected] = useState(false);
  useEffect(() => {
    const tags = readSearchTags(location.search);
    setSelected(tags.includes(tag));
  }, [tag, location]);
  const toggleTag = useCallback(() => {
    const tags = readSearchTags(location.search);
    const newTags = toggleListItem(tags, tag);
    const newSearch = replaceSearchTags(location.search, newTags);
    history.push({
      ...location,
      search: newSearch,
      state: prepareUserState(),
    });
  }, [tag, location, history]);
  return (
    <>
      <input
        type="checkbox"
        id={id}
        className="screen-reader-only"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            toggleTag();
          }
        }}
        onFocus={(e) => {
          if (e.relatedTarget) {
            e.target.nextElementSibling?.dispatchEvent(
              new KeyboardEvent('focus'),
            );
          }
        }}
        onBlur={(e) => {
          e.target.nextElementSibling?.dispatchEvent(new KeyboardEvent('blur'));
        }}
        onChange={toggleTag}
        checked={selected}
        {...rest}
      />
      <label ref={ref} htmlFor={id} className={styles.checkboxLabel}>
        {label}
        {icon}
      </label>
    </>
  );
}

export default React.forwardRef(ShowcaseTagSelect);
