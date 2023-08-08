import React from 'react'
import { AuthorCard } from '../../components/AuthorCard'
import { Author } from '@/interfaces/Author'
import './styles.css'

const page = () => {
  const authorList: Author[] = [
    {
      name: "Mateo Sierra",
      pictureUrl: "https://avatars.githubusercontent.com/u/71465895?v=4",
      introduction:
        "Experienced frontend dev & aspiring digital illustrator. Crafting captivating and user-centric web experiences with clean code & artistic flair.",
      socials: {
        linkedIn: "https://www.linkedin.com/in/mateo-sierra-4b70951b7/",
        github: "https://github.com/Sierra9999",
      },
    },
    {
      name: "Luis Santiago",
      introduction:
        "Experienced system engineer specialized in development, adept at leading projects, analyzing challenges, and delivering exceptional results. Passionate problem-solver.",
      pictureUrl: "https://avatars.githubusercontent.com/u/26258524?v=4",
      socials: {
        linkedIn: "https://www.linkedin.com/in/luis-alexander-b83478184/",
        github: "https://github.com/calixfar",
      }
    }
  ]

  return (
    <>
      <p className="about-paragraph">
        At SynergyWire, we're on an enchanting journey through the world of
        software development, we enjoy growing in knowledge in order to share
        and help other developers in their daunting chase for guidance in this
        colossal, fluctuating and unpredictable industry.
      </p>
      <p className="about-paragraph">
        Whether you are a beginner or you had several experiences in the art of
        software development, we believe in constant growth in knowledge and
        skills is a must to stay relevant in this realm, software developers who
        are not exploring new tools and honing the ones already at their
        disposition will eventually start experiencing undesired consequences
      </p>
      <h2 className="about-authors">About the authors</h2>
      <section className="writers">
        <AuthorCard {...authorList[1]} />
        <AuthorCard {...authorList[0]} />
      </section>
    </>
  )
}

export default page
