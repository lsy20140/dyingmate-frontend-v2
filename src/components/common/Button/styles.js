import {css} from 'styled-components'
import { colors } from 'styles/theme/colors';

export const paddingSize = {
  sm: css`
    padding: 0.5rem 0;
  `,
  normal: css`
    padding: 0.75rem 0;
  `,
  lg: css`
    padding: 1rem 0;
  `,
  xl: css`
  padding: 1.125rem 0;
`
}

export const variantStyles = {
  primary: css`
    color: white;
    background-color: ${colors.primary};
  `,
  secondary: css`
    color: white;
    background-color: ${colors.secondary};
  `,
  light: css`
    color: ${colors.gray[800]};
    background-color: ${colors.light};
  `,
  empty: css`
    color: ${colors.gray[500]};
    background-color: ${colors.empty};
  `
};