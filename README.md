## Quick Start
Run the following commands:
```
npm install
npm start
```
This will install dependencies, then start the app and mock API.

## Starter Project Overview
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

I made the following enhancements:
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

- DECIDING HOW TO HANDLE STATE:
    - Establish mental model.
    - History:
        - Initial release. Classes handled state.
        - Flux. Facebook. Centralized stores.
        - Redux. Popular.
        - Stateless function components.
        - Context API. Sharing data and function to many components/entire application.
        - Hooks.
    - Eight (8) Ways:
        - State: APplication data that *may* change over time.
        - Side note: Environment variables. Do not change at runtime. Read during build process. Run-time.
            - Built into: create-react-app. REACT_APP_BASE_URL.
        1. URL: Current app location/settings. Current item. Filter. Sorting. Able to share deep links. CONSIDER REACT ROUTER.
        2. Web storage: Store state in the browser. Reloads. Reboots. Cookies. localStorage. IndexedDB. (Tied to a single browser.)
        3. Local state: State stored in a React component. Forms. Toggles.
        4. Lifted state: Lifted to a common parent. Pass the state down to child compomnents via PROPS. All components reflect the same state.
        5. Derived state: Derive state from existing state/props. Calling .Length on an array. errorsExists on an array.
        6. Refs: DOM reference. Managing uncomtrolled components. Interfacing with non-React libraries. Storing values that are not displayed. e.g.: timer.
        7. Context: Global or broadly-used state and functions. Avoid prop-drilling. Logged-in user. Theme.
        8. Third party library: Redux. Mobx. Recoil. Remote state libraries: react-query. Relay. Apollo.
    - JavaScript data structures:
        1. Primitives: Boolean. String. Number. BigInt. Symbol. Immutable. Change value and create a new instance.
        2. Collections: Objects. Array. Map (KV pairs.) Set (unique values.)
    - In React, treat state as immutable.

- MANAGING LOCAL STATE AND REMOTE STATE:
    - Store local state that changes over time. Shoe store application.
    1. Local state: useState.
    2. Remote state: Mocked via useEffect for async calls.
        - Loading state.
        - Error handling and error boundaries.
        - Promises and async/await.
        - Custom hooks.
    - INSTALL: 
        - GIT. Source control. NODE.JS. (Use LTS.) create-react-app with VSCode and Prettier code formatter. Run Prettier on save.
        - Auto formet: Install Prettier extension. Setting: Formet on save. Check box. (Optional.)
        - Not using PropTypes or TypeScript. Use plain CSS. Copy/paste code.
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