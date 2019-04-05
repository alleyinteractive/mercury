import posed from 'react-pose';

export const ExpandDown = posed.div({
  collapsed: {
    opacity: 0,
    y: '-100%',
    transition: {
      type: 'tween',
    },
  },
  expanded: {
    opacity: 1,
    y: '0',
    transition: {
      type: 'tween',
    },
  },
});

export const ExpandHeight = posed.div({
  collapsed: {
    maxHeight: 0,
  },
  expanded: {
    maxHeight: ({ maxHeight }) => maxHeight,
  },
});
