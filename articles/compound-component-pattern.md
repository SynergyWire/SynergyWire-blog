---
title: "Compound Components In React 101"
subtitle: "Compound Components In React 101"
date: "2023-07-21"
tags: "#React #typescript #designPatterns #fundamentals"
author : "Mateo Sierra"
---

Introduction:
The web has evolved and so  has followed the way we build websites, with the goal of being able to develop bigger and more complex user interfaces, developers started dividing the user interface into small pieces called  components, as a result of this there was a need of ways of creating and  composing components in a predictible way.

React's Compound Component Pattern is a powerful technique that allows developers to build flexible and reusable components by combining smaller pieces together. We'll explore what compound components are, why we use them, the advantages they offer, and we'll walk through a simple example to understand how they work.

Many user interface libraries like Reach UI or Material UI  use this pattern in order to make components reusable and flexible with a clean API, facilitating the usage of it, you can also achieve the same for our own code if we apply the same pattern.

When creating complex UI components, the traditional approach of passing props from parent to child can lead to cluttered and less maintainable code. The Compound Component Pattern addresses this issue by allowing developers to compose components more elegantly, making them easier to understand and use.

Advantages:

Reusability: Compound components promote reusability, enabling developers to create versatile components that can be employed in various parts of an application.

Clean API: By structuring components as compound components, developers can provide a clear and concise API to users, making the component easier to understand and interact with.

Encapsulation: The Compound Component Pattern encourages better encapsulation of component logic, making it easier to manage state and behavior.

Flexibility: Users can customize the behavior and appearance of compound components by passing different props, enhancing the component's flexibility.


Simple Example:
Let's build a basic "Toggle" component using the Compound Component Pattern. The Toggle component will have two states: on and off, and users can customize the display text and styling.

```
    // Toggle.js

import React, { useState } from 'react';

function Toggle({ children }) {
  const [on, setOn] = useState(false);

  const handleToggle = () => setOn((prevOn) => !prevOn);

  return React.Children.map(children, (child) =>
    React.cloneElement(child, {
      on,
      handleToggle,
    })
  );
}

function ToggleOn({ on, children }) {
  return on ? children : null;
}

function ToggleOff({ on, children }) {
  return on ? null : children;
}

function ToggleButton({ on, handleToggle }) {
  return <button onClick={handleToggle}>{on ? 'ON' : 'OFF'}</button>;
}

Toggle.On = ToggleOn;
Toggle.Off = ToggleOff;
Toggle.Button = ToggleButton;

export default Toggle;

```