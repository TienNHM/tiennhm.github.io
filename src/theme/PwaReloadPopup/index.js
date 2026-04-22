import React, { useState } from 'react';
import Translate, { translate } from '@docusaurus/Translate';

export default function PwaReloadPopup({ onReload }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="alert alert--secondary margin-bottom--md">
      <p>
        <Translate
          id="theme.PwaReloadPopup.info"
          description="The text for PWA reload popup">
          New version available
        </Translate>
      </p>
      <div>
        <button
          className="button button--link padding-horiz--none margin-right--sm"
          type="button"
          onClick={() => {
            setIsVisible(false);
            onReload();
          }}>
          <Translate
            id="theme.PwaReloadPopup.refreshButtonText"
            description="The text for PWA reload button">
            Refresh
          </Translate>
        </button>

        <button
          aria-label={translate({
            id: 'theme.PwaReloadPopup.closeButtonAriaLabel',
            message: 'Close',
            description: 'The ARIA label for close button of PWA reload popup',
          })}
          className="button button--sm button--secondary"
          type="button"
          onClick={() => setIsVisible(false)}>
          ×
        </button>
      </div>
    </div>
  );
}
