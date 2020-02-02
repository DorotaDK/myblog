import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { useState } from "react"
import "../style/navigation.scss"

const Navigation = ({ parentCallback, page, location }) => {
  const [text, setText] = useState("")
  const rootPath = `${__PATH_PREFIX__}/`
  let description
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
    const div = document.querySelector(".header-navigation-image__text")
    const h1 = document.querySelector(".header-navigation-image__description")
    div.classList.add("header-navigation-image__text--hover")
    if (h1 !== null) {
      h1.classList.add("header-navigation-image__description--hover")
    }
  }

  const handleMenuOnLeave = () => {
    setText("")
    const div = document.querySelector(".header-navigation-image__text")
    const h1 = document.querySelector(".header-navigation-image__description")
    div.classList.remove("header-navigation-image__text--hover")
    if (h1 !== null) {
      h1.classList.remove("header-navigation-image__description--hover")
    }
  }

  function handleMenuClick(e) {
    const value = e.target.getAttribute("value")
    parentCallback(value)
  }

  if (location.pathname === rootPath) {
    if (page) {
      description = (
        <h1 className="header-navigation-image__description">{page}</h1>
      )
    } else {
      description = (
        <h1 className="header-navigation-image__description">Strona główna</h1>
      )
    }
  }
  if (location.pathname === "/about/") {
    description = (
      <h1 className="header-navigation-image__description">O mnie</h1>
    )
  }
  if (location.pathname === "/contact/") {
    description = (
      <h1 className="header-navigation-image__description">Napisz do mnie</h1>
    )
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
                onMouseLeave={handleMenuOnLeave}
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
        {description}
        <div className="header-navigation-image__text">
          <span>{text}</span>
        </div>
      </section>
    </div>
  )
}

export default Navigation
