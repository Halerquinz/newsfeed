import { TransitionOptions, Url } from "next/dist/shared/lib/router/router";

export const redirectToProfile = (
  e: React.SyntheticEvent<EventTarget>,
  userId: number,
  push: (
    url: Url,
    as?: Url | undefined,
    options?: TransitionOptions | undefined
  ) => Promise<boolean>
) => {
  e.stopPropagation();
  push(`/u/${userId}`);
};
