import { Children } from 'react'

const RE = /{([\d,-]+)}/

export function calculateLinesToHighlight(meta) {
  if (RE.test(meta)) {
    const lineNumbers = RE.exec(meta)[1]
      .split(',')
      .map(v => v.split('-').map(y => parseInt(y, 10)))
    return index => {
      const lineNumber = index + 1
      const inRange = lineNumbers.some(([start, end]) =>
        end ? lineNumber >= start && lineNumber <= end : lineNumber === start
      )
      return inRange
    }
  } else {
    return () => false
  }
}

export function fixOrphans(children) {
  if (typeof children === 'string') {
    const words = children.split(' ')
    if (words.length <= 1) {
      return words.join(' ')
    } else {
      return words.reduce(
        (sentence, word, index) =>
          index === words.length - 1
            ? `${sentence}\u00A0${word}`
            : `${sentence} ${word}`,
        ''
      )
    }
  } else {
    const grandChildren = Children.toArray(children)
    return grandChildren.map((child, index) =>
      index === grandChildren.length - 1 ? fixOrphans(child) : child
    )
  }
}
