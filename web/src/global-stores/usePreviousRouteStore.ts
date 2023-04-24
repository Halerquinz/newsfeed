import { create } from "zustand";
import { combine } from "zustand/middleware";

type Route = string;

export const usePreviousRouteStore = create(
  combine(
    {
      route: "http://localhost:3000/dash" as Route,
    },
    (set) => ({
      setRoute: (route: Route) => set({ route }),
    })
  )
);
