'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-invert max-w-none p-6">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold text-white mb-6 border-b border-white/20 pb-3">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold text-white mb-4 mt-8">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-medium text-white mb-3 mt-6">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-gray-300 mb-4 leading-relaxed">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-outside text-gray-300 mb-4 space-y-2 pl-6">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-outside text-gray-300 mb-4 space-y-2 pl-6">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-gray-300">{children}</li>
          ),
          code: ({ children }) => (
            <code className="bg-gray-800 text-green-400 px-2 py-1 rounded text-sm font-mono">
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto mb-4 font-mono text-sm">
              {children}
            </pre>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-400 mb-4">
              {children}
            </blockquote>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-blue-400 hover:text-blue-300 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}