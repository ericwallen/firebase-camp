import * as app from 'firebase'
import React, { useState, createContext } from 'react'
const FirebaseContext = createContext(null)
export { FirebaseContext }

export const FirebaseConnection = (obj) => {
    if (!app.apps.length) {
        app.initializeApp({ ...obj })
    }
}

export const AuthenticationInput = (props) => {
    return (
        {...props}
    )
}

export default ({ children }) => {
    return (
        <FirebaseContext.Provider value={app}>
            {children}
        </FirebaseContext.Provider>
    )
}


export const FirebaseAuthenticationInterface = (props) => {
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [inputsObj, setInputsObj] = useState({})
    const [showLoadingVisual, setShowLoadingVisual] = useState(false)
    const handleCreateUserFormSubmit = (event) => {
        event.preventDefault()
        setShowLoadingVisual(true)
        app.auth().createUserWithEmailAndPassword(inputsObj.createUserEmail, inputsObj.createUserPassword)
            .then(() => {
                app.auth().currentUser.updateProfile({
                    displayName: inputsObj.createUserDisplayName
                }).then(() => {
                    setShowLoadingVisual(false)
                    props.handleHideAuthenticationInterface()
                    setTimeout(() => {
                        setErrorMessage('')
                    }, 7000)
                    let userObj = {
                        firstName: inputsObj.createUserFirstName,
                        lastName: inputsObj.createUserLastName,
                        dateJoined: app.firestore.Timestamp.fromDate(new Date())
                    }
                    app.firestore().collection(props.usersCollection).doc(app.auth().currentUser.uid).set({
                        ...userObj
                    })
                })
            })
            .catch((error) => {
                setErrorMessage(error.message)
                setShowLoadingVisual(false)
                setTimeout(() => {
                    setErrorMessage('')
                }, 7000)
            })
    }
    const handleSignInFormSubmit = (event) => {
        event.preventDefault()
        setShowLoadingVisual(true)
        app.auth().signInWithEmailAndPassword(inputsObj.signInEmail, inputsObj.signInPassword)
            .then(() => {
                setShowLoadingVisual(false)
                props.handleHideAuthenticationInterface()
                setTimeout(() => {
                    setErrorMessage('')
                }, 7000)
            })
            .catch((error) => {
                setErrorMessage(error.message)
                setShowLoadingVisual(false)
                setTimeout(() => {
                    setErrorMessage('')
                }, 7000)
            })

    }

   
    
    const handleForgotPasswordFormSubmit = (event) => {
        event.preventDefault()
        setShowLoadingVisual(true)
        app.auth().sendPasswordResetEmail(inputsObj.forgotPasswordEmail)
            .then((success) => {
                setShowLoadingVisual(false)
                setSuccessMessage('Password recovery email sent. Please check your email')
                props.handleHideAuthenticationInterface()
                setTimeout(() => {
                    setErrorMessage('')
                }, 7000)
            })
            .catch((error) => {
                setErrorMessage(error.message)
                setShowLoadingVisual(false)
                setTimeout(() => {
                    setErrorMessage('')
                }, 7000)
            })
    }

    const changeForm = (form) => {
        setErrorMessage('')
        props.changeForm(form)
    }


    const handleInputs = (e) => {
        let name = e.target.name
        let value = e.target.value
        let obj = inputsObj
        obj[name] = value
        setInputsObj(obj)  
    }

    // Invoked when user wants to sign in with Google
    const signInWithGoogle = () => {
        const googleProvider = new app.auth.GoogleAuthProvider()
        app.auth().signInWithPopup(googleProvider)
            .then(() => {
                props.handleHideAuthenticationInterface()
            })
            .catch(error => {
                setErrorMessage(error.message)
                setShowLoadingVisual(false)
                setTimeout(() => {
                    setErrorMessage('')
                }, 7000)
            })
    }

    // Invoked when user wants to sign in with Facebook
    const signInWithFacebook = () => {
        const facebookProvider = new app.auth.FacebookAuthProvider()
        app.auth().signInWithPopup(facebookProvider)
            .then(() => {
                props.handleHideAuthenticationInterface()
            })
            .catch(error => {
                setErrorMessage(error.message)
                setShowLoadingVisual(false)
                setTimeout(() => {
                    setErrorMessage('')
                }, 7000)
            })
    }

    // Invoked when user wants to sign in with Twitter
    const signInWithTwitter = () => {
        const twitterProvider = new app.auth.TwitterAuthProvider()
        app.auth().signInWithPopup(twitterProvider)
            .then(() => {
                props.handleHideAuthenticationInterface()
            })
            .catch(error => {
                setErrorMessage(error.message)
                setShowLoadingVisual(false)
                setTimeout(() => {
                    setErrorMessage('')
                }, 7000)
            })
    }

    // Invoked when user wants to sign in with Github
    const signInWithGithub = () => {
        const githubProvider = new app.auth.GithubAuthProvider()
        app.auth().signInWithPopup(githubProvider)
            .then(() => {
                props.handleHideAuthenticationInterface()
            })
            .catch(error => {
                setErrorMessage(error.message)
                setShowLoadingVisual(false)
                setTimeout(() => {
                    setErrorMessage('')
                }, 7000)
            })
    }

    const processChildren = () => {
        return props.children.map(each => <input {...each.props} onChange={handleInputs} />)
    }

    const showOAuth = () => {
        if(props.googleLogo ||props.facebookLogo || props.githubLogo || props.twitterLogo){
            return true
        } else {
            return false
        }
    }



    const authenticationForm = () => {
        return (
            <>

                {showOAuth() &&
                        <div id="oauth-providers">
                        <div id="oauth-providers-grid">
    
                            {props.googleLogo ? <img src={props.googleLogo} alt="Google" auth="sign-in-with-google" onClick={signInWithGoogle} /> : ''}
                            {props.facebookLogo ? <img src={props.facebookLogo} alt="Facebook" auth="sign-in-with-facebook" onClick={signInWithFacebook} /> : ''}
                            {props.githubLogo ? <img src={props.githubLogo} alt="Github" auth="sign-in-with-github" onClick={signInWithGithub} /> : ''}
                            {props.twitterLogo ? <img src={props.twitterLogo} alt="Twitter" auth="sign-in-with-twitter" onClick={signInWithTwitter} /> : ''}
                        </div>
                        <div id="or">
                            <p>or</p>
                        </div>
                    </div>
                }
                

                {props.showForm === 'createUser' &&
                    <form id="create-user-form" onSubmit={handleCreateUserFormSubmit}  >
                        <div id="create-user-inputs">
                            <input onChange={handleInputs} type="text" name="createUserFirstName" placeholder="First Name" required autoComplete="off" style={{ gridColumnEnd: 'span 1' }} />
                            <input onChange={handleInputs} type="text" name="createUserLastName" placeholder="Last Name" required autoComplete="off" style={{ gridColumnEnd: 'span 1' }} />
                            <input onChange={handleInputs} type="text" name="createUserDisplayName" placeholder="Display Name" required autoComplete="off" style={{ gridColumnEnd: 'span 2' }} />
                            {props.children ? processChildren() : ''}

                        </div>

                        

                        <div id="create-user-inputs">
                            <input onChange={handleInputs} type="email" name="createUserEmail" placeholder="Email" required autoComplete="off" />
                            <input onChange={handleInputs} type="password" name="createUserPassword" placeholder="Password" required autoComplete="off" />
                            <div></div>
                            <div id="six-character-min">6 character minimum</div>
                        </div>

                        <div style={{ display: 'grid', justifyItems: 'center' }}>
                            <button className="button-style-two" type="submit">Create User</button>
                        </div>

                    </form>
                }

                {props.showForm === 'signIn' &&
                    <form id="sign-in-form" onSubmit={handleSignInFormSubmit} >
                        <div id="sign-in-inputs">
                            <input onChange={handleInputs} type="email" name="signInEmail" placeholder="Email" required autoComplete="off" />
                            <input onChange={handleInputs} type="password" name="signInPassword" placeholder="Password" required autoComplete="off" />
                        </div>

                        <div id="forgot-password-link" onClick={() => props.changeForm('forgotPassword')}>Forgot?</div>
                        <div style={{ display: 'grid', justifyItems: 'center' }}>
                            <button className="button-style-one" type="submit">Sign In</button>
                        </div>
                    </form>
                }


                {props.showForm === 'forgotPassword' &&
                    <form id="forgot-password-form" onSubmit={handleForgotPasswordFormSubmit} >
                        <div id="forgot-password-inputs">
                            <input onChange={handleInputs} type="email" name="forgotPasswordEmail" placeholder="Email" required autoComplete="off" />
                        </div>
                        <div style={{ display: 'grid', justifyItems: 'center' }}>
                            <button className="button-style-three" type="submit">Send Recovery Email</button>
                        </div>
                    </form>
                }


                <div id="error-message" style={{ display: errorMessage ? 'block' : 'none' }}>{errorMessage}</div>
                <div id="success-message" style={{ display: successMessage ? 'block' : 'none' }}>{successMessage}</div>

                {showLoadingVisual &&
                    <div style={{ width: '60px', margin: 'auto', marginTop: '20px' }}><img src={props.loading} style={{ width: '100%' }} alt="loading" /></div>
                }


                <div id="have-or-need-account-dialog" style={{ display: 'block' }}>
                    <p className="center" id="create-user-dialog" style={{ display: props.showForm === 'signIn' ? 'block' : 'none' }}>
                        Don't have an account? <span className="createUserToggle" style={{ cursor: 'pointer' }} onClick={() => changeForm('createUser')}>Create User</span>
                    </p>
                    <p className="center" id="sign-in-dialog" style={{ display: props.showForm === 'createUser' ? 'block' : 'none' }}>
                        Already have an account?  <span className="signInToggle" style={{ cursor: 'pointer' }} onClick={() => changeForm('signIn')}>Sign In</span>
                    </p>
                </div>

            </>
        )
    }

    const closeButton = () => {
        return props.hideCloseButton ? '' :  <span id="modal-close" onClick={props.handleHideAuthenticationInterface}><img src={props.closeIcon}/></span>
    }

    return (
        <>

            {props.modal &&
                <div id="modal" style={{ display: props.show ? 'block' : 'none' }} >
                    <div id="modal-content">
                        {closeButton()}
                        <div id="authentication">
                            {authenticationForm()}
                        </div>
                    </div>
                </div>

            }

            {!props.modal &&
                <div style={{ display: props.show ? 'block' : 'none', maxWidth: '400px', margin: 'auto' }}>
                    
                        {closeButton()}
                       
                        <div id="authentication">
                            {authenticationForm()}
                        </div>
                    
                </div>

            }

        </>
    )
}



export const BlankModal = (props) => {
    const closeButton = () => {
        return props.hideCloseButton ? '' :  <span id="modal-close" onClick={props.handleHideBlankModalInterface}><img src={props.closeIcon}/></span>
    }


    return(
        <div id="modal" style={{ display: props.show ? 'block' : 'none' }} >
            <div id="modal-content" style={{maxWidth: props.width ? props.width : '400px'}}>
                {closeButton()}
                <div id="authentication">
                    {props.children}
                </div>
            </div>
        </div>
    )
}