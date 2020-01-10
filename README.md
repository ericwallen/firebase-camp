# Firebase Camp

## Use Firebase in your React app super easily

### Setting up Firebase in React can be tricky. This pacakge is designed to make configuring Firebase in your app a cinch. It also has robust UI for Firebase Authenticaiton. 

## What you can do with it

1. You can Pass Firebase configuration details to a `firebase-camp` component. This elimnates having to import Firebase seperatly and haveing to figure out how to use the `firebase` package.

2. Authentication, perhaps the most time consuming thing you will do for any app, is avaiable to you as a modal. You merely need to put the provided modal component in your render and pass it a few props. The props allow you to control styling and the state of the modal.

3. Run queries. With `firebase-camp` there is not need to use the `firebase` package. The queries are the same. This is on purpose because Cloud Firestore is really amazing and you should be writing your own queries not relying on a package to do that for you.

## Implementation (React Hooks)

### **Step 1** Install it through NPM 
```
npm i firebase-camp
```

### **Step 2** Import it into your app
Note: I always use *create-react-app* to initialize React apps. My examples will be based on this configuration.

```

