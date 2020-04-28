# Next MDX Deck

Create presentation decks using MDX, React, and [Next.js](https://nextjs.org/).

## Getting Started

1. Clone the project: `git clone https://github.com/whoisryosuke/next-mdx-deck`
2. Install dependencies: `npm i` or `yarn`
3. Run the dev server: `npm run dev` or `yarn dev`
4. Edit the first slide in `/slides/1.mdx` and save to [**see changes**](http://localhost:3000/)!

When you're done, run `npm run build && npm run export` or `yarn build && yarn export` will create a static app you can deploy anywhere (or use locally). See below for more details.

### Deploying

This project is easy to build locally or using a host with build services (like Netlify or Now).

1. ⚙️ Run the build process: `npm run build && npm run export`
1. 🚀 Upload the static contents of `out` folder to host/CDN (or run the `out/index.html` locally)

## How to Use

### 💬 Changing the Title/Date/etc

The default theme includes a title, date, author (and link to the author's website) in of the `<Header>` component. You can edit this data inside the `site.config.js` file. 

### ✍️ Writing JSX

You can use JSX in [a few ways](https://mdxjs.com/getting-started) in your MDX files:

- You can use the syntax with HTML (`<button style={{ color: "red" }}>`)
- You can import React component from other files (`import Button from "../components/Button"`). Then you can use that component anywhere in that MDX file. The path to the component is relative to the MDX file.
- You can use any React component imported into the `<MDXProvider>` (inside `/components/MDXProvider.js`). This allows you to use the component without importing it inside each MDX file.
- You can define React components inside MDX files and then use them. MDX supports the use of JS inside files, like exporting variables, or in this case — defining new functions. `const Button = () => <button style={{ color: "red" }}>`

[Check out the MDX docs](https://mdxjs.com/getting-started) for more information on the syntax.

### 📃 Creating Slide Pages

Slide pages are incremental, starting at 1. If you need a new page, create a new MDX file that is named one number higher than the last page (e.g. `3.mdx` if there's 2 pages).

### 🎨 Theming the Slideshow

Theming is accomplished with **CSS custom properties** and/or **Styled Components**. 

Design tokens are stored as CSS custom properties inside the SlidePage layout (`/layouts/SlidePage.jsx`), which are injected into the app using Styled Component's global styling utility. There you can change the color of text, background colors, fonts, etc.

The actual CSS styles of the Slideshow are also stored in the SlidePage layout. There you can change the padding of slides, alignment of quotes, etc.

When the Markdown is parsed into HTML, you can replace HTML with React components. These "swaps" are handled by the `<MDXProvider>` component. You can import custom components and swap elements (like a `<button>` with `<Button>`), or import components to use inside MDX (great for creating things like 2-col layouts with component). There you can change the syntax highlighting or find any custom MDX components. It's recommended to use Styled Components there to create custom components.

## Learn More

### MDX

To learn more about **MDX**, take a look at the following resources:

- [MDX Documentation](https://mdxjs.com/)
- [Getting started with MDX](https://mdxjs.com/getting-started)
- [Using MDX with Next.js](https://mdxjs.com/getting-started/next)

### Next.js

To learn more about **Next.js**, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
