import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useState } from "react"

const Navigation = () => {
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
    const obj = nodes.find(({ node }) => node.frontmatter.text == value)
    setText(obj.node.excerpt)
  }

  return (
    <div>
      <nav>
        <ul>
          <li>
            <a>Strona główna</a>
          </li>
          {list.map(item => (
            <li key={item.name}>
              <a
                value={item.name}
                onMouseEnter={e => handleMenuHover(e)}
                onMouseLeave={() => setText("")}
              >
                {item.name}
              </a>
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
