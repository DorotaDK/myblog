import React from "react"
import { Link } from "gatsby"
import Navigation from "../components/navigation"
import { rhythm, scale } from "../utils/typography"

class Layout extends React.Component {
  state = { filteredPost: "" }

  callbackFunction = data => {
    this.setState({ filteredPost: data })
  }

  componentDidMount() {
    if (this.props.location.state !== null) {
      if (this.props.location.state.text)
        this.setState({ filteredPost: this.props.location.state.text })
      else {
        this.setState({ filteredPost: "" })
      }
    }
  }

  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header
    let main

    let filteredPosts = []
    const arr = React.Children.toArray(this.props.children)

    arr.forEach(post => {
      if (
        post.props.value === this.state.filteredPost &&
        this.state.filteredPost !== ""
      ) {
        filteredPosts.push(post)
      }
      if (this.state.filteredPost === "") {
        filteredPosts.push(post)
      }
    })

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      )
      main = <div>{filteredPosts}</div>
    } else {
      header = (
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `red`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      )
      main = <div>{children}</div>
    }

    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header>
          <Navigation parentCallback={this.callbackFunction} />
          {header}
        </header>
        <main>{main}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    )
  }
}

export default Layout
