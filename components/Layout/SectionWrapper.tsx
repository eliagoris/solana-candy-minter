import React from "react"
import { Container, Flex } from "theme-ui"

const SectionWrapper = ({ as = null, className = "", children }) => {
  return (
    <Flex
      className={className}
      as={as}
      sx={{
        gap: "1.6rem",
        padding: "3.2rem 0",
        flexDirection: "column",
      }}
    >
      <Container>{children}</Container>
    </Flex>
  )
}

export default SectionWrapper
