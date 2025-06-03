"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

type Props = {
  content: string;
  articleRef: React.RefObject<HTMLDivElement | null>;
};

export default function NotebookViewer({ content, articleRef }: Props) {
  return (
    <article ref={articleRef} className="markdown px-8 pb-8">
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ node, ...props }) => <h1 className="markdown-h1" {...props} />,
          h2: ({ node, ...props }) => <h2 className="markdown-h2" {...props} />,
          p: ({ node, ...props }) => <p className="markdown-p" {...props} />,
          code: ({ node, ...props }) => <code className="markdown-code" {...props} />,
          pre: ({ node, ...props }) => <pre className="markdown-pre" {...props} />,
          img: ({ node, ...props }) => <img className="markdown-img" {...props} />,
          blockquote: ({ node, ...props }) => <blockquote className="markdown-blockquote" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
