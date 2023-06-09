import React from 'react';
import Giscus from "@giscus/react";
import { useColorMode } from '@docusaurus/theme-common';

export default function GiscusComponent() {
  const { colorMode } = useColorMode();

  return (
    <Giscus    
      repo="TienNHM/tiennhm.github.io"
      repoId="R_kgDOJmnUUw"
      category="General"
      categoryId="DIC_kwDOJmnUU84CWtld"
      mapping="url"
      term="Discussion"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="1"
      inputPosition="top"
      theme={colorMode}
      lang="vi"
      loading="lazy"
      id='giscus'
    />
  );
}