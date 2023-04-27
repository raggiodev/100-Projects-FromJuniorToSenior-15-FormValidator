import { useState } from 'react'
import './App.css'

const App = () => {
  const [state, setState] = useState({
    name: '',
    email: '',
    message: '',
    termsAndConditions: false
  })

  const update = event => {
    const target = event.currentTarget

    setState({
      ...state,
      [target.name]: target.type === 'checkbox'
        ? target.checked
        : target.value
    })
  }

  const isValidEmail = email => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return regex.test(String(email).toLowerCase())
  }

  const validationRules = {
    name: !!state.name && state.name.match(/^ *$/) === null,
    email: isValidEmail(state.email),
    message: !!state.message
      && state.message.length < 250
      && state.message.match(/^ *$/) === null,
    termsAndConditions: state.termsAndConditions
  }

  const [showError, setShowError] = useState(false)

  const submit = event => {
    event.preventDefault()

    const isValidForm = Object
      .values(validationRules)
      .every(key => key)

    if (isValidForm) {
      setShowError(false)
      console.log('✅ Submitting form with state:', state)
    }
    else {
      setShowError(true)
    }
  }

  const validate = field => {
    return state[field] && !validationRules[field]
      ? 'error'
      : undefined
  }

  return (
    <form onSubmit={submit}>
      <h1>Get in touch with the form below!</h1>
      <h2>And let’s get to work!</h2>
      <div>
        <input
          placeholder="Your name"
          type="text"
          name="name"
          onChange={update}
          required
          className={validate('name')} // className = React class
        />
        <input
          placeholder="email@email.com"
          type="email"
          name="email"
          onChange={update}
          required
          className={validate('email')}
        />
      </div>
      <textarea
        name="message"
        placeholder="Your message"
        onChange={update}
        required
        className={validate('message')}
      />
      <label>
        <input
          type="checkbox"
          name="termsAndConditions"
          onChange={update}
          required
          className={validate('checkbox')}
        />
        Please accept our <a href="#">terms and conditions</a>
      </label>
      <button type="submit">Submit</button>
      {showError && (
        <span>Please fix the highlighted fields to proceed.</span>
      )}
    </form>
  )
}

export default App