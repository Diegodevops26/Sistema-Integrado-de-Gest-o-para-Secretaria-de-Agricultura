import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./index";

// Hook para usar o dispatch do Redux com tipos corretos
export const useAppDispatch: () => AppDispatch = useDispatch;

// Hook para usar o selector do Redux com tipos corretos
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
