/** @jsx jsx */
import { jsx } from '@emotion/core'

export function Logo(props) {
  return (
    <svg viewBox="0 0 120 120" {...props}>
      <path
        fill="#FFF"
        d="M94.58 53.076c-1.622.085-2.838 1.541-2.838 3.165L92 63.578c0 5.523-4.477 10-10 10h-8c-11.356 0-11-17.828-11-17.828a3 3 0 10-6 0s.517 17.828-11 17.828h-8c-5.523 0-10-4.477-10-10l-.259-7.337c0-1.624-1.216-3.08-2.838-3.165a3 3 0 00-3.161 2.996L22 75.901a3 3 0 001.947 2.809l12.578 4.717a3 3 0 011.857 2.082l4.05 13.199a3 3 0 002.91 2.272H47c1.636 0 3.029-1.31 3-2.946a3 3 0 012.999-3.054c1.636 0 3.029 1.31 3 2.946a3 3 0 002.999 3.054h2c1.636 0 3.029-1.31 3-2.946a3 3 0 012.999-3.054c1.636 0 3.029 1.31 3 2.946a3 3 0 002.999 3.054h1.658a3 3 0 002.91-2.272l4.05-13.199a3.003 3.003 0 011.857-2.082l8.701-3.263C93.347 79.725 98 77.151 98 75.901l-.259-19.829a3 3 0 00-3.161-2.996zM67 83.129a2.999 2.999 0 01-4.229.325l-.818-.701a2.996 2.996 0 00-3.904 0l-.818.701a2.999 2.999 0 11-3.904-4.554l4.723-7.048a2.996 2.996 0 013.904 0l4.723 7.048A3 3 0 0167 83.129zM91.212 32.426L78.113 22.163c-10.391-7.921-25.836-7.253-36.227 0L28.788 32.426A18.508 18.508 0 0022 46.75l76 .016v-.016a18.508 18.508 0 00-6.788-14.324z"
      />
      {/* <path
      css={theme => ({ fill: theme.colors.foreground })}
      d="M99.444 22.365l-10.099-8.263c-5.614-4.593-12.7-9.122-19.952-9.122H50.606c-7.252 0-14.338 4.529-19.952 9.122l-10.098 8.263A31.39 31.39 0 009 46.75V75.9c0 6.63 4.172 12.65 10.38 14.981l7.969 2.989 2.593 8.451c1.935 6.869 8.257 11.659 15.4 11.659h29.315c7.143 0 13.465-4.791 15.4-11.659l2.592-8.45 7.969-2.988c6.21-2.331 10.38-8.352 10.38-14.981V46.75a31.38 31.38 0 00-11.554-24.385zM106 75.901c0 4.559-2.867 8.697-7.136 10.3l-10.272 3.852-3.332 10.862a10.985 10.985 0 01-10.602 8.065H73c-2.212 0-4.273-.656-6-1.784a10.935 10.935 0 01-5.999 1.784H59c-2.212 0-4.273-.656-6-1.784a10.935 10.935 0 01-5.999 1.784h-1.658a10.987 10.987 0 01-10.602-8.065l-3.333-10.862-10.271-3.852C16.866 84.597 14 80.458 14 75.901V46.75a26.41 26.41 0 019.723-20.516l10.098-8.263c4.724-3.864 10.685-7.992 16.786-7.992h18.787c6.102 0 12.062 4.128 16.785 7.991l10.1 8.264A26.411 26.411 0 01106 46.75v29.151z"
    /> */}
      <path
        // fill="#00AEEF"
        css={theme => ({ fill: theme.colors.foreground })}
        d="M42.49 68.75c6.797 0 9.401-2.647 9.401-7.068V58.53c0-4.099 0-5.78-10-5.78h-5.294c-2.599 0-4.706 1.265-4.706 3.67v7.433c0 2.405 2.705 4.898 5.304 4.898h5.295zM77.124 68.75c-6.797 0-9.401-2.647-9.401-7.068V58.53c0-4.099 0-5.78 10-5.78h5.294c2.599 0 4.706 1.265 4.706 3.67v7.433c0 2.405-2.705 4.898-5.304 4.898h-5.295z"
      />
    </svg>
  )
}
