import React from 'react'
import Icon from '@/components/icons/Icon'
import './styles.css'
import Link from 'next/link'
import Image from 'next/image'
import { Author } from '@/interfaces/Author'

export const AuthorCard = (author: Author) => {
  const { github, linkedIn } = author.socials

  return (
    <section className="author-card">
      <h2 className="author-card__name">{author.name}</h2>
      <Image
      width={200}
      height={200}
        src={author.pictureUrl}
        alt={`${author.name}'s profile picture on github`}
        className="author-card__picture"/>
      <p className="author-card__introduction">{author.introduction}</p>
      <section className="author-card__socials">
        {github ? (
          <Link
            className="author-card__socials__anchor"
            target="_blank"
            href={github}>
            <Icon name={"GITHUB"} />
          </Link>
        ) : null}
        {linkedIn ? (
          <Link
            className="author-card__socials__anchor"
            target="_blank"
            href={linkedIn}>
            <Icon name={"LINKEDIN"} />
          </Link>
        ) : null}
      </section>
    </section>
  );
};

export default AuthorCard;
