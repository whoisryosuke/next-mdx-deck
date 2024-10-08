import mdx from "@next/mdx";
import rehypeHighlight from "rehype-highlight";

const withMDX = mdx({
  extension: /\.(md|mdx)$/,
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [],
    rehypePlugins: [rehypeHighlight],
  },
});

export default withMDX({
  pageExtensions: ["js", "jsx", "mdx"],
});
