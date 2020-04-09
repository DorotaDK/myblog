import React from "react"
import { Link } from "gatsby"
import Navigation from "../components/navigation"
import "../style/main.scss"
import Instagram from "../components/instagram"
import algoliasearch from "algoliasearch/lite"
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom"
import CustomHits from "../utils/customHits"

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
    const page = this.state.filteredPost
    const searchClient = algoliasearch(
      "TG90VSMWJB",
      "573b8f87a9e7c38622f1f9110048751c"
    )
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
        <h1>
          <Link to={`/`}>{title}</Link>
        </h1>
      )
      main = <div className="main">{filteredPosts}</div>
    } else {
      header = (
        <h3>
          <Link to={`/`}>{title}</Link>
        </h3>
      )
      main = <div className="main">{children}</div>
    }

    return (
      <div>
        <header>
          <Navigation
            parentCallback={this.callbackFunction}
            page={page}
            location={location}
          />
          {header}
        </header>
        <main>
          {main}
          <Instagram />
          <InstantSearch searchClient={searchClient} indexName="nicniezwyklego">
            <SearchBox />
            <Hits hitComponent={CustomHits} />
          </InstantSearch>
        </main>
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
