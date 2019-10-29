import { css } from '@emotion/core'
import camelToKebabCase from 'camel-to-kebab'

const createdProperties = new Set()

export function createProperty(prop, value) {
  return `--${camelToKebabCase(prop)}-${camelToKebabCase(value)}`
}

export function getProperty(prop, value) {
  return prop && value
    ? `var(--${camelToKebabCase(prop)}-${camelToKebabCase(value)})`
    : undefined
}

function parseThemeValue(themeValue) {
  let properties = {}
  for (let themeValueKey in themeValue) {
    const props = themeValue[themeValueKey]
    for (let propKey in props) {
      const propValue = props[propKey]
      if (!createdProperties.has(propKey)) {
        createdProperties.add(propKey)
      }
      properties = {
        ...properties,
        [createProperty(themeValueKey, propKey)]:
          typeof propValue === 'number'
            ? `${propValue}px`
            : createdProperties.has(propValue)
            ? getProperty(themeValueKey, propValue)
            : propValue,
      }
    }
  }
  return properties
}

export function getThemeStyles(theme) {
  const styles = {}
  for (let themeBreakpoint in theme) {
    const [query, value] = theme[themeBreakpoint]
    styles[query] = parseThemeValue(value)
  }
  return css(styles)
}
