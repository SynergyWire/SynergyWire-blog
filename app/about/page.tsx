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
      introduction: "I am a 🤡",
      socials: {
        linkedIn: "https://www.linkedin.com/in/mateo-sierra-4b70951b7/",
        github: "https://github.com/Sierra9999",
      },
    },
    {
      name: "Luis Alexander",
      introduction: "I am a 🤡",
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
      <section className="author-card w-5/12">
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
    <main>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec justo
        vel risus fringilla finibus vitae nec sapien. Etiam non mi sapien. Nulla
        facilisi. Proin ac rhoncus massa. Quisque fringilla sem ac ligula
        maximus, eu commodo sapien efficitur. Nam non tortor quis metus
        venenatis tincidunt. Ut maximus, purus id fermentum tincidunt, neque
        libero convallis urna, sit amet lacinia odio nunc a risus. Sed blandit
        metus quis quam ultrices, vitae dapibus tellus consequat. Nullam vel
        convallis elit, vitae finibus enim. Nullam eget leo eget purus pharetra
        scelerisque. Sed at risus in dolor faucibus viverra a et odio.
      </p>
      <section className="writers">
        <AuthorCard {...authorList[1]} />
        <AuthorCard {...authorList[0]} />
      </section>
    </main>
  );
};

export default page;
