import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { useState } from "react"
import "../style/navigation.scss"

const Navigation = ({ parentCallback }) => {
  const [text, setText] = useState("")
  const [page, setPage] = useState("")
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
    setPage(value)
  }

  return (
    <div className="header-navigation">
      <nav className="header-navigation-menu">
        <ul className="header-navigation-menu__ul">
          <li className="header-navigation-menu__main-page">
            <Link to={`/`} value="" onClick={e => handleMenuClick(e)}>
              Strona główna
            </Link>
          </li>
          {list.map(item => (
            <li
              key={item.name}
              className={`header-navigation-menu__${item.name}`}
            >
              <Link
                value={item.name}
                onMouseEnter={e => handleMenuHover(e)}
                onMouseLeave={() => setText("")}
                onClick={e => handleMenuClick(e)}
                to={`/`}
                state={{ text: item.name }}
              >
                {item.name}
              </Link>
            </li>
          ))}
          <li className="header-navigation-menu__about">
            <Link to="/about/">O mnie</Link>
          </li>
          <li className="header-navigation-menu__contact">
            <Link to="/contact/">Kontakt</Link>
          </li>
        </ul>
      </nav>
      <section
        className={`header-navigation-image header-navigation-image--${page}`}
      >
        {text}
      </section>
    </div>
  )
}

export default Navigation
