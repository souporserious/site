/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useState } from 'react'

const FORM_URL = `https://app.convertkit.com/forms/2341637/subscriptions`

export function SubscriptionForm() {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    setSubmitting(true)
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
    } finally {
      setSubmitting(false)
      setTimeout(() => {
        setStatus(null)
      }, 5000)
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
        padding: '1rem',
        backgroundColor: '#0e273e',
        '@media screen and (max-width: 599px)': {
          textAlign: 'center',
          gridGap: '1rem',
        },
        '@media screen and (min-width: 600px)': {
          gridTemplateColumns: '1fr 1fr',
        },
      }}
    >
      <div
        css={{
          '@media screen and (min-width: 600px)': { gridColumn: 1, gridRow: 1 },
        }}
      >
        <h2 css={{ fontSize: '1rem', marginBottom: '0.5em' }}>
          Join My Newsletter
        </h2>
        <p css={{ fontSize: '0.75rem' }}>
          Sign up to get updates for my open source libraries or when new
          content is published.
        </p>
      </div>

      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5em',
          alignSelf: 'center',
          justifySelf: 'center',
          textAlign: 'center',
          '@media screen and (min-width: 600px)': {
            gridColumn: 2,
            gridRow: 1,
          },
        }}
      >
        <form
          action={FORM_URL}
          method="post"
          onSubmit={handleSubmit}
          css={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gridGap: '0.25em',
          }}
        >
          <input
            type="email"
            aria-label="Your email"
            name="email_address"
            placeholder="Your email address"
            onChange={handleInputChange}
            value={email}
            required
            css={{
              fontSize: '0.65rem',
              padding: '0.5em',
            }}
          />
          <button
            type="submit"
            disabled={submitting || email.length === 0}
            css={{
              fontSize: '0.65rem',
              padding: '0.5em',
              border: 'none',
              borderRadius: 3,
              backgroundColor: '#081623',
              color: 'white',
              fontWeight: 500,
              cursor: 'pointer',
              '&[disabled]': {
                opacity: 0.6,
                cursor: 'not-allowed',
              },
            }}
          >
            {submitting ? 'Submitting' : 'Subscribe'}
          </button>
        </form>
        <p css={{ fontSize: '0.5em' }}>
          No spam <em>ever</em>, unsubscribe at any time.
        </p>
        {status === 'SUCCESS' && (
          <p css={{ fontSize: '0.5em', color: '#cbffb1' }}>
            Success! Please confirm your subscription.
          </p>
        )}
        {status === 'ERROR' && (
          <p css={{ fontSize: '0.5em', color: '#ffcaca' }}>
            Oops, Something went wrong! Try again.
          </p>
        )}
      </div>
    </div>
  )
}
