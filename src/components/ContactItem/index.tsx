import Link from "@docusaurus/Link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import React from "react";
import styles from "./styles.module.css";

export default function ContactItem({icon, contact, title} : {icon: any, contact: any, title: string}) {
    const Svg = contact.icon;
    return (
      <div className={styles.buttons}>
        <Link className={clsx('button button--lg', styles.cardInfoButton)}
          title={title} to={contact.link}>
            {contact.icon && <Svg role="img" />}
            {!contact.icon && <FontAwesomeIcon icon={icon} size='xl'/>}
        </Link>
      </div>
    );
  }