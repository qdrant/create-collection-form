import React from "react";

/**
 * Default scrollable parent resolver.
 *
 * Kept as a single module-level function on purpose: the resolver is used as an
 * effect dependency by consumers (see Repeatable.jsx), so it must keep a stable
 * identity across renders, otherwise those effects re-run on every render.
 *
 * @returns {Window}
 */
export const defaultScrollableParent = () => window;

export const ScrollableParentContext = React.createContext({
  scrollableParent: defaultScrollableParent,
});

export const useScrollableParent = () => {
  const context = React.useContext(ScrollableParentContext);
  if (context === undefined) {
    throw new Error(
      "useScrollableParent must be used within a ScrollableParentProvider",
    );
  }
  return context.scrollableParent;
};
