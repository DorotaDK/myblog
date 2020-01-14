import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { useState } from "react"

const Navigation = ({ parentCallback }) => {
  const [text, setText] = useState("")
  const data = useStaticQuery(graphql`
    query MyQuery {
      allFile(filter: { sourceInstanceName: { eq: "shorts" } }) {
        nodes {
          name
        }
      }
      allMarkdownRemark {
        edges {
          node {
            excerpt
            frontmatter {
              text
            }
          }
        }
      }
    }
  `)
  const list = data.allFile.nodes
  const nodes = data.allMarkdownRemark.edges

  function handleMenuHover(e) {
    const value = e.target.getAttribute("value")
    const obj = nodes.find(({ node }) => node.frontmatter.text === value)
    setText(obj.node.excerpt)
  }

  function handleMenuClick(e) {
    const value = e.target.getAttribute("value")
    parentCallback(value)
  }

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to={`/`} value="" onClick={e => handleMenuClick(e)}>
              Strona główna
            </Link>
          </li>
          {list.map(item => (
            <li key={item.name}>
              <Link
                value={item.name}
                onMouseEnter={e => handleMenuHover(e)}
                onMouseLeave={() => setText("")}
                onClick={e => handleMenuClick(e)}
                to={`/`}
              >
                {item.name}
              </Link>
            </li>
          ))}
          <li>
            <a>O mnie</a>
          </li>
          <li>
            <a>Kontakt</a>
          </li>
        </ul>
      </nav>
      <section>{text}</section>
    </div>
  )
}

export default Navigation
