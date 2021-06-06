/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useState } from 'react'

const FORM_URL = `https://app.convertkit.com/forms/2341637/subscriptions`

export function SubscriptionForm() {
  const [status, setStatus] = useState(null)
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    try {
      const response = await fetch(FORM_URL, {
        method: 'post',
        body: data,
        headers: {
          accept: 'application/json',
        },
      })
      setEmail('')
      const json = await response.json()
      if (json.status === 'success') {
        setStatus('SUCCESS')
        return
      }
    } catch (err) {
      setStatus('ERROR')
      console.log(err)
    }
  }

  const handleInputChange = (event) => {
    const { value } = event.target
    setEmail(value)
  }

  return (
    <div
      css={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        padding: '1rem',
        backgroundColor: '#0e273e',
      }}
    >
      <div css={{ gridColumn: 1, gridRow: 1 }}>
        <h2 css={{ fontSize: '1rem', marginBottom: '0.5em' }}>
          Join My Newsletter
        </h2>
        <p css={{ fontSize: '0.75rem' }}>
          Sign up to get notified first when new content comes out.
        </p>
      </div>

      <div
        css={{
          gridColumn: 2,
          gridRow: 1,
          alignSelf: 'center',
          justifySelf: 'center',
          textAlign: 'center',
        }}
      >
        <form action={FORM_URL} method="post" onSubmit={handleSubmit}>
          <input
            type="email"
            aria-label="Your email"
            name="email_address"
            placeholder="Your email address"
            onChange={handleInputChange}
            value={email}
            required
            css={{
              padding: '0.5em',
              marginBottom: '0.5em',
              marginRight: '0.5em',
              fontSize: '0.5rem',
            }}
          />
          <button
            type="submit"
            css={{
              padding: '0.55em',
              fontSize: '0.5rem',
              border: 'none',
              borderRadius: 3,
              backgroundColor: '#081623',
              color: 'white',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Subscribe
          </button>
        </form>
        <p css={{ fontSize: '0.5em' }}>
          No spam and you can unsubscribe at any time.
        </p>
      </div>

      {status === 'SUCCESS' && <p>Please go confirm your subscription!</p>}
      {status === 'ERROR' && <p>Oops, Something went wrong! try again.</p>}
    </div>
  )
}
