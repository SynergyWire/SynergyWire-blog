---
title: "VTEX IO SSR principles"
subtitle: "Know everything to master how to work with SSR as properly."
date: "2023-05-15"
tags: "#VTEX #SSR #typescript #react"
---

It is common to get stuck dealing with concepts such as server sider endering (SSR) or client side rendering (CSR). It is known as true these topics might be a huge headache if you do not how to deal with them.

VTEX IO has a special approach when developing a store comes to the talk. If you have ever developed a VTEX IO store you must have found several erros about public and private queries, reference erros and other ones. It is time to throw those erros away and take the control what you are developing of.

## What is SSR and CSR

Well, These concepts became popular since frameworks and liberies such as angular, vue and react showed up as a revolutionary ways to build a site. They brought a CSR flow where the view or interface is built in the client side, that means when JavaScript can be executed. JS has the big responsiblity of requesting content, mounting interfaces, staying pending of changes and refresh the site. 

![Client Side Rendering](https://s3.amazonaws.com/scribblelive-com-prod/wp-content/uploads/sites/4/2020/10/CSR.png)

On the other hand SSR came up as a way to take the most advantange of these revolutionary frameworks without losing the power of server processing like older sites work on PHP. SSR allows us to make the requests and even mount the first site's view to be sent as a HTML file to the client, this is a profitable characteristic in terms of processing and performance.

![Server Side Rendering](https://s3.amazonaws.com/scribblelive-com-prod/wp-content/uploads/sites/4/2020/10/SSR.png)

## VTEX IO SSR principles

If we go to [store theme site](https://storetheme.vtex.com/) and we disable javascript and refresh (as the image below).  

![Disabling JS](https://www.howtogeek.com/wp-content/uploads/2020/03/disable-javascript-command.png?trim=1,1&bg-color=000&pad=1,1)

we will see there are still some shown components.

![storetheme-blocked-js.png](/images/articles/vtex-ssr-principles/storetheme-blocked-js.png)

Of course any interaction like going to next slide no longer work because javascript is blocked but there is shown content to the users and this has important benefits to the site such as a better seo or improving the performance metrics.


Let's research together how a custom component behaves in SSR.

Two little points before start:

- We will start taking in mind that you have experience working on VTEX IO so you are able to select an account, create a workspace and link changes in little words you have everything you need to work on VTEX IO custom apps. If you do not know there is nothing to worry about you can follow this [official guide](https://developers.vtex.com/docs/guides/vtex-io-documentation-2-basic-development-setup-in-vtex-io) 

- We will work using the [app store theme](https://github.com/vtex-apps/app-store-theme) so just go and clone the repository. This one has components or files that we are not going to use so you can delete them if you want we just need a functional and operational environment. Do not forget change the vendor value in the manifest file for the account you are logged in.

### Researching about SSR on VTEX IO

Once you have your code linked let's create a custom component named **ServerContent**.

First step create the custom block, remember put the file in the react folder root:

![initial-server-content](/images/articles/vtex-ssr-principles/initial-server-content.png)

Let's create an interface for this component (This allows the component to be exported and used as VTEX IO block). Remember the component's value has to be exact the file's name.

![interface-server-content](/images/articles/vtex-ssr-principles/interface-server-content.png)

As a final step we should include the component block as a home's children.

![block-server-content](/images/articles/vtex-ssr-principles/block-server-content.png)

Since now on let's desactive javascript to emulate a server rendering. What is the outcome we got?

![server-content-shown](/images/articles/vtex-ssr-principles/server-content-default-disabled-js.png)

This means a base component is SSR friendly by default. What happens if we add some logic like trying to render a static array?

![server-content-rendered-array-code](/images/articles/vtex-ssr-principles/server-content-rendered-array-code.png)

![server-content-rendered-array](/images/articles/vtex-ssr-principles/server-content-rendered-array.png)

Let's get some data from localStorage and printing it on the screen (you might experience problems with window interface please follow this [documentation](https://bobbyhadz.com/blog/typescript-cannot-find-name-window-document)).


![server-content-storage-code](/images/articles/vtex-ssr-principles/server-content-storage-code.png)

Result:

![server-content-storage-error](/images/articles/vtex-ssr-principles/server-content-storage-error.png)

Even if we enable js for a while we will see a reference error.  Getting around a solution this code needs to be wrapped on a useEffect.

![server-content-storage-effect-code](/images/articles/vtex-ssr-principles/server-content-storage-effect-code.png)

It works! but why is there nothing shown?

Well, useEffect hook is only executed on the client side so the sever does not realice about the code within useEffect. These are the kind of things we should worry about while we are working with SSR.

If we want our component to be rendered from the server we do not use anything about window object like storage (local, session, cookies), fetch request, document and other related browser's things if we do not keep in mind this advice we will get a reference error.

Let's get back to our inline local storage (without using useEffect) but let's make a little change:

![server-content-client-interface](/images/articles/vtex-ssr-principles/server-content-client-interface.png)

This is happening on the site:

![server-content-client-interface-site](/images/articles/vtex-ssr-principles/server-content-client-interface-site.png)

The **render** property on the interfaces file might have two possible values:

**server:** Every component with this value will be rendered from the server. By the way this is the default value of this property.

**client:** Every component with this value will be rendered from the browser so any server restriction will not apply.

That is the reason our componet is not shown, VTEX omits every component marked as client while is rendering from the server. Said that you should be careful on choosing which property is way better for your purpose.

It's time to try other common cases like requesting content from an API or graphql service.

As I told you we can not make a fetch requests on the SSR unless we wrapped the request within a useEffect but it is not going to make any action. 

There is a way to make requests without breaking the SSR rules and we can achive it using graphql.

Let's get the store's brands. We should start listing the **"vtex.store-graphql": "2.x"** in the manifets' dependencies array and do not forget change back the render property of our component to **server**.

We have to create the graphql file:

![brands-query](/images/articles/vtex-ssr-principles/brands-query.png)

After that we can write our logic:

![brands-code](/images/articles/vtex-ssr-principles/brands-code.png)

This gives us as a outcome:

![brands-outcome](/images/articles/vtex-ssr-principles/brands-outcome.png).

As can be seen the request is being handled and processed. It is important to say we are not going to see the loading message because this is processed on the server so the client does not notice these intermediate steps. 

Can we do any request using this pattern? Let's see executing the orderform query.

You can get as much data as you want from the query but I am just needing these ones listed on the OrderForm interface.

![orderform-code](/images/articles/vtex-ssr-principles/orderform-code.png)

It is time to see the result:

![orderform-error](/images/articles/vtex-ssr-principles/server-content-storage-error.png)

A meme says more than 1000 words.

![meme-confuse-guy](/images/memes/confused-guy.jpg)

Why are we gettting this error? Do we have an error in the code? Why could we execute the brand query but this one is not working?

Take it easy, VTEX has something to tell us:

Some queries are not allowed to be executed from the server. Fine, we got it but which one is allowed and which one not? 

The easiest way to notice is going to their repository and looking for the schema in this case [store graphql schema](https://github.com/vtex-apps/store-graphql/blob/master/graphql/schema.graphql).

We have to look for each query's name like this:

![store-graphql-schema](/images/articles/vtex-ssr-principles/store-graphql-schema.png)

As you can see both queries have different scope's value and that is the anwser, while brands' scope has a value of **PUBLIC**, orderform' scope is **PRIVATE**. It means every query on a public scope can be executed from the server without any problem.

Another approach might be changing the render property value for **client** or using [useLazyQuery](https://github.com/vtex-apps/react-app-template/blob/9f5beb0c2cb460a0100367f0e11128a349154a5c/react/components/Accesory.tsx#L4) instead of useQuery and triggering the request from an useEffect as we did on localStorage example.

There is also an hybrid concept where it is not necessary to define the block component to be rendered from the client but the query will not be executed. I would rather call this way as neutral case for that reason.

We just need to assign the query's property **ssr** as false.

![ssr-false](/images/articles/vtex-ssr-principles/ssr-false.png)

You might be wondering how will the result look like? If you followed and maded the steps I told you above you will see something like this:

![ssr-false](/images/articles/vtex-ssr-principles/ssr-false-outcome.png)

If we said the server does not go through intermadiate steps why are we getting this result? VTEX notices at the moment of rendering our component has a query but it should not be executed from the server so it takes the default state of the query's request giving as a result loading true.

We have been going through multiples scenarios evaluating key concepts, it is time to make a whole example to cover all the topics.

Our goal is to make a request to a custom API on SSR paradigm and then render the results. 

We will start cloning the [graphql example repository](https://github.com/vtex-apps/graphql-example) to build our own graphql service if you are not familiar with services on VTEX IO please check out this [guide](https://learn.vtex.com/docs/course-service-course-step01services-lang-en).

After cloning the repository we should add a new **outbound-access** (in little words an outbound access is an API our service is allowed to connect if you do not define so any request will fail). I left the same vendor and name but you can change them by your preferred store.

> **_NOTE:_**  You can find the whole example on [this repository](https://github.com/calixfar/VTEXIO-SSR-GUIDE)

![service manifest](/images/articles/vtex-ssr-principles/service-manifest.png)

As a second step we have to create a client so let's create a new file within clients folder.

![service pokemon client](/images/articles/vtex-ssr-principles/service-pokemon-client.png)

We should include this new client within general Clients class.

![service clients](/images/articles/vtex-ssr-principles/service-clients.png)

Done that it is time to create the resolver (the pokemons data comes within the results property).

![service resolver](/images/articles/vtex-ssr-principles/service-resolver.png)

There are pending few steps, the first one is to include our resolver as a query in the index file.

![service node index file](/images/articles/vtex-ssr-principles/service-node-index.png)

And the last step from the service side is to create the schema. Do not forget to define the value of query' scope as **PUBLIC** (Remember this allows the query to be requestable by the server).

![service schema](/images/articles/vtex-ssr-principles/service-schema.png)

If we go to the store's graphql IDE (going to our workspace + /admin/graphql-ide) and run the query it should work as expected.

![service graphql IDE](/images/articles/vtex-ssr-principles/service-graphql-ide.png)

We have everything we need from the service, let's make the connection with the frontend.

We need to declare the service as a dependency of our custom react app and then we should create the query file (we can reuse the same query as we did on graphql IDE). Do no forget to mark the block to be rendered from the server

![custom app manifest and query](/images/articles/vtex-ssr-principles/custom-app-manifest-and-query.png)

Let's also reuse the compontent ServerContent to list the pokemons.

![pokemon react code](/images/articles/vtex-ssr-principles/custom-app-code.png)

As might be seen we are even assigning custom classes to our HTML so when this comes to the browser the styles will be added.

![pokemon result on SSR](/images/articles/vtex-ssr-principles/custom-app-result.png)

This has been a richful and enjoyable experience researching the most information we might get from VTEX IO server side render paradigm. 

This is just a short but concise guide, it is up to you pushing this concepts further and becoming a SSR expert. I would like to end giving to you the next list.

### The five commandents:

- Do not use any browser' stuff if you are trying to render from the server.
- If you want to use a useEffect hook, you will have to wait until the content comes to the client.
- If a graphql service might be executed from the server, it needs to be declared with a **PUBLIC SCOPE**.
- Do not lie declaring component blocks to be rendered from the server if they are not prepared for (VTEX knows the truth and it will server an error).
- The best way to design a server side rendering flow is always thinking tbe delivered content as a picture because it will be a static HTML with some applied CSS.





