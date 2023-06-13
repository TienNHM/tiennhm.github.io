import React from 'react';
import { useBlogPost } from '@docusaurus/theme-common/internal'
import BlogPostItem from '@theme-original/BlogPostItem';
import GiscusComponent from '@site/src/components/GiscusComponent';
import useIsBrowser from '@docusaurus/useIsBrowser';

import styles from './styles.module.css';
import clsx from 'clsx';

import {
  EmailShareButton,
  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton
} from "react-share";
import {
  FacebookShareCount,
  HatenaShareCount,
  OKShareCount,
  PinterestShareCount,
  RedditShareCount,
  TumblrShareCount,
  VKShareCount
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon
} from "react-share";
import Translate from '@docusaurus/Translate';

export function ShareSocialMedia({ isBrowser, title, ...rest }) {
  return (
    <div className={clsx(styles.shareSocialMedia)}>
      <h4 className={clsx(styles.shareHeading)}>
        <Translate id='share.section.title'>Share this page</Translate> 
      </h4>
      <div className={clsx(styles.shareButtons)}>
        <FacebookShareButton url={isBrowser ? window.location.href : ''} quote={title}>
          <FacebookIcon size={48} round={true} />
        </FacebookShareButton>
        <WorkplaceShareButton url={isBrowser ? window.location.href : ''} quote={title}>
          <WorkplaceIcon size={48} round={true} />
        </WorkplaceShareButton>
        <TwitterShareButton url={isBrowser ? window.location.href : ''} title={title}>
          <TwitterIcon size={48} round={true} />
        </TwitterShareButton>
        <LinkedinShareButton url={isBrowser ? window.location.href : ''} title={title}>
          <LinkedinIcon size={48} round={true} />
        </LinkedinShareButton>
        <RedditShareButton url={isBrowser ? window.location.href : ''} title={title}>
          <RedditIcon size={48} round={true} />
        </RedditShareButton>
      </div>
    </div>
  )
}

export default function BlogPostItemWrapper(props) {
  const { metadata, isBlogPostPage } = useBlogPost()
  const isBrowser = useIsBrowser();

  const { frontMatter, slug, title } = metadata
  const { enableComments } = frontMatter

  return (
    <div className={clsx(styles.main)}>
      <BlogPostItem {...props} />

      {(enableComments && isBlogPostPage) && (
        <>
          <ShareSocialMedia isBrowser={isBrowser} title={title} />
          <GiscusComponent />
        </>
      )}
    </div>
  );
}