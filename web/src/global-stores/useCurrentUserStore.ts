import { create } from "zustand";
import combine from "zustand/middleware";


export const useCurrentUserStore = create(combine({user: User}, ) )