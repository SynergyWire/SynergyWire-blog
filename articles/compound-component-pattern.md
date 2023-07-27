---
title: "Compound Components In React 101"
subtitle: "Compound Components In React 101"
date: "2023-07-21"
tags: "#React #typescript #designPatterns #fundamentals"
author : "Mateo Sierra"
---

The web has evolved and the way we build websites has followed , with the goal of being able to develop bigger and more complex user interfaces(UI), developers started dividing the user interface into smaller fragments called  components, as a result of this there was a need of ways of creating and  composing components in a predictible way.

React's Compound Component Pattern is a powerful technique which allows developers to build flexible and reusable components by combining fragments of UI together. We'll explore what compound components are, why we use them, the advantages they offer, and we'll walk through a simple example which will teach you how to write them and take advantage of this pattern.

## Bringing order to chaos: why use compound components?

It's incredibly easy to write messy code, you start without any kind of structure in mind and you will end up your coding session with working features but, the next day adding new features to your code will feel more and more difficult, and the following days it will only get worse.

Compound components will bring some order to your code, this will ensure your code stays managable. allowing you to fix bugs, add feautures and even refactor it without much struggle on the long run, let's review the advantages

**Reusability:** Compound components promote reusability, enabling the creation of versatile components that can be employed in various parts of an application.

**Clean and encapsulated API:** By structuring components as compound components, you can abstrac the functionality of it behind a clean and concise API to users ,  making the component easier to understand and interact with.

**Flexibility:** Depending on the design of the component, users can customize the behavior and appearance of compound components by passing different props, enhancing the component's flexibility and encouraging users to reuse it more often.


## Making a compound component

Imagine you are developing a card component for an E-commerce website, this component will have a title, a description and a price, just like in this picture : 

![card-component.jpeg](/images/articles/compound-component-pattern/card-component.jpeg)

Most likely you will come up with a component just like this one:

``` ts
import React from "react";

interface CardProps {
  title: string
  photo: string
  description: string
  price: number
}

const Card: React.FC<CardProps> = ({
  title,
  photo,
  description,
  price,
}) => {
  return (
    <div className="card">
      <h1 className="card__title">{title}</h1>
      <img className="card__photo" src={photo} alt="" />
      <p className="card__description">{description}</p>
      <span className="card__price">{price}</span>
      <span className="card__add-to-cart">
        {" "}
        add to cart {"Imagine a card icon ..."}{" "}
      </span>
    </div>
  );
};

export default Card
```

But then you look at the website's design and there is more than one type of card, you also have a card without a description : 

![card-component-simple.jpeg](/images/articles/compound-component-pattern/card-component-simple-60.jpeg)

Most of the time developers would add more complexity to their current component, making it more bloated than neccesary, like adding conditional rendering on the paragraph holding the description and also another conditional which will change the classes and apply a different css depending if the description argument was passed or not, or even WORSE there is the option of creating two distinct components for this two designs (one with the description, another one without it), this can easily be avoided if you create a compound component.

```ts 

.//example of a compound card component

```


## Conclusions 

Several user interface libraries like Reach UI or Material UI  patterns in order to make components reusable and flexible and on top of that with a clean API which facilitating the usage of them, you can also achieve the same for our own code if we apply the same pattern.
