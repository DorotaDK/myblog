import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

const LatestPosts = () => {
  const data = useStaticQuery(graphql`
    query latestPostsQuery {
      allMarkdownRemark(
        filter: { frontmatter: { title: { ne: "" } } }
        limit: 10
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        nodes {
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  `)
  const posts = data.allMarkdownRemark.nodes
  return (
    <div>
      <ul>
        {posts.map(post => (
          <li>
            <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LatestPosts
