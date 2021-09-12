import React from "react"
import { Container, Flex } from "theme-ui"

const SectionWrapper = ({
  as = null,
  backgroundColor = "background",
  className = "",
  children,
}) => {
  return (
    <Flex
      sx={{
        padding: "3.2rem 0",
        backgroundColor,
      }}
    >
      <Container
        className={className}
        sx={{
          display: "flex",
          gap: "1.6rem",
          flexDirection: "column",
        }}
        as={as}
      >
        {children}
      </Container>
    </Flex>
  )
}

export default SectionWrapper
