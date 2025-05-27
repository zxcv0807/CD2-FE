import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const CoTBubble = ({ text, isLoading }) => {
  return (
    <div className="flex items-start w-full mb-4">
      {isLoading && (
        <div className="flex justify-center items-center mr-3">
          <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-[#A476CC]"></div>
        </div>
      )}
      <div className="w-full text-sm italic bg-yellow-50 dark:bg-yellow-900/20 rounded-xl px-4 py-2 animate-pulse">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({node, inline, className, children, ...props}) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag={"div"}
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
          }}
        >
          {text}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default CoTBubble;