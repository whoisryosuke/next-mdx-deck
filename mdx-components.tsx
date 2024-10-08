import React from "react";
import type { MDXComponents } from "mdx/types";
import { MDXProvider } from "@mdx-js/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import okaidia from "react-syntax-highlighter/dist/cjs/styles/prism/okaidia";
import SlidePage from "./layouts/SlidePage";
import Cover from "./components/Cover";
import SpeakerNotes from "./components/SpeakerNotes";
import Step from "./components/Step";
import Steps from "./components/Steps";
import { motion } from "framer-motion";

const mdComponents = {
  h1: (props) => <h1 {...props} />,
  pre: (props) => props.children,
  //   code: (props) => {
  //     const { className } = props;
  //     const language = className ? className.replace("language-", "") : "text";
  //     return (
  //       <SyntaxHighlighter
  //         className={className}
  //         language={language}
  //         style={okaidia}
  //         {...props}
  //       />
  //     );
  //   },
  Cover,
  SlidePage,
  SpeakerNotes,
  Step,
  Steps,
  motion,
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return mdComponents;
}
