import React from "react";
import Icon from "@/components/icons/Icon";
import "./styles.css";

const page = () => {
  interface Author {
    name: string;
    pictureUrl: string;
    introduction: string;
    socials: {
      linkedIn?: string;
      github?: string;
      personalWebsite?: string;
    };
  }

  const authorList: Author[] = [
    {
      name: "Mateo Sierra",
      pictureUrl: "https://avatars.githubusercontent.com/u/71465895?v=4",
      introduction: "Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple ",
      socials: {
        linkedIn: "https://www.linkedin.com/in/mateo-sierra-4b70951b7/",
        github: "https://github.com/Sierra9999",
      },
    },
    {
      name: "Luis Alexander",
      introduction: "Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple Apple ",
      pictureUrl: "https://avatars.githubusercontent.com/u/26258524?v=4",
      socials: {
        linkedIn: "https://www.linkedin.com/in/luis-alexander-b83478184/",
        github: "https://github.com/calixfar",
      },
    },
  ];

  const AuthorCard = (author: Author) => {
    const { github, linkedIn } = author.socials;

    return (
      <section className="author-card">
        <h2 className="author-card__name">{author.name}</h2>
        <img
          src={author.pictureUrl}
          alt={`${author.name}'s profile picture on github`}
          className="author-card__picture"
        />
        <p className="author-card__introduction">{author.introduction}</p>
        <section className="author-card__socials">
          {github ? (
            <a
              className="author-card__socials__anchor"
              target="_blank"
              href={github}
            >
              <Icon name={"GITHUB"}></Icon>
            </a>
          ) : null}
          {linkedIn ? (
            <a
              className="author-card__socials__anchor"
              target="_blank"
              href={linkedIn}
            >
              <Icon name={"LINKEDIN"}></Icon>
            </a>
          ) : null}
        </section>
      </section>
    );
  };

  return (
    <main  >
      <p className="about-paragraph">
        At SynergyWire, we're on an enchanting journey through the world of
        software development, we enjoy growing in knowledge, sharing and helping
        other developers in their daunting chase for guidance in this colosal,
        fluctuating and unpredictible industry.
      </p>
      <p className="about-paragraph">
        Wether you are a beginner or you had several experiences in the art of
        software development, we believe constant growth in knowledge and skills
        is a must to stay relevant in this realm, a software developer who is not exploring new tools and honing the ones already at disposition will eventually start experiencing undesired consequences 
      </p>
      <h2 className="about-authors" >About the authors</h2>
      <section className="writers">
        <AuthorCard {...authorList[1]} />
        <AuthorCard {...authorList[0]} />
      </section>
    </main>
  );
};

export default page;
