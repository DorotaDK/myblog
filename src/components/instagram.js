import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import "../style/instagram.scss"

const Instagram = () => {
  const data = useStaticQuery(graphql`
    query InstagramPosts {
      allInstagramContent(limit: 9) {
        edges {
          node {
            link
            localImage {
              childImageSharp {
                fluid(maxHeight: 500, maxWidth: 500, quality: 50) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
            images {
              standard_resolution {
                url
              }
            }
            likes {
              count
            }
            comments {
              count
            }
          }
        }
      }
      instagramContent {
        user {
          full_name
          profile_picture
          username
        }
      }
    }
  `)
  const images = data.allInstagramContent.edges
  return (
    <div className="container-instagram">
      <h2 className="title-instagram">Instagram</h2>
      <img
        src={data.instagramContent.user.profile_picture}
        alt="instagram profile photo"
      />
      <p>{data.instagramContent.user.full_name}</p>
      <p>{data.instagramContent.user.username}</p>

      <div className="instagram">
        {images.map((image, i) => (
          <a className="instagram-element" href={image.node.link} key={i}>
            <Image
              fluid={image.node.localImage.childImageSharp.fluid}
              className="instagram-element-image"
            />
            <div className="instagram-element-likes">
              {image.node.likes.count}
              <i class="fas fa-heart"></i>
            </div>
            <div className="instagram-element-comments">
              {image.node.comments.count}
              <i class="far fa-comment"></i>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default Instagram
