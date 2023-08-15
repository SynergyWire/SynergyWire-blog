---
title: "CSS Modules 101: Beyond Traditional CSS"
subtitle: "CSS Modules 101: Beyond Traditional CSS"
date: "2023-08-14"
tags: "#CSS #Styling #React "
author : "Mateo Sierra"
---

CSS is a tool that has defined the web as we know it, we simply couldn't create the web as it is without it, thanks to css nowdays we can change the way an element looks like, we can apply color theory to it and make our brand unique, apply responsiveness in order to get as many users as possible to be able to interact with out app, give life and energy to it with effects like hover and animations, if you are clever enough you can even change the way the UI works!. 

In this article we will review one of the ways of writing CSS that has changed the way our application scales and lets us create more modular components without giving away any of the marvelous properties of traditional CSS; these are CSS Modules, the way they work, why they are so great and how to start using them in a React based application. 

## What Is the Difference Between CSS Modules And Traditional CSS?

If you ever worked on a React application made with popular starter templates like Create React App (CRA), Gatsby's starter or Next's starter, you might have come across one of those `styles.module.css`, you might have clicked on it to check it's contents just to see there isn't much difference between this `.module.css` file, or even any at all, these are the files of CSS modules and that is how you are supposed to name them, you start by the name of the file and add the .module extension before the .css extension.

Inside the CSS file the way we write css doesn't change at all, but when we try to use the styles it holds we will have to make a few changes; mainly we no longer import our file this way
```tsx 
  import 'styles.module.css'
```
Instead what we do is importing it as an object
```tsx
  import styles from 'styles.module.css'
```
now, when we use traditional css in our React App normally we would be importing the css file just like the first way I showed and then you will be applying classes to the tags and everything would work just fine, in modular css what we do is completely different, take a look at this component: 

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

What I want you to pay attention to in this simple component is the way we are applying our class names, instead of using a string inside of the button's className, we are using the properties inside the object we are bringing from our CSS file to act as an alias.

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

and that is pretty much it for how to write CSS modules, but why would we do something like this in the first place? what advantages does it oppose to using traditional CSS? 

## advantages 
## using bem with css modules
## it's interaction with bundlers