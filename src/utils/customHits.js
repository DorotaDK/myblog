import React from "react"
import { Highlight } from "react-instantsearch-dom"
import { Link } from "gatsby"

const CustomHits = ({ hit }) => (
  <Link to={hit.fields.slug}>
    <Highlight hit={hit} attribute="frontmatter.title" tagName="mark" />
    <p>
      <Highlight hit={hit} attribute="excerpt" tagName="mark" />
    </p>
  </Link>
)

export default CustomHits
