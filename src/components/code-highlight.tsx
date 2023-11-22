import React, { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism.css"; // Choose a theme
import "prismjs/components/prism-markup"; // HTML language module

interface ICodeHighlight {
  code: any;
}

const CodeHighlight = ({ code }: ICodeHighlight) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <pre>
      <code className="language-markup">{code}</code>
    </pre>
  );
};

export default CodeHighlight;
