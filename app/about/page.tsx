import React from "react";

const page = () => {
  interface Author {
    name: string;
    pictureUrl: string;
    introduction: string;
    socials: {
      linkedIn: string;
      github: string;
    };
  }

  const authorList: Author[] = [
    {
      name: "Sierra",
      pictureUrl: "https://avatars.githubusercontent.com/u/71465895?v=4",
      introduction: "I am a funny guy",
      socials: {
        linkedIn: "https://www.linkedin.com/in/mateo-sierra-4b70951b7/",
        github: "https://github.com/Sierra9999",
      },
    },
    {
      name: "Luis Alexander",
      introduction: "I am a funny guy",
      pictureUrl: "https://avatars.githubusercontent.com/u/26258524?v=4",
      socials: {
        linkedIn: "https://www.linkedin.com/in/luis-alexander-b83478184/",
        github: "https://github.com/calixfar",
      },
    },
  ];

  const AuthorCard = (author: Author) => {
    return (
      <section className="author-card w-6/12">
        <h2 className="author-card__name">{author.name}</h2>
        <img
          src={author.pictureUrl}
          alt={`${author.name}'s profile picture on github`}
          className="author-card__picture"
        />
        <p className="author-card__introduction">{author.introduction}</p>
        <section className="author-card__socials"></section>
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
      <section className="writers flex mt-10 ">
        <AuthorCard {...authorList[1]} />
        <AuthorCard {...authorList[0]} />
      </section>
    </main>
  );
};

export default page;
