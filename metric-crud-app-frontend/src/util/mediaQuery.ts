import facepaint from "facepaint";

export const breakpoints = { md: 640, lg: 1440 };
export const mq = facepaint(Object.values(breakpoints).map((bp) => `@media (min-width: ${bp}px)`));
