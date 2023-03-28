import React, { HTMLAttributes, useContext, useState } from 'react'

import Sprite from 'assets/img/sprite.svg';
import { NavigateContext } from 'context';

function SearchRecordings(props: HTMLAttributes<HTMLFormElement>) {
  const navigate = useContext(NavigateContext);
  const [searchText, setSearchText] = useState('');
  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        if (searchText !== '') {
          navigate(`/search/${searchText}`);
          setSearchText('');
        }
      }} {...props} className={`relative flex items-stretch px-1 bg-slate-800 rounded ${props.className}`}>
      <input
        className="bg-transparent p-2 text-sm text-slate-400 outline-0 w-full"
        placeholder="Search recordings, accounts etc..."
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button className="right-0 pr-1">
        <svg className="w-4 h-4 fill-slate-600">
          <use xlinkHref={`${Sprite}#icon-search`} />
        </svg>
      </button>
    </form>
  )
}

export default React.memo(SearchRecordings);