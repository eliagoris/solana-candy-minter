import { Theme } from "theme-ui"

import base from "./preset-base"

const theme: Theme = {
  ...base,
  colors: {
    background: "#1A1A26",
    text: "#969AB2",
    primary: "#DD4043",
    heading: "#fff",
    background2: "#212334",
    background3: "#010001",
  },

  sizes: {
    container: "64rem",
  },
  config: {
    useLocalStorage: true,
  },

  buttons: {
    primary: {
      color: "background",
      backgroundColor: "primary",
      border: "1px solid transparent",
      transition: "all .3s linear",

      "&:not(:disabled):hover": {
        bg: "background",
        color: "primary",
        borderColor: "primary",
        cursor: "pointer",
      },

      "&:disabled": {
        cursor: "not-allowed",
        opacity: 0.3,
      },
    },
  },

  lineHeights: { body: 1.45 },

  text: {
    heading: {
      color: "heading",
      lineHeight: "body",
      fontSize: "2.2rem",
    },
    heading2: {
      color: "heading",
      lineHeight: "body",
      fontSize: "1.9rem",
    },
    heading3: {
      color: "heading",
      lineHeight: "body",
      fontSize: "1.7rem",
    },
    base: {
      color: "text",
      lineHeight: "body",
      fontSize: "1.4rem",
    },
    small: {
      color: "text",
      lineHeight: "body",
      fontSize: "1.2rem",
    },
  },

  styles: {
    ...base.styles,

    root: {
      ...base.styles?.root,
      fontSize: "62.5%",

      body: {
        /** Default text styles */
        fontSize: "1.4rem",
        lineHeight: 1.45,
        color: "text",
      },

      img: {
        maxWidth: "100%",
        height: "auto",
      },

      p: {
        margin: 0,
      },
    },
  },
}

export default theme
