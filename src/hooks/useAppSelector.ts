import { useSelector } from 'react-redux';
import { TypedUseSelectorHook } from 'react-redux';

import { StoreState } from 'reducers';

export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector