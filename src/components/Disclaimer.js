/** @jsx jsx */
import { jsx } from '@emotion/core'

function Disclaimer({ children }) {
  return (
    <div
      css={{
        fontSize: '0.65em',
        padding: '1em',
        borderRadius: '0.25em',
        backgroundColor: '#a27613',
        code: {
          backgroundColor: 'inherit',
          color: 'inherit',
        },
      }}
    >
      {children}
    </div>
  )
}

export default Disclaimer
