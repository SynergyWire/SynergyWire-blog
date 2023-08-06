import React from 'react'
import Icon from '@/components/icons/Icon'
import './styles.css'

export interface Author {
  name: string
  pictureUrl: string
  introduction: string
  socials: {
    linkedIn?: string
    github?: string
    personalWebsite?: string
  }
}

export const AuthorCard = (author: Author) => {
  const { github, linkedIn } = author.socials

  return (
    <section className="author-card">
      <h2 className="author-card__name">{author.name}</h2>
      <img
        src={author.pictureUrl}
        alt={`${author.name}'s profile picture on github`}
        className="author-card__picture"/>
      <p className="author-card__introduction">{author.introduction}</p>
      <section className="author-card__socials">
        {github ? (
          <a
            className="author-card__socials__anchor"
            target="_blank"
            href={github}>
            <Icon name={"GITHUB"} />
          </a>
        ) : null}
        {linkedIn ? (
          <a
            className="author-card__socials__anchor"
            target="_blank"
            href={linkedIn}>
            <Icon name={"LINKEDIN"} />
          </a>
        ) : null}
      </section>
    </section>
  );
};

export default AuthorCard;
