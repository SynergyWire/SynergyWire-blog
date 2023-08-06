---
title: "Avoiding uncaught errors using ErrorHandling pattern"
subtitle: "Using ErrorBounday as a patter to avoid uncaught errors""
date: "2023-04-20"
tags: "#react #typescript #errorHandling"
author: "Luis Santiago"
---

Every software tends to have a lot of errors in its development step, they are around us, they are part of our environment, it is a known thruth by the way. What might differentiate a good software from a bad one is the way errors are treated.

Every programming language offers many ways to deal with errors, the most common one is using try/catch block. Let's see an example:

Imagine we are trying to use a function from a third party library to make a request and get some product data (We will build the function locally to have everything under control). 

```ts
interface ProductData {
  productName: string
  productReference: string
  price: number
}

const products: Record<string, ProductData> = {
  '1': {
    productName: 'xxxx',
    productReference: '1-xxxx',
    price: 0
  },
  '2': {
    productName: 'xxxx',
    productReference: '2-xxxx',
    price: 0
  }
}

async function makeRequest(productId: string): Promise<ProductData> {
  const product = products[productId]

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (product) {
        resolve(product)
      } else {
        reject(new Error('It was not product found'))
      }
    }, 500)
  })
}
```

As might be seen this function is returning a promise which activates a setTimeout and this one evals if there is a product corresponding to the productId passed as prop in the products record, thus it resolves the promise with a static product data, on the other hand the promise gets rejected with a custom message.

Well, we could bring this to react's world with a practical example as follows:

```tsx
function ProductInfo ({ product }: {product: ProductData}) {
  return (
    <div>
      <p>Name: {product.productName}</p>
      <p>Reference: {product.productReference}</p>
      <p>Price: {product.price}</p>
    </div>
  )
}

function App() {
  const [productId, setProductId] = useState('')
  const [productData, setProductData] = React.useState<ProductData | null>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleSearch = () => {
    setProductId(inputRef.current?.value ?? '')
  }

  React.useEffect(() => {
    if (!productId) {
      return
    }

    makeRequest(productId).then((data) => setProductData(data))
  }, [productId])

  return (
    <div>
      <div>
        <input type="text" ref={inputRef} />
        <button onClick={handleSearch}>Search</button>
      </div>
      {productData ? (
        <ProductInfo product={productData} />
      ) : (
        <p>Type a product ID</p>
      )}
    </div>
  )
}
```

We have a product search with an input and a submit button working with the next flow. 
- The search is done only when the search button gets pressed. 
- Then the input's value is assigned to the productId state taking its value directly from the assigned ref (Yes, this is a way to take the HTML elements' value without keeping a state for it). 
- The makeRequest function is executed receiving the productId as prop.
- makeRequest returns something (The internal behavior can be seen in the section above when we built this function).


The result looks like this:

![product-search-happy-path.gif](/images/articles/react-error-handling/product-search-happy-path.gif)

Awesome, we are done and searching is working as expected. Thank you for getting here. See you in the next article.

![wait-a-minute.jpg](/images/memes/wait-a-minute.jpg)

Yes. you are right, what if we passed a productId that does not exist on the products record.

![product-search-uncaught-error.gif](/images/articles/react-error-handling/product-search-uncaught-error.gif)

We can add a catch method on the promise execution and have two new states to record the error message and the status.

```tsx
function App() {
  const [productId, setProductId] = useState('')
  const [productData, setProductData] = React.useState<ProductData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState('idle')
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleSearch = () => {
    setProductId(inputRef.current?.value ?? '')
  }

  React.useEffect(() => {
    if (!productId) {
      return
    }

    setStatus('pending')
    makeRequest(productId)
      .then((data) => {
        setProductData(data)
        setStatus('resolved')
      })
      .catch((error: Error) => {
        setError(error.message)
        setStatus('rejected')
      })
  }, [productId])

  const renderContent = () => {
    console.log({error, status, productData})
    switch (status) {
      case 'pending':
        return (
          <p>Loading</p>
        )
      case 'resolved':
        return (
          <ProductInfo product={productData!} />
        )
      case 'rejected':
        return (
          <div>{error}</div>
        )
      default:
        return (
          <p>Type a product ID</p>
        )
    }
  }

  return (
    <div>
      <div>
        <input type="text" ref={inputRef} />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        {renderContent()}
      </div>
    </div>
  )
}
```

![product-search-whole-flow.gif](/images/articles/react-error-handling/product-search-whole-flow.gif)


It works on a way better organized :). 

Getting to the point of this whole post what if the backend team makes some release on the API and some productReference's value is no longer being returned (if you are a backend developer and you are reading this, don't hesitate; this is just for testing purpose you are the best of the best). This affects our new functionality to show some product details based on the productReference. Let's take a look how this behaves, we will not actually change anything but removing a productReference's value.

```ts
const products = {
  '1': {
    productName: 'xxxx',
    productReference: '1-xxxx',
    price: 0
  },
  '2': {
    productName: 'xxxx',
    price: 0
  }
} as unknown as Record<string, ProductData>
```
The casting on the last line is to not update any ts interface. If we review our front-end result, we'll get the following:

![product-search-uncaught-product-reference-error.gif](/images/articles/react-error-handling/product-search-uncaught-product-reference-error.gif)

Could it be our mistake? Yes, it could. Must we create a ticket to the backend team? As soon as possible please. While the error gets solved let's review the error handling pattern installing the next [dependency](https://www.npmjs.com/package/react-error-boundary).

```cmd
npm install react-error-boundary
```

After installing the package we need to import the `ErrorBoundary` component and wrap our `renderContent` function in it

```tsx
import { ErrorBoundary } from 'react-error-boundary'

// rest of the code

<ErrorBoundary fallback={<p>There was an error</p>}>
  {renderContent()}
</ErrorBoundary>
```

![product-search-error-boundary-fallback.gif](/images/articles/react-error-handling/product-search-error-boundary-fallback.gif)

But wait, the uncaught error alert is still being thrown. Isn't this the problem we will solve? Yeah, it is. We are at development mode (using the react's dev libraries) so react throws that error by default it can not be hidden, what it did change is the result after closing that alert, our component is still there and we can keep interacting with it somehow (at production, the error alert is not shown, the benefits of ErrorBoundary are way more appreciable).

Before implementing ErrorBoundary, if our component crashed the error alert would be shown and the page gets empty. There is a big difference in terms of how our component behaves now.

Before taking ErrorBoundary further let's make a tiny change in our `makeRequest` function so our function will return wrong data once, for the rest of the request the data will be right.

```ts
const products = {
  '1': {
    productName: 'xxxx',
    price: 0
  },
  '2': {
    productName: 'xxxx',
    price: 0
  }
} as unknown as Record<string, ProductData>

function makeRequestClosure() {
  let count = 0

  return async function (productId: string): Promise<ProductData> {
    const product = products[productId]
  
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (product) {
          
          if (count > 0) {
            product.productReference = `${productId}-xxxx`
          }

          resolve(product)
          count++
        } else {
          reject(new Error('It was not product found'))
        }

      }, 500)
    })
  }
}

const makeRequest = makeRequestClosure()

const productDetails: Record<string, Record<string, string>> = {
  '1-xxxx': {
    care: 'Do not wash in washing machine'
  },
  '2-xxxx': {
    care: 'Do not wash in washing machine'
  }
}
```

We just created the makeRequestClosure with a variable count initialized at 0 and it will increment its value every time a product is found. If count is greater than 0 the productReference is added to the product and the promise is immediately resolved (If you want to dive deep into closures please  take a look at the next [post](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures) or let us know if you want us to do an article about it).

Done that, we will create a new component called ErrorFallback and this one will receive some props passed by ErrorBoundary.

```tsx
function ErrorFallback ({ error }: ErrorFallbackProps) {
  const { resetBoundary } = useErrorBoundary()

  return (
    <div>
      <p>There was an error: <strong>{error.message}</strong></p>
      <button onClick={resetBoundary}>Try Again</button>
    </div>
  )
}
```

We are showing the exact thrown error message, but if you would rather show another one you could do it. We are also executing a customHook to get a reset function and this is connected with a function that we can pass directly in the component ErrorBoundary like this.

```tsx
<ErrorBoundary FallbackComponent={ErrorFallback} onReset={getProductData}>
  {renderContent()}
</ErrorBoundary>
```

The function getProductData is the result of refactoring the useEffect:

```tsx
const getProductData = useCallback(() => {
  if (!productId) {
    return
  }

  setStatus('pending')
  makeRequest(productId)
    .then((data) => {
      setStatus('resolved')
      setProductData(data)
    })
    .catch((error: Error) => {
      setStatus('rejected')
      setError(error.message)
    })
}, [productId])

React.useEffect(() => {
  getProductData()
}, [getProductData])
```

We isolated the logic of making the request and updating the status in a function so we can re-use it inside the useEffect and outside as we do passing it as prop. By the way, the function is wrapped in an useCallback to be only updated in case productId changed.

It's time to test our application:

![product-search-error-boundary-try-again.gif](/images/articles/react-error-handling/product-search-error-boundary-try-again.gif)

It works fine, every time we got an error the Fallback component is shown and we could execute the reset function that makes the request once again, then the components passed as children are re mounted.

Let's analyze the following outcome: 

![product-search-error-boundary-reset.gif](/images/articles/react-error-handling/product-search-error-boundary-reset.gif)

Fallback component is shown but hitting the search button does not do anything, looking at our button's handler we will notice we are taking the inputRef's value and setting it in the state productId. Well ErrorBoundary has an approach passing the prop `resetKeys`, its value will be a key (it could be our productId) and every time this key changes, ErrorBoundary will reset its internal state. There is something we should keep in mind but let's figure it out by implementing and then analyzing it:

```tsx
<ErrorBoundary 
  FallbackComponent={ErrorFallback} 
  onReset={getProductData}
  resetKeys={[productId]} // ++
>
  {renderContent()}
</ErrorBoundary>
```

Implementing this feature is quite easy, we just need to pass a new prop. Let's see the outcome:

![product-search-error-boundary-reset-key.gif](/images/articles/react-error-handling/product-search-error-boundary-reset-key.gif)

Did you get it? The first error is thrown as we set it, then hitting the search button does not work but if we change the input's value and hit the button it will work. Well, we need to review the search button's handler, it is taking the inputRef's value and then setting it as the productId value. If you take a look back at the outcome we are hitting the search button with the same productId (the state has not changed) so the ErrorBoundary does not have to reset its state due to resetKeys prop has not changed. On the other hand when we change the input's value it counts as a change and ErrorBoundary will reset it.

So, the takeaway is to know that after a thrown error the resetKeys should be updated? Yeah, that's right. A common approach is to have a reset button instead of a try again button inside the fallBack component so this button will reset the state and not re-make the request as we do (I suggest you to do the needed updates to run the common approach). But you know what? Let's keep having our current approach, we are warriors and we are not afraid of anything.

![sweated-guy.jpg](/images/memes/sweated-guy.jpg)

We have to make some changes if we want our app to be finally working. First of all let's remove the useEffect we can handle all directly on the getProductData function getting internally the input's value so this also implies removing its wrapper useCallback and the state productId, let's see how this looks like in code:

```tsx
function App() {
  const [productData, setProductData] = React.useState<ProductData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState('idle')
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleSearch = () => {
    getProductData()
  }

  const getProductData = () => {
    const productId = inputRef.current?.value ?? ''

    if (!productId) {
      return
    }

    setStatus('pending')
    makeRequest(productId)
      .then((data) => {
        setStatus('resolved')
        setProductData(data)
      })
      .catch((error: Error) => {
        setStatus('rejected')
        setError(error.message)
      })
  }

  const renderContent = () => {
    //...
  }

  return (
    <div>
      <div>
        <input type="text" ref={inputRef} />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        <ErrorBoundary 
          FallbackComponent={ErrorFallback} 
          onReset={getProductData}
          resetKeys={[status]}
        >
          {renderContent()}
        </ErrorBoundary>
      </div>
    </div>
  )
} 
```

![product-search-error-boundary-working.gif](/images/articles/react-error-handling/product-search-error-boundary-working.gif)

We did it, all is working as expected (you can test the other scenarios by your own). 

> **_NOTE:_**  You could find the whole example on [this repository](https://github.com/SynergyWire/react-error-boundary-app)

## Conclusion

This pattern is a powerful tool we can use it to solve uncaught errors. By the way, you could have as many ErrorBoundary as you want, we are only using one in this example but we could have used another one to wrap the search component if we would have wanted to (We let you take this topic at the next level). Remember every tool has the power of either help or complicate us so it's on our own decide what to use how to use it. 





