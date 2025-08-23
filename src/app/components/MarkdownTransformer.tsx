'use client';
import { JSX, useState, useEffect } from 'react';    
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Image from 'next/image';
import * as appConstants from "@utils/appConstants"
import styles from "@styles/components/markdown-transformer.module.scss";
import { CustomLoader } from "./CustomLoader";

interface MarkdownTransformerProps {
  content: string;
  textAlign?: 'left' | 'center' | 'right';
  alignContent?: 'left' | 'center' | 'right';
}


/**
 * Komponente, die Markdown-Text in HTML-Elemente transformiert.
 * 
 * Die Komponente verwendet ReactMarkdown, um den Markdown-Text zu verarbeiten.
 * 
 * Die Komponente unterstützt Markdown-Elemente wie:
 * 
 * - Headers (h1, h2, h3)
 * - Paragraphen (p)
 * - Links (a)
 * - Text-Formatierungen (em, strong, del)
 * - Bilder (img)
 * - Listen (ul, ol, li)
 * - Code-Blöcke (code)
 * - Blockquotes (blockquote)
 * 
 * Die Komponente verwendet die CSS-Klassen der styles/markdown-transformer.module.scss,
 * um die Formatierung der Elemente zu bestimmen.
 * 
 * @param props - Die Markdown-Komponente erhält den Markdown-Text als String.
 * 
 * @returns Die transformierte Markdown-Komponente als JSX-Element.
 */
export function MarkdownTransformer({ content, textAlign = 'center', alignContent = 'center' }: MarkdownTransformerProps) : JSX.Element {

 return (
    <div className={`${styles.markdownContent} ${styles[`markdownContent--${alignContent}`]}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          // Headers
          h1: ({ children }) => (
            <h1 className={styles.heading1}>{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className={styles.heading2}>{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className={styles.heading3}>{children}</h3>
          ),
          
          // Paragraphen
          p: ({ children }) => (
            <p className={`${styles.paragraph} ${styles[`paragraph--${textAlign}`]}`}>{children}</p>
          ),
          
          // Links
          a: ({ href, children }) => (
            <a 
              href={href}
              className={styles.link}
              target="_blank" 
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          
          // Text-Formatierungen
          em: ({ children }) => (
            <em className={styles.italic}>{children}</em>
          ),
          strong: ({ children }) => (
            <strong className={styles.bold}>{children}</strong>
          ),
          del: ({ children }) => (
            <del className={styles.strikethrough}>{children}</del>
          ),
          
          // Bilder mit Next.js Image
          img: ({ src, alt }: { src?: string | Blob ; alt?: string }) => (
            <span className={styles.markdownImageWrapper}>
              <MarkdownImage src={src} alt={alt} />
            </span>
          ),
          
          // Listen
          ul: ({ children }) => (
            <ul className={styles.unorderedList}>{children}</ul>
          ),
          ol: ({ children, start }) => (
            <ol className={styles.orderedList} start={start}>
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className={styles.listItem}>{children}</li>
          ),
          
          // Code (falls vorhanden)
          code: ({ children }) => {
            
            return (
              <pre className={styles.codeBlock}>
                <code className={styles.code}>{children}</code>
              </pre>
            );
          },
          
          // Blockquotes (falls vorhanden)
          blockquote: ({ children }) => (
            <blockquote className={styles.blockquote}>
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

// Custom Hook für Blob-URL-Management
function useBlobUrl(src: string | Blob | undefined) {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  
  useEffect(() => {
    if (src instanceof Blob) {
      const url = URL.createObjectURL(src);
      setBlobUrl(url);
      
      // Cleanup
      return () => {
        URL.revokeObjectURL(url);
        setBlobUrl(null);
      };
    } else {
      setBlobUrl(null);
    }
  }, [src]);
  
  return blobUrl;
}

function MarkdownImage({ src, alt }: { src : string | Blob | undefined, alt?: string }) {
  const blobUrl = useBlobUrl(src);
  
  if (!src) {
    console.warn('MarkdownImage: Image without src attribute');
    return null;
  }
  
  // Bestimme die finale URL
  const finalSrc = src instanceof Blob ? blobUrl : src;
  
  // Kein Rendering wenn Blob-URL noch nicht verfügbar
  if (src instanceof Blob && !blobUrl) {
    return (
        <span className={styles.imagePlaceholder}>
          <CustomLoader />
        </span>
    );
  }
  
  return (
        <Image
          src={finalSrc as string}
          alt={alt || 'Embedded Image'}
          fill={true}
          sizes={appConstants.imgDefaultSizes}
          style={{ objectFit: 'cover' }}
          loading="lazy"
          onError={(e) => {
            console.error('MarkdownImage:', e);
          }}
        />
  );
};