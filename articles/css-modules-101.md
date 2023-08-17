---
title: "CSS Modules 101: Beyond Traditional CSS"
subtitle: "CSS Modules 101: Beyond Traditional CSS"
date: "2023-08-16"
tags: "#CSS #Styling #React"
author : "Mateo Sierra"
---

![preview.jpg](/images/articles/css-modules-101/preview.jpg)

CSS is a tool that has defined the web as we know it. We simply couldn't create the web as it is without it. Thanks to CSS, nowadays we can change the appearance of elements, apply color theory to create unique brands, implement responsiveness to engage as many users as possible with our app, and infuse life and energy through effects like hover and animations. If you're clever enough, you can even alter the way the UI functions!

In this article, we will explore a method of writing CSS that has revolutionized how our applications scale and enables us to develop more modular components, all without sacrificing the remarkable attributes of traditional CSS. Enter CSS Modules: we'll delve into how they function, why they offer significant advantages, and how to integrate them into a React-based application. 

## What Is the Difference Between CSS Modules And Traditional CSS?

If you've ever worked on a React application created with popular starter templates like Create React App (CRA), Gatsby's starter, or Next's starter, you might have come across one of those `styles.module.css` files. You might have clicked on it to check its contents, only to discover that there isn't much difference between this `.module.css` file or any regular `.css` file. These are the files of CSS Modules, and that's how you're supposed to name them: you begin with the filename and add the `.module` extension before the `.css` extension.

Inside the CSS file, the way we write CSS doesn't change at all. However, when we try to use the styles it contains, we will need to make a few adjustments. Primarily, we no longer import our file using this approach:
```tsx 
  import 'styles.module.css'
```
Instead what we do is importing it as an object
```tsx
  import styles from 'styles.module.css'
```
Now, when we use traditional CSS in our React App, we would normally import the CSS file just like the first method I showed. Then, you will apply classes to the tags, and everything will work just fine. In modular CSS, what we do is completely different. Take a look at this component: 

```tsx
import React from 'react';
import styles from './Button.module.css';

const Button = ({ children }) => {
  return (
    <button className={styles.button}>
      {children}
    </button>
  );
};

export default Button;
```

What I want you to pay attention to in this simple component is the way we are applying our class names. Instead of using a string inside the button's className, we are using the properties inside the object we bring from our CSS file to act as aliases.

if this doesn't make much sense, you just have to know that the properties this object has, represent a selector we wrote inside our CSS file, so if we are using a `styles.button` property for our className it means that inside our `styles.module.css` file there is a selector like this: 

```css
.button {
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.button:hover {
  background-color: #2980b9;
}
```

Normally, you would prefer changing your folder structure, so each component is stored in a folder with the component's name.
Inside it, we create our component as index.tsx. This is because CSS Modules work in a scoped way, so the file using the styles and the styles file are mutually coupled and work as a unit. Here's an example:

![card-component.jpeg](/images/articles/css-modules-101/folder-stucture.png)

And that is pretty much it for how to write CSS Modules. But why would we do something like this in the first place? Are we going through all the trouble of changing the way we write our code just to achieve what exactly? The main reason is that CSS Modules allow your CSS selectors to be repeated throughout the application without any collisions. As a result, you can develop extensive projects while remaining unconcerned about name collisions with other components. Additionally, this can lead to simpler CSS selector names. Let's review the advantages in detail.

## Why You Would Want To Use CSS Modules

**Scoped Styles:** One of the biggest advantages of CSS Modules is that it provides scope isolation for styles. This means each CSS Module works only in the file it is imported to and generates a unique class name for each selector, ensuring that styles only apply to specific components. This helps prevent unintended style conflicts and makes it easier to manage and maintain styles in larger projects.

**No Global Namespace Pollution:** Traditional CSS files operate in a global namespace, which can lead to naming conflicts and unintended style overrides. CSS Modules encapsulate styles within a component's scope, reducing the chances of naming collisions and making it easier to reason about your code.

**Readable and Maintainable:** CSS Modules encourage a more modular and component-centric approach to styling. Styles are co-located with the components they affect, making it easier to understand the relationships between styles and components. This can lead to more maintainable and readable code.

**Explicit Dependencies:** With CSS Modules, the dependencies between components and styles are explicit. You import styles as you would import any other JavaScript module, making it clear which styles are used by which components.

**Dead Code Elimination:** Many build tools and bundlers can perform dead code elimination, removing unused styles from your final production build. This helps reduce the size of your CSS and improve performance.

## Using BEM With CSS Modules
BEM becomes a little unnecessary if you are using CSS Modules. Due to the scoping effect they provide, you can choose short names for your classes, and they won't collide with classes from other components. However, if you still insist on using BEM, you can implement it; although, you would need to make some adjustments.

Due to object property naming rules in JavaScript, you are limited in the way you name your CSS module classes. For example, you can write a class like `buton-border` in your CSS files. However, the moment you decide to use the imported object in your JSX/TSX file, you will encounter an error. This is because you are not allowed to use `-` in the names of your object properties. You are allowed to use underscores, though, just like `card__title` . But if you start using more complex BEM, such as `card__user-thumbnail` you will begin to face complications. One approach you can take is keeping your BEM names simple, or you can use square brackets notation.

```tsx
import React from 'react';
import styles from './Card.module.css';

const Card = ({ title, content }) => {
  return (
    <div className={styles.card}> 
      <h2 className={styles.card-title}>{title}</h2> // this will throw an error
      <img className={styles.card__picture} src="..."> // this is okay
      <p className={styles.["card__product-desciption"]}> {content}</p> // this is okay
    </div>
  );
};

export default Card;
```

Take into account, even though using square bracket notation solves this problem it will make your code quite verbose.

## Conclusions 

CSS Modules offer a powerful and modern approach to managing styles in web development. By encapsulating styles within component scopes, CSS Modules address many of the challenges associated with traditional global CSS files. This encapsulation leads to improved modularity, reusability, and maintainability of codebases, particularly in large and complex projects.

With CSS Modules, developers can create self-contained components with minimal risk of style conflicts or unintended overrides. The unique class names generated by CSS Modules ensure that styles are scoped to specific components, enhancing clarity and reducing the potential for naming collisions.

I encourage you to start implementing them if you haven't, or give them a chance if you happen to use global CSS, it will definitely improve your coding experience.

Happy Coding!

![card-component.jpeg](/images/articles/css-modules-101/coding-pepe.gif)

