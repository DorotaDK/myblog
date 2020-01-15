import React from "react"
import Layout from "../components/layout"

class About extends React.Component {
  state = {}
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <h1>OMNIETUTAJHEJ</h1>
      </Layout>
    )
  }
}

export default About
export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
