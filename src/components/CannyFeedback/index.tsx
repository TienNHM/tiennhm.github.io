import React, {useEffect} from 'react';
import clsx from 'clsx';
import {useColorMode} from '@docusaurus/theme-common';
import Translate, {translate} from '@docusaurus/Translate';
import Layout from '@theme/Layout';

import cannyScript from './cannyScript';
import styles from './styles.module.css';

const BOARD_TOKEN = '441a2b5d-d4e2-8f42-81ff-249650e7b70b';
const TITLE = translate({message: 'Contact'});
const DESCRIPTION = translate({
  message: 'Contact me',
});

function useCannyTheme() {
  const {colorMode} = useColorMode();
  return colorMode === 'light' ? 'light' : 'dark';
}

function CannyWidget({basePath}: {basePath: string}) {
  useEffect(() => {
    cannyScript();
  }, []);

  const theme = useCannyTheme();
  useEffect(() => {
    const {Canny} = window as any;
    Canny('render', {
      boardToken: BOARD_TOKEN,
      basePath,
      theme,
    });
  }, [basePath, theme]);
  return (
    <main
      key={theme} // widget needs a full reset: unable to update the theme
      className={clsx('container', 'margin-vert--lg', styles.main)}
      data-canny
    />
  );
}

export default function CannyFeedback({
  basePath,
}: {
  basePath: string;
}): JSX.Element {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <CannyWidget basePath={basePath} />
    </Layout>
  );
}
