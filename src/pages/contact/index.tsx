import React from "react";
import CannyFeedback from "@site/src/components/CannyFeedback";
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import clsx from 'clsx';
import styles from './styles.module.css';

export default function Contact(): JSX.Element {
    return (
      <CannyFeedback basePath="/contact"/>
    );
  }
  