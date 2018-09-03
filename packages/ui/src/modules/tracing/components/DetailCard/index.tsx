import React from 'react'
import styled from 'styled-components';

export enum DetailCardPosition {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  BOTTOM = 'BOTTOM',
}

interface ILayout {
  width: string;
  height: string;
  right: string;
  left: string;
  bottom: string;
  top: string;
}

interface ITranslate {
  x: number;
  y: number
}

interface IWrapperProps {
  show: boolean;
  layout: ILayout
  translate: ITranslate
}

const Wrapper = styled.div<IWrapperProps>`
  width: ${(props) => props.layout.width};
  height: ${(props) => props.layout.height};
  right: ${(props) => props.layout.right};
  left: ${(props) => props.layout.left};
  bottom: ${(props) => props.layout.bottom};
  top: ${(props) => props.layout.top};
  background-color: #222;
  transform: ${(props) => `translate(${props.translate.x}px, ${props.translate.y}px)`};
  transition: transform 1s;
  position: absolute;
  z-index: 999;
`

const getLayoutForPosition = (position: DetailCardPosition) => {
  switch (position) {
    case DetailCardPosition.BOTTOM:
      return {
        width: '100%',
        height: '300px',
        right: 'inherit',
        left: 'inherit',
        bottom: '-300px',
        top: 'inherit',
      }
    case DetailCardPosition.RIGHT:
      return {
        width: '300px',
        height: '100%',
        right: '-300px',
        left: 'inherit',
        bottom: 'inherit',
        top: 'inherit',
      }
    case DetailCardPosition.LEFT:
      return {
        width: '300px',
        height: '100%',
        right: 'inherit',
        left: '-300px',
        bottom: 'inherit',
        top: 'inherit',
      }
  }
}

const getTranslateForPosition = (show: boolean, position: DetailCardPosition): ITranslate => {
  if (!show) {
    return {
      x: 0,
      y: 0,
    }
  }
  switch (position) {
    case DetailCardPosition.BOTTOM:
      return {
        x: 0,
        y: -300,
      }
    case DetailCardPosition.RIGHT:
      return {
        x: -300,
        y: 0,
      }
    case DetailCardPosition.LEFT:
      return {
        x: 300,
        y: 0,
      }
  }
}

export interface IProps {
  show: boolean
  position: DetailCardPosition,
}

export const DetailCard: React.SFC<IProps>  = ({
  show,
  position,
  children,
}) => (
  <Wrapper
    show={show}
    layout={getLayoutForPosition(position)}
    translate={getTranslateForPosition(show, position)}
  >
    {show && children}
  </Wrapper>
)
