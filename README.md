## Quick Start
    - Run the following commands:
        ```
        npm install
        npm start
        ```
    - This will install dependencies, then start the app and mock API.

## Starter Project Overview
    - This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

    - The following *enhancements* were made:
        1. Added a mock API using [json-server](https://github.com/typicode/json-server). Configured `npm start` to run the app and mock API at the same time using [npm-run-all](https://www.npmjs.com/package/npm-run-all). See [Building Applications with React and Flux](https://app.pluralsight.com/library/courses/react-flux-building-applications/table-of-contents) for details on how to set this up from scratch.
        2. Installed [react-router-dom](https://www.npmjs.com/package/react-router-dom), [history](https://www.npmjs.com/package/history) (React Router peer dependency), and [cross-env](https://www.npmjs.com/search?q=cross-env) for declaring environment variables.
        3. Added some React components to help us get started: Header, Footer, Spinner
        4. Added styles to App.css
        5. Added `/public/images`.
        6. Added data fetching functions in `/src/services`.
        7. Added db.json to root as json-server's mock database
        8. Overwrote App.css with custom styles
        9. Simplified index.js (removed service worker)
        10. Deleted from src: index.css, logo.svg, serviceWorker.js, App.test.js
        11. Deleted from public: logo files, manifest.json, robots.txt
        12. Customized App.js and renamed to App.jsx

## MANAGING STATE IN REACT 18

- OVERVIEW:
    - Patterns for declaring, setting, and reliably deriving state.
    - Sharing data and logic between components.
    - Managing loading, error, and form validation state.
    - Tracking unrendered state.
    - How to choose state management approaches.
    - Function components, JSX, and props.
    - No Redux, Flux, etc. React state management only.

- DECIDING HOW TO HANDLE STATE:
    - Reactive. Create. Move. And change data over time.
    - Establish mental model.
    - History:
        - Initial release. Classes handled state.
        - Flux. Facebook. Centralized stores.
        - (2015) Redux. Popular.
        - (2015) Stateless function components.
        - (2018) Context API. Sharing data and function to many components/entire application.
        - (2019) Hooks.
    - Eight (8) Ways to handle **React** state:
        - State: Application data that *may* change over time.
        - Side note: Environment variables. Do not change at runtime. Read during build process. Run-time.
            - Built into: create-react-app. REACT_APP_BASE_URL.
        1. URL: Current app location/settings. Current item. Filter. Sorting. Able to share deep links. 
            - CONSIDER REACT ROUTER. Use URL as system of record. Avoid state.
        2. Web storage: Store state in the browser.
            - Reloads. Reboots. Cookies. Partaily-completed form data.
            - localStorage. IndexedDB. (NOTE: Tied to a single browser.)
        3. Local state: State stored in a React component. Forms. Toggles.
        4. Lifted state: Lifted to a common parent.
            - Pass the state down to child components via PROPS.
            - USE WHEN: All components reflect the same state.
        5. Derived state: Derive state from existing state/props.
            - e.g.: Calling ().length on an array. errorsExists on an array.
        6. Refs: DOM reference. Managing uncontrolled components. Holding a DOM reference.
            - Interfacing with non-React libraries.
            - Storing values that are not displayed. e.g.: timer.
        7. Context: Global or broadly-used state and functions.
            - Avoid prop-drilling. Logged-in user. Authorization. Theme. Intl.
        8. Third party library:
            - Redux. Mobx. Recoil. Remote state libraries: react-query. SWR. Relay. Apollo.
    - JavaScript data structures:
        1. Primitives: Boolean. String. Number. BigInt. Symbol. Immutable.
            - Change value and create a new instance.
        2. Collections: Objects. Array. Map (KV pairs.) Set (unique values.)
    - In React, treat state as immutable. Treat arrays carefully.

- MANAGING LOCAL STATE AND REMOTE STATE:
    - Store local state that changes over time. Request data from a remote server.
    - Shoe store application:
    1. Local state: useState.
    2. Remote state: useEffect.
        - Mocked via useEffect for async calls.
        - Loading state.
        - Error handling and error boundaries.
        - Promises and async/await.
        - Custom hooks.
    - INSTALL:
        - GIT. Source control. NODE.JS. `create-react-app` with VSCode and Prettier code formatter. 
            - Run Prettier on save.
            - Auto format: Install Prettier extension. Setting: Format on save. Check box. (Optional.)
            - NOTES: Not using PropTypes or TypeScript. Use plain CSS. Copy/paste code.
    - APPLICATION:
        - Modified 'start' to begin both the app and the mock API.
            ```javascript
                "start": "run-p start-app start-api"
            ```
        - Entry point. Index.js
    - Implement shoe listing page:
        - Why state is necessary. Fetch an store data. 
        - Handle immutable state. Implement filter and update state.
        - Display error page. Rules of hooks. Implement custom hook.
        - The section tag is often a better choice than a div. It's more descriptive.
            ```javascript
                <section></section>
            ```
            - If you're torn of which tag to use, search for HTML5 flowchart.
        - .map() automatically passes each iteration to the associative function. This is called a 'point-free' style. e.g.: 
            ```h
                {products.map(renderProduct)}
            ```
        - useState hook. Allows for declaring state inside of function components.
            - useState will return an array of two items: The state and the 'setter' function.
            - Traditionally the setter has the same name as the state, with the "set" prepended.
            - Declare state called "size" with a setter called "setSize." Default size to an empty string:
                ```javascript
                    const [size, setSize] = useState("");
                ```
            - This is called array destructuring. We are declaring a variable for each element in the returned array. e.g.:
                ```javascript
                    const state = useState("");
                    const size = state[0];
                    const setSize = state[1];
                ```
    - HOOKS: Enhancing function components. Some concentrate on state.
        1. Only are for functional components. Can be consumed in classes too.
            ```javascript
                export default function
            ```
        2. Start with "use."
        3. Only call them at a top level. Consistent order. 
            - Cannot be called inside of functions, conditionals, or loops.
                ```javascript
                    // Incorrect. Cannot wrap within consitionals.
                    if (props.isAdmin) {
                        const [role, setRole] = useState('');
                    }
                ```
            - Declare at the root of the component.
            - Hooks need to be run in the same order on every render.
            - React tracks the order hooks are run so it can store the corresponding data.
        - Need to run a hook conditionally? Then place the condition inside the hook.
    - Controlled component: React is controlling the value.
        - EVENTS:
            - Synthetic events. Similar to browser's native event system.
            1. Assures events operate consistently cross-browser.
            2. Improves performance by strategically binding event handlers.
        - React developer tools. Chrome store.
            - useState calls are listed in the order they are declares:
                - e.g.: hooks: { State: "7" }
        - NOTE: Properties available on an event? Set a debugger amd inspect.
            ```javascript
                debugger;
            ```
        - Derived state:
            - When does React render:
                1. State changes.
                2. Prop changes.
                3. Parent render.
                4. Context changes.
                - NOTE: This is why we need to declare state for data that changes over time. 
                - NOTE: Will not re-render when a plain variable changes.
        - When state changes the component renders which causes derived state to be calculated.
        - Logical && operator. It runs the right side if the left side is truthy.
            ```javascript
                {size && <h2>Found {filtered.length} items</h2>}
            ```
        - The useEffect hooks runs after every render.
        - useEffect is like a configurable lifecycle method.
    - Four ways in which to handle API calls.
        1. Inline. Call fetch/Axios/etc:
            - Simple/ Direct.
            - Hard to ensure API calls are handled consistently across the application. Cannot be reused.
            - NOT RECOMMENDED.
        2. Centralized functions: Call separate functions.
            - Import separate function and call it.
            ```javascript
                import { getUsers } from "./services/userService";
                const [users, setUsers] = useState([]);
                    useEffect(()=> {
                        getUsers().then(json => setUsers(json))
                    }, []);
            ```
        3. Custom hook. Create and call a custom hook:
        4. Library. react-query, e.g.:
    - React error boundary. NOTE: This must be a class component.
        ```javascript
            export default class ErrorBoundary extends React.Component {
                constructor(props) {
                    super(props);
                    this.state = { hasError: false };
                }
            }
        ```
        ```javascript
            export default class;
            import ErrorBoundary from './ErrorBoundary';
        ```
        - Error boundaries do not catch errors in asynchronous code.
        - Promises versus async/await. Syntactic sugar. Can mix the two.
            ```javascript
                useEffect(() => {
                    getProducts("shoes")
                    .then((response) => setProducts(response))
                    .catch((e) => setError(e))
                    .finally(() => setLoading(false));
                }, []);
            ```
        - Versus:
            ```javascript
                useEffect(() => {
                    async function init() {
                        try {
                            const response = await getProducts("shoes");
                            setProducts(response);
                        } catch (e) {
                            setError(e);
                        }
                        finally {
                            setLoading(false);
                        }
                    }
                    init();
                }, []);
            ```
    - Creating a custom hook: Create a single hook that makes it easy to generate HTTP calls.
        - Simplify state logic. Radically.
        ```javascript
            const { data:products, loading, error } = useFetch("products?category=shoes")
        ```
    - SUMMARY:
        - Local State: useState.
        - Remote State: useEffect. async calls. Promises/async await. 
            - Loading state. Error boundary. Error handing.
        - Custom hook: Streamline.

- MANAGING ROUTE STATE:
    - Store state within the URL. Instantenious page transitions.
        - Create App layout. Declare routes with placeholders.
        - Read URL parameters. Handle 404s. Implement links. Redirect.
    - Separate, open-source: react-router.
        - Create application layout. Declare routes with placeholders. Read URL parameters.
        - Handle 404s. Implement inks. Redirect.
        - Create product detail and shopping cart.
    - All child components can declare routes.
    - SUMMARY:
        - Declare routes via <Route/>
        - Declared and read URL placeholders.
        - Used <Link/> instead of anchor.
        - Handled 404s.
        - Redirected via useNavigate hook.

- MANAGING SHARED, DEVIRED, AND IMMUTABLE STATE:
    - Build a shopping cart:
        - Derive state:
            ```javascript
                <button disabled={!sku}>
            ```
        - Explore where to declare state:
            - NOTE: Multiple pages need the cart state.
            - SUGGESTION: Start local with state, and then lift when needed.
            - Principe of least privilege: Every module must be able to access only the information and resources that are necessary for its legitimate purpose.
                - Try to keep state as local as possible.
                - Ideally, each React component only has access to the data and functions that it needs.
            - Start local:
                - Declare state in the component that needs it.
                - Child components need the state? Pass state down via props.
                - Non-child components need the state? Lift state to a common parent.
                - Passing props gets annoying? Consider context. Redux. Etc.
            - Problem: Both components needs to access the cart state.
                - App -> Detail: Add item to cart.
                - App -> Cart: Display cart.
                - Declare cart state within the App component.
        - Lift state:
            - Placing state within a common parent component.
            - We need to update state using existing state. So we should use a function to set state.
            - Why is setting state async? 
                - Batching improves performance by reducing re-renders.
                - If state is set multiple times in a short time period, React may batch the updates.
                - Supports async rendering.
                - Use the function form when you need to reference existing state.
                ```javascript
                    // setCount(count + 1);
                    setCount((count) => count + 1);
                ```
                - Predicate. A function that returns either true or false.
                - In React, we treat state as immutable.
        - Immutability: Why bother? Friendly approaches:
            - Why?
                - Fast comparisons.
                - Pure functions are easy to understand & test.
                - Simpler undo/redo.
                - Avoid bugs. 
            - Fast comparisons. Are these equal? Value versus reference equality:
                - Value equality: Does each property have the same value?
                - Reference equality: Do both variables reference the same spot in memory?
                ```javascript
                    const user1 = user;
                    const user2 = user;
                    // Value equality:
                    user1.name === user2.name && user1.role === user2.role;
                    // Reference equality:
                    user1 === user2;
                ```
                - React: If old and new state reference the same spot in memory, then state hasn't changed.
            - Pure functions are easy to understand and test.
            - More simple for undo/redo.
            - Avoid bugs.
            - Immutability: To change state, return a new value.
                - Immutable already: Number, String, Boolean, Undefined, Null.
                - Mutable: Objects, Arrays, Functions.
                - Mutating state versus *not* mutating state:
                    ```javascript
                        state = {
                            name: 'X',
                            role: 'Dancer'
                        }
                        state.role = 'Singer';
                        return state;

                        return state = {
                            name: 'X',
                            role: 'Singer'
                        }
                    ```
                - Handling Immutable Data in JavaScript:
                    - Object.assign. Create an empty object and then add some properties:
                        - This takes as many source objects as you can assign to the target.
                    ```javascript
                        Object.assign({}, state, { role: "Singer" });
                    ```
                    - Spread syntax: Whatever you place on the right is shallow copied.
                        - NOTE: Use spread to copy as array as well.
                    ```javascript
                        const newState = { ...state, role: "Singer" };
                    ```
                    - WARNING: Both Object.assign and spread create shallow copies.
                        - Beware the nested object. Perhaps clone the nested object on change.
                    ```javascript
                        const user = {
                            namw: 'X',
                            address: {
                                state: 'Minnesota'
                            }
                        };
                        const nested = { ...user, address: { ... user.address }};
                    ```
                    - NOTE: Try to avoid storing nested objects within state.
                    ```javascript
                        const user = {
                            namw: 'X',
                            email: 'x@x.com',
                            address: {
                                state: 'Minnesota'
                            }
                        };
                        // Avoid:
                        const [user, setUser] = useState(user);
                        // Prefer:
                        const [user, setUser] = useState(user);
                        const [address, setAddress] = useState(user.address);
                    ```
                    - And then merge the objects back together.
                    - WARNING: Avoid blindly deep cloning. 
                        - It's expensive. Typically wasteful. Causes unnecessary renders.
                    - Some array methods: .map();
                        - Avoid these: push, pop, reverse. 
                            - If using, clone the array first to avoid mutating.
                        - Prefer these: map, filter, reduce, concat, spread.
                            - NOTE: These return a *new* array.
                        - Map runs a function on each element in the array.
                        - And returns a new array that's the same length.
        ```javascript
            function addToCart(id, sku) {
                setCart((items) => {
                    const itemInCart = items.find((i) => i.sku === sku);
                    if (itemInCart) {
                        // Return a new array with the matching item replaced:
                        return items.map((i) =>
                            i.sku === sku ? { ...i, quantity: i.quamtity + 1 } : i
                        );
                    } else {
                        // Return a new array with the new item appended:
                        return [...items, { id, sku, quantity: 1 }];
                    }
                });
            }
            // Props
            <Route 
                path="/:category/:id" 
                element={<Detail addToCart={addToCart} />}
            />
            export default function Detail(props)
            onClick={() => {
                props.addToCart(id,sku);
            }};
        ```
        - Use function form of setState.
            - When updating state using existing state, use the function form of set state.
        - Prop destructuring:
        ```javascript
            export default function Cart({ cart, updateQuantity }) { };
            export default function Cart(props) { 
                const { cart, updateQuantity } = props;
            };           
        ```
        ```javascript
            function updateQuantity(sku, quantity) {
                setCart((items) => {
                    // Implement delete:
                    if (quantity === 0) {
                        // Keep all items that don't have the sku passed in if the quantity is 0.
                        return items.filter((i) => i.sku !== sku);
                    }
                    // Return a new array of items with the new quantity changed for the sku passed in.
                    return items.map((i) => i.sku === sku ? { ...i, quantity } : i);
                })
            }          
        ```
        - Implementing Immutable Friendly Delete:
        - Goal: Keep all the records that *don't* have the specified sku.
            - With `filter` we will tell the array what to keep.
            - With `reduce` we can aggregate the quantity.
            - Typically, performance isn't a problem. 
                - If so, use Reacts useMemo for memoization  of expensive calculations.
                - The useMemo hook must be declared above the first return since hooks can't be called conditionally.
            ```javascript
                const numItemsInCart = useMemo(
                    () => cart.reduce((total, item) => total+item.quantity, 0), 
                    [cart]
                );
            ```
        - useMemo hook must be declared above the first return since hooks can't be called conditionally.
        - Local storage so that the "cart" is saved even upon reload.
        - Web storage: 
            - cookie: Simple.
            - localStorage: Simple. Blocks i/o.
            - sessionStorage: Simple. Blocks i/o.
            - IndexedDb: Complex.
            - Cache Storage: Off-line support.
                - Downfalls: 
                    - Limited storage. 
                    - Security risk. 
                    - localStorage/sessionStorage block i/o. 
                    - Tied to browser.
        ```javascript
            import { useEffect } from "react";
            // Initialize with localStorage cart if exists.
            // Note: default values are only applied on the first render.
            // Yet it is evaluated upon every render.
            // Soultion: Decalre the default using a function.
            // The function will only be run the first time the component renders.
            const [cart, setCart] = useState();
            // Now this will only be run upon initial load.
            const [cart, setCart] = useState(() => {
                try {
                    // Nullish coalescing operator:
                    // If the left-hand side is null or undefined, use the value on the right.
                    return JSON.parse(localStorage.getItem("cart")) ? [];
                } catch {
                    // What is the localStorage data is malformed?
                    console.error("The cart in locaslStorage could not be parsed into JSON.");
                    return [];
                }
            });

            // Persist the cart to localStorage.
            // NOTE: dependency array: [cart]
            // Anytime the cart changes, store it in localStorage as a JSON string.
            // Use "cart" as the key.
            useEffect(() => {
                localStorage.setItem("cart", JSON.stringify(cart)), [cart];
            });
        ```
        - Lazy initializing state:
            - Default values are evaluated on every render.
            - Functions are lazy evaluated.
            - Use try/catch for malformed local data.
            - Use Nullish coalescing operator: ?? 
                - If the left-hand side is null or undefined, use the value on the right.

- MANAGING FORM STATE AND VALIDATION:
    - Validate onBlur and onSubmit. Track touched fields.
    - Derive most validation-related values. Implement state enum.
    - Creating change handlers and persisting events:
        - Controlled components: Setting state with an object is a little more complex.
        - NOTE: With functional set state, React deletes the event before we can access it.
        - SOLUTION: Persist the change.
            ```javascript
                e.persist();
            ```
        - NOTE: This isn't necessary in React 17 or later since React 17 no longer pools events.
    - Form validation decisions:
        - Where to display errors? By field and on top.
        - When to display errors? onSubmit? onBlur? onChange? All three.
        - When to disable submit? While submitting.
        - When to revalidate? onSubmit? onBlur? onChange? All three.
        - What state do we need to declare?
            - Touched: What fields have been touched? (Store as touched.)
                - Track as 'touched'.
            - Submitted: Has the form been submitted? (Store as status.)
                - Track as 'submitted'.
            - isSubmitting: Is a form submission in progress? (Store as status.)
                - Track as 'submitted'.
            - isValid: Is the form currently valid? (Derive.)
            - errors: What are the errors for each field? (Derive.)
            - dirty: Has the form changed? (Derive.)
    - Implement a state enum.
        - Favor ENUMs over separate Booleans. JavaScript does not have built-in enumerations.
        - Our form can only be in 1 of 3 states at a given time.
        ```javascript
            const STATUS = {
                IDLE: "IDLE",
                SUBMITTING: "SUBMITTING",
                SUBMITTED: "SUBMITTED",
                COMPLETED: "COMPLETED"
            };
            const [status, setStatus] = useState(STATUS.IDLE);
        ```
    - Pass down well-named functions to children to assist in encapsulating state management.
        - Passing functions down instead of the raw setter protects the state;
        - Principle of least privilege: Components should only be provided what they need.
        - NOTE: Passing functions down instead of the raw setter protects the state.
    - State ENUMs versus Finite State Machine:
        - Does my logic have discrete states? If so, consider declaring a single "status" variable.
        - Finite state machine: Only *one* state can be active at the same time.
            - The machine transitions from one state to another. 
                - e.g.: XState library.
                    - Enforces state transitions. Declare how and when the application state moves.
                        - Protects from invalid transitions.
                    - Provides state charts. The display of logic transitioning from one state to another.
    - Implementing on-the-fly form validation:
        - Common mistake: Declaring too much state. Most form state can be derived.
        - We are not going to store errors in state. Instead, we will calculate errors on each render.
        - Storing errors in an object makes them easier to reference.
    - The form is valid if the errors objects has no properties.
        - GOAL: Only submit the form if it's valid. Otherwise, just set the status to submitted.
        - Display validation errors next to fields that have been touched.
        - GOAL: Display inline error if form has been touched or the form has been submitted.
        - Display the inline error message if:
            - The field has been touched or the form has been submitted.
        - Derived state benefits:
            - Reduced the amount of state we had to store.
            - Assure error state is valid because it recalculates on each render.
        - FORM libraries:
            - Formik and/or React Hook Form.

- MANAGING STATE VIA REFS:
    - Refs: Reference an HTML element.
        - Store a value that is stable, and persists, between renders.
        - Can mutate the ref's value directly.
        - Don't cause a re-render when they change. Access underlying DOM element using 'current.'
        ```javascript
            import React, { useRef } from 'React';
            function TextInputWithFocusButton() {
                const element = useRef(null);
                const onButtonClick = () => element.current.focus();
                return (
                    <>
                        <input ref={element} type="text" />
                        <button onClick={onButtonClick}>Focus</button>
                    </>
                );
            }
        ```
    - When to use:
        - DOM element reference.
        - State that isn't rendered/doesn't change.
        - "Instance variables" in func components.
            - Keep data between renders. Storing a previous value.
            - Track if component is mounted. Hold HTTP request cancel token.
            - Reference a third-party library instance.
            - Debounce a call or declare local cache. Sotore a flag. Store a value.
    - REFS: HTML itself becomes the source of truth, instead of React state.
        - NOTE: Uncontrolled inputs give us less power. React doesn't re-render when REFs change.
    - Controlled versus Uncontrolled Inputs:
        - Both: Set an initial value. Validate upon submit.
        - Controlled: Validate instantly. (e.g.: onBlur.) Conditionally disable submit. Enforce input format.
            - Several inputs for one piece of data. Dynamic inputs.
        - When to go uncontrolled:
            - Extreme performance requirements. Many DOM elements that change frequently.
            - Working with non-React libraries.
    - Avoid setting state on unmounted components.
        - NOTE: Leaving a page before that page's API call is completed.
        - `Can't perform a React state update on an unmounted component.`
        - `This is a no-op, but it indicates a memory leak in your application.`
        - Any function returned from useEffect is called on unmount.
            - Also consider cancelling the `fetch` call.
    - Storing a previous value using a REF.

- MANAGING COMPLEX STATE WITH USEREDUCER:
    - Why useReducer:
        - Managing state via a pure function.
        - And when to consider: