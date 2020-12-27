import React from 'react';
import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <div dangerouslySetInnerHTML={{ __html: '<!-- RSA -->' }} />
        <body>
          <Main />
          <NextScript />
          <div dangerouslySetInnerHTML={{ __html: '<!-- 256 -->' }} />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
