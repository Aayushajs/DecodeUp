import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../app/store';

/**
 * Typed version of useDispatch for our store.
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

/**
 * Typed version of useSelector for our store.
 */
export const useAppSelector = useSelector.withTypes<RootState>();
