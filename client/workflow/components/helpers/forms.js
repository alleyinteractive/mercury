import { css } from 'styled-components';
import colors from 'css/colors';

export const input = css`
  border: 1px solid ${colors.grayLight};
  height: 42px;
  width: 100%;

  &:hover,
  &:focus {
    border: 1px solid ${colors.primary};
    box-shadow: none;
    outline: 1px solid ${colors.primary};
    outline-offset: 0;
  }
`;

export const select = css`
  border-radius: 0;
`;

export const label = css`
  font-size: 12px;
  font-weight: 700;
  margin-right: 5px;
  text-transform: uppercase;
`;

export const secondaryLabel = css`
  display: inline-block;
  font-size: 10px;
  font-weight: 400;
  text-transform: uppercase;
`;
