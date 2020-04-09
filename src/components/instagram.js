import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faComment } from "@fortawesome/free-regular-svg-icons"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
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
  const instagramAdress =
    "https://www.instagram.com/" + data.instagramContent.user.username
  return (
    <div className="container-instagram">
      <div className="container-instagram-right"></div>
      <h2 className="title-instagram">Instagram</h2>
      <a href={instagramAdress} className="instagram-link">
        <img
          src={data.instagramContent.user.profile_picture}
          alt="instagram profile photo"
          className="instagram-link-image"
        />
        <p className="instagram-link-name">
          {data.instagramContent.user.full_name}
        </p>
        <p className="instagram-link-username">
          {data.instagramContent.user.username}
        </p>
      </a>

      <div className="instagram">
        {images.map((image, i) => (
          <a className="instagram-element" href={image.node.link} key={i}>
            <Image
              fluid={image.node.localImage.childImageSharp.fluid}
              className="instagram-element-image"
            />
            <div className="instagram-element-likes">
              {image.node.likes.count}
              <FontAwesomeIcon
                icon={faHeart}
                className="instagram-element-likes-icon"
              />
            </div>
            <div className="instagram-element-comments">
              {image.node.comments.count}
              <FontAwesomeIcon
                icon={faComment}
                className="instagram-element-comments-icon"
              />
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default Instagram
