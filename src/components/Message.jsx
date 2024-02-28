import React, { useMemo } from 'react'
import {animated, useTransition} from 'react-spring'
import styled from 'styled-components';

export default function Message({text, trail, onMessageEnded, forceShowFullMessage}) {
  const items = useMemo(() => 
     text && text.trim().split("").map((letter, idx) => ({
      item: letter, 
      key: idx
    })),
    [text]
  );

  const transitions = useTransition(items, {
    trail,
    from: { display: 'none' },
    enter: { display: '' },
    onRest: (status, controller, item) => {
        if (item.key === items.length - 1) {
            onMessageEnded();
        }
    },
});


  return (
    <ContentWrapper>
      {forceShowFullMessage && (
          <span>{text}</span>
      )}
      {!forceShowFullMessage && transitions((styles, { item, key }) => (
          <animated.span key={key} style={styles}>
              {item}
          </animated.span>
      ))}
    </ContentWrapper>
  )
}

const ContentWrapper = styled.div`
  span{
    color: white;
    white-space: pre;
    font-size: 1.25rem;
  }
`