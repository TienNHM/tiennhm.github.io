import Link from "@docusaurus/Link";
import Translate, { translate } from "@docusaurus/Translate";
import { SHOWCASE } from "@site/src/data/contacts";
import Heading from "@theme/Heading";
import React from "react";

export default function ShowcaseHeader() {
    return (
        <section className="margin-top--lg margin-bottom--lg text--center">
            <Heading as="h1">{SHOWCASE.TITLE}</Heading>
            <p>{SHOWCASE.DESCRIPTION}</p>
            <Link className="button button--primary" to={SHOWCASE.SUBMIT_URL}>
                <Translate id="showcase.header.button">Visit my GitHub 👨‍💻</Translate>
            </Link>
        </section>
    );
}