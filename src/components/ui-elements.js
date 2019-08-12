/** @jsx jsx */
import { jsx } from '@emotion/core'

function getTemplateValue(value) {
  return value
    ? value.constructor === Array
      ? value.join(' ')
      : value
    : undefined
}

export function Grid({
  as: Tag = 'div',
  children,
  autoColumns,
  autoRows,
  columns,
  rows,
  columnStart = 0,
  columnEnd = 0,
  rowStart = 0,
  rowEnd = 0,
  alignment,
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  padding,
  margin,
  spacing,
  fill,
  stroke,
  strokeWeight = 1,
  radius,
  ...props
}) {
  return (
    <Tag
      {...props}
      css={{
        display: 'grid',
        gridGap: spacing,
        gridAutoRows: autoRows,
        gridAutoColumns: autoColumns,
        gridTemplateColumns: getTemplateValue(columns),
        gridTemplateRows: getTemplateValue(rows),
        gridColumnStart: columnStart,
        gridColumnEnd: columnEnd,
        gridRowStart: rowStart,
        gridRowEnd: rowEnd,
        alignItems: alignment,
        backgroundColor: fill,
        border: stroke ? `${strokeWeight}px solid ${stroke}` : undefined,
        borderRadius: radius,
        width,
        height,
        minWidth,
        minHeight,
        maxWidth,
        maxHeight,
        padding,
        margin,
      }}
    >
      {children}
    </Tag>
  )
}

export function XStack({
  as: Tag = 'div',
  children,
  autoColumns = 'minmax(min-content, max-content)',
  columns,
  columnStart = 0,
  columnEnd = 0,
  rowStart = 0,
  rowEnd = 0,
  alignment,
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  padding,
  margin,
  spacing,
  fill,
  stroke,
  strokeWeight = 1,
  radius,
  ...props
}) {
  return (
    <Tag
      {...props}
      css={{
        display: 'grid',
        gridAutoFlow: 'column',
        gridAutoColumns: autoColumns,
        gridTemplateColumns: getTemplateValue(columns),
        gridColumnStart: columnStart,
        gridColumnEnd: columnEnd,
        gridRowStart: rowStart,
        gridRowEnd: rowEnd,
        gridGap: spacing,
        alignItems: alignment,
        backgroundColor: fill,
        border: stroke ? `${strokeWeight}px solid ${stroke}` : undefined,
        borderRadius: radius,
        width,
        height,
        minWidth,
        minHeight,
        maxWidth,
        maxHeight,
        padding,
        margin,
      }}
    >
      {children}
    </Tag>
  )
}

export function YStack({
  as: Tag = 'div',
  children,
  autoRows = 'minmax(min-content, max-content)',
  rows,
  columnStart = 0,
  columnEnd = 0,
  rowStart = 0,
  rowEnd = 0,
  alignment,
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  padding,
  margin,
  spacing,
  fill,
  stroke,
  strokeWeight = 1,
  radius,
  ...props
}) {
  return (
    <Tag
      {...props}
      css={{
        display: 'grid',
        gridAutoFlow: 'row',
        gridAutoRows: autoRows,
        gridTemplateRows: getTemplateValue(rows),
        gridColumnStart: columnStart,
        gridColumnEnd: columnEnd,
        gridRowStart: rowStart,
        gridRowEnd: rowEnd,
        gridGap: spacing,
        justifyItems: alignment,
        backgroundColor: fill,
        border: stroke ? `${strokeWeight}px solid ${stroke}` : undefined,
        borderRadius: radius,
        width,
        height,
        minWidth,
        minHeight,
        maxWidth,
        maxHeight,
        padding,
        margin,
      }}
    >
      {children}
    </Tag>
  )
}

export function Divider({
  axis,
  fill,
  size,
  columnStart,
  columnEnd,
  rowStart,
  rowEnd,
  ...props
}) {
  return (
    <div
      {...props}
      css={{
        [axis === 'x' ? 'width' : 'height']: '100%',
        [axis === 'x' ? 'height' : 'width']: size,
        gridColumnStart: columnStart,
        gridColumnEnd: columnEnd,
        gridRowStart: rowStart,
        gridRowEnd: rowEnd,
        backgroundColor: fill,
      }}
    />
  )
}

export function Spacer() {
  return <div />
}

const levelSizeMap = {
  1: 'xl',
  2: 'lg',
  3: 'md',
  4: 'sm',
  5: 'xs',
}

export function Heading({ level, size, color, weight, ...props }) {
  const headingSize = size || levelSizeMap[level]
  return jsx(`h${level}`, {
    css: {
      fontSize: headingSize ? `var(--fontSizes-${headingSize})` : undefined,
      fontWeight: weight ? `var(--fontWeights-${weight})` : undefined,
      color: color ? `var(--colors-${color})` : undefined,
    },
    ...props,
  })
}

export function Text({ size = 'md', color, weight, ...props }) {
  return jsx(`span`, {
    css: {
      fontSize: size ? `var(--fontSizes-${size})` : undefined,
      fontWeight: weight ? `var(--fontWeights-${weight})` : undefined,
      color: color ? `var(--colors-${color})` : undefined,
    },
    ...props,
  })
}

export function Image({ source, description, ...props }) {
  return jsx(`img`, {
    src: source,
    alt: description,
    ...props,
  })
}
