import React from 'react';
import { siteMetadata } from '../siteMetadata';

interface SEOProps {
  title?: string;
  description?: string;
  lang?: string;
}

function SEO(props: SEOProps) {
  const lang = props.lang || siteMetadata.lang;
  const title = props.title
    ? `${props.title} | ${siteMetadata.title}`
    : siteMetadata.title;
  const description = props.description || siteMetadata.description;
  const creator = siteMetadata.twitterHandle;

  return (
    <>
      <html lang={lang} />
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:type' content='website' />
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:creator' content={creator} />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
    </>
  );
}

export default SEO;
