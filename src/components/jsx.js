import { jsx as emotionJsx } from '@emotion/core'

// states = new Set()
// not all props should be stateful, we need to specify which ones
// also a component needs to specify which props are styles/functions/etc

const styleProps = ['padding']

function getDisplayValue(hidden, display) {
  return hidden ? 'none' : display === 'none' ? 'block' : display
}

function parseProps({ states, ...props }) {
  if (props.hidden !== undefined) {
    if (props.css) {
      props.css.display = getDisplayValue(props.hidden, props.css.display)
    } else {
      props.css = {
        display: getDisplayValue(props.hidden),
      }
    }
    delete props.hidden
  }

  if (states) {
    Object.keys(states).forEach(stateKey => {
      const stateProps = states[stateKey]
      for (let statePropKey in stateProps) {
        const statePropValue = stateProps[statePropKey]

        // run plugins/transforms here from Babel possibly?

        if (statePropKey.includes(styleProps)) {
          if (props.css) {
            props.css[stateKey] = { [statePropKey]: statePropValue }
          } else {
            props.css = { [stateKey]: { [statePropKey]: statePropValue } }
          }
        }

        if (statePropKey === 'hidden') {
          if (props.css) {
            props.css[stateKey] = {
              display: getDisplayValue(statePropValue, props.css.display),
            }
          } else {
            props.css = {
              [stateKey]: {
                display: getDisplayValue(statePropValue, props.css.display),
              },
            }
          }
        }
      }
    })
  }

  return props
}

export function jsx(type, props, ...children) {
  return emotionJsx(type, parseProps(props || {}), ...children)
}
