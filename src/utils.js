import { Children } from 'react'

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
