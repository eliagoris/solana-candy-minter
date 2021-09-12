import React from "react"
import { Flex } from "theme-ui"

const TextWrapper = ({ children }) => {
  return (
    <Flex
      sx={{
        flexDirection: "column",
        maxWidth: "42rem",
      }}
    >
      {children}
    </Flex>
  )
}

export default TextWrapper
