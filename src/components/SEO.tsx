import React, { DetailedHTMLProps, MetaHTMLAttributes } from 'react';
import { Helmet } from 'react-helmet';
import { useSiteMetadata } from '../hooks/useSiteMetadata';

function SEO({
  title,
  description,
  lang = 'en',
  meta = [],
}: {
  title?: string;
  description?: string;
  lang?: string;
  meta?: DetailedHTMLProps<
    MetaHTMLAttributes<HTMLMetaElement>,
    HTMLMetaElement
  >[];
}) {
  const siteMetadata = useSiteMetadata();

  return (
    <Helmet
      htmlAttributes={{
        lang: lang || siteMetadata.lang,
      }}
      title={title}
      defaultTitle={siteMetadata.title}
      titleTemplate={`%s | ${siteMetadata.title}`}
      meta={[
        {
          name: 'description',
          content: description || siteMetadata.description,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: description || siteMetadata.description,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:creator',
          content: siteMetadata.twitterHandle,
        },
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:description',
          content: description || siteMetadata.description,
        },
        ...meta,
      ]}
    />
  );
}

export default SEO;
