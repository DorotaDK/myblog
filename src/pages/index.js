import React from "react"
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import "../style/index.scss"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        {posts.map(({ node }) => {
          if (node.frontmatter.title) {
            const title = node.frontmatter.title || node.fields.slug
            const image = node.frontmatter.image.childImageSharp.fluid
            return (
              <article
                key={node.fields.slug}
                value={node.frontmatter.tag}
                className="main-article"
              >
                <Link to={node.fields.slug} className="main-article__container">
                  <header className="main-article__header">
                    <Image fluid={image} className="main-article__image" />
                  </header>
                  <section className="main-article__text">
                    <h3 className="main-article__text-title">{title}</h3>
                    <p
                      className="main-article__text-description"
                      dangerouslySetInnerHTML={{
                        __html: node.frontmatter.description || node.excerpt,
                      }}
                    />
                    <small className="main-article__text-date">
                      {node.frontmatter.date}
                    </small>
                  </section>
                </Link>
              </article>
            )
          }
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tag
            image {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
