import React, { useRef } from 'react'
import styled from 'styled-components';

import Sprite from 'assets/img/sprite.svg';

import useMenu from 'hooks/useMenu';

const MenuWrapper = styled.div`
  width: 16px;
  height: 30px;
  `

const Toggler = styled.button`
  width: 16px;
  height: 30px;
  border: none;
  background-color: transparent;
`

const DropdownIcon = styled.svg`
  width: 16px;
  height: 30px;
  fill: #333;
`

const DropdownMenu = styled.div`
  position: absolute;
  right: 0;
  top: 30px;
  box-shadow: 0 2px 4px #999;
  border-radius: 3px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

const MenuItem = styled.button`
  min-width: max-content;
  text-align: left;
  border: none;
  padding: 6px 8px;
  font-size: 12px;
  color: #444;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  
  &:hover {
    background-color: rgb(240, 240, 240);
  }
`

function Menu({ items, ...props }: {
  items: [string, Function][]
}) {

  const menuRef: React.RefObject<HTMLDivElement> = useRef(null);
  const btnRef: React.RefObject<HTMLButtonElement> = useRef(null);

  const [show] = useMenu(menuRef, btnRef);

  return (
    <MenuWrapper {...props} >
      <Toggler ref={btnRef}>
        <DropdownIcon>
          <use xlinkHref={`${Sprite}#icon-dots-three-vertical`} />
        </DropdownIcon>
      </Toggler>
      {
        show &&
        <DropdownMenu ref={menuRef}>
          {
            items.map((item) => {
              return <MenuItem key={item[0]} onClick={() => { item[1]() }}>{item[0]}</MenuItem>
            })
          }
        </DropdownMenu>
      }
    </MenuWrapper>
  )
}

export default Menu