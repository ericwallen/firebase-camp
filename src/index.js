import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import React, { useState, useEffect, useContext } from 'react'


export const FirebaseConnection = (obj) => {
    Firebase.initializeApp(obj)
}

export const FirebaseAuthModal = (props) => {
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [inputsObj, setInputsObj] = useState({})
    const [showLoadingVisual, setShowLoadingVisual] = useState(false)



    const handleCreateUserFormSubmit = (event) => {
        event.preventDefault()
        setShowLoadingVisual(true)
        Firebase.auth().createUserWithEmailAndPassword(inputsObj.createUserEmail, inputsObj.createUserPassword)
        .then(()=>{
            Firebase.auth().currentUser.updateProfile({
				displayName: inputsObj.createUserDisplayName
			}).then(() => {
                setShowLoadingVisual(false)
                props.handleHideAuthModal()
                setTimeout(() => {
                    setErrorMessage('')
                }, 7000)
            })
        })
        .catch((error)=>{
            setErrorMessage(error.message)
            setShowLoadingVisual(false)
            setTimeout(() => {
                setErrorMessage('')
            },7000)
        })
    }
    const handleSignInFormSubmit = (event) => {
        event.preventDefault()
        setShowLoadingVisual(true)
        Firebase.auth().signInWithEmailAndPassword(inputsObj.signInEmail, inputsObj.signInPassword)
        .then(()=>{
            setShowLoadingVisual(false)
            props.handleHideAuthModal()
            setTimeout(() => {
                setErrorMessage('')
            }, 7000)
        })
        .catch((error)=>{
            setErrorMessage(error.message)
            setShowLoadingVisual(false)
            setTimeout(() => {
                setErrorMessage('')
            },7000)
        })

    }
    const handleForgotPasswordFormSubmit = (event) => {
        event.preventDefault()
        setShowLoadingVisual(true)
        Firebase.auth().sendPasswordResetEmail(inputsObj.forgotPasswordEmail)
        .then((success)=>{
            setShowLoadingVisual(false)
            setSuccessMessage('Password recovery email sent. Please check your email')
            props.handleHideAuthModal()
            setTimeout(() => {
                setErrorMessage('')
            }, 7000)
        })
        .catch((error)=>{
            setErrorMessage(error.message)
            setShowLoadingVisual(false)
            setTimeout(() => {
                setErrorMessage('')
            },7000)
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
        console.log(obj);
        
    }

    return (
        <>
            <div id="auth-modal" style={{ display: props.show ? 'block' : 'none' }}>
                <div id="auth-modal-content">
                    <span id="auth-modal-close" className="button-style-three" onClick={props.handleHideAuthModal}>x</span>
                    <div id="authentication">

                        {/* {this.props.state.pleaseAuthenticateMessage !== "" && 
						<p className="center" style={{paddingBottom: '30px'}}><b>{this.props.state.pleaseAuthenticateMessage}</b></p>
					} */}

                        {/* OAuth  */}
                        {/* <div id="oauth-providers" style={{display: this.state.showOAuth}}>
						<div id="oauth-providers-grid">
							<img src={googleLogo} alt="Google"  auth="sign-in-with-google" onClick={this.signInWithGoogle}/>
							<img src={facebookLogo} alt="Facebook"  auth="sign-in-with-facebook" onClick={this.signInWithFacebook}/>
							<img src={githubLogo} alt="Github"  auth="sign-in-with-github" onClick={this.signInWithGithub}/>
							<img src={twitterLogo} alt="Twitter"  auth="sign-in-with-twitter" onClick={this.signInWithTwitter}/>
						</div>
						<div id="or">
							<p>or</p>
						</div>
					</div> */}

                        {props.showForm === 'createUser' &&
                            <form id="create-user-form" onSubmit={handleCreateUserFormSubmit}  >
                                <div id="create-user-inputs">
                                    <input className={props.inputsClass} onChange={handleInputs} type="text" name="createUserFirstName" placeholder="First Name" required autoComplete="off" style={{ gridColumnEnd: 'span 1' }} />
                                    <input className={props.inputsClass} onChange={handleInputs} type="text" name="createUserLastName" placeholder="Last Name" required autoComplete="off" style={{ gridColumnEnd: 'span 1' }} />
                                    <input className={props.inputsClass} onChange={handleInputs} type="text" name="createUserDisplayName" placeholder="Display Name" required autoComplete="off" style={{ gridColumnEnd: 'span 2' }} />
                                </div>


                                <div id="create-user-inputs">
                                    <input className={props.inputsClass} onChange={handleInputs} type="email" name="createUserEmail" placeholder="Email" required autoComplete="off" />
                                    <input className={props.inputsClass} onChange={handleInputs} type="password" name="createUserPassword" placeholder="Password" required autoComplete="off" />
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
                                    <input className={props.inputsClass} onChange={handleInputs} type="email" name="signInEmail" placeholder="Email" required autoComplete="off" />
                                    <input className={props.inputsClass} onChange={handleInputs} type="password" name="signInPassword" placeholder="Password" required autoComplete="off" />
                                </div>

                                <div id="forgot-password-link"  onClick={() => props.changeForm('forgotPassword')}>Forgot?</div>
                                <p className="center"><button className="button-style-one" type="submit">Sign In</button></p>
                            </form>
                        }


                        {props.showForm === 'forgotPassword' &&
                         <form id="forgot-password-form" onSubmit={handleForgotPasswordFormSubmit} >
                            <div id="forgot-password-inputs">
                                <input className={props.inputsClass} onChange={handleInputs} type="email" name="forgotPasswordEmail" placeholder="Email" required autoComplete="off"/>
                            </div>
                            <p className="center"><button className="button-style-three" type="submit">Send Recovery Email</button></p>
                        </form> 
                        }


                        <div id="error-message" style={{display: errorMessage ? 'block' : 'none'}}>{errorMessage}</div>
					    <div id="success-message" style={{display: successMessage ? 'block' : 'none'}}>{successMessage}</div>
					
                        {showLoadingVisual &&
                            <div style={{width: '60px', margin: 'auto', marginTop: '20px'}}><img src={props.loading} style={{width: '100%'}} alt="loading"  /></div> 
                        }
                        

                        <div id="have-or-need-account-dialog" style={{display: 'block'}}>
						<p className="center" id="create-user-dialog" style={{display: props.showForm === 'signIn' ? 'block' : 'none'}}>
							Don't have an account? <span className="createUserToggle" style={{cursor: 'pointer'}} onClick={() => changeForm('createUser')}>Create User</span>
						</p>
						<p className="center" id="sign-in-dialog" style={{display: props.showForm === 'createUser' ? 'block' : 'none'}}>
							Already have an account?  <span className="signInToggle" style={{cursor: 'pointer'}} onClick={() => changeForm('signIn')}>Sign In</span>
						</p>
					</div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Firebase