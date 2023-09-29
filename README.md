# Binh Nguyen - Frontend Take Home Exercise 

Thanks for checking this out. Just jotting down a few thoughts and cataloging what I would have done given more time:

- Even for a small project I would opt to use React and potentially Next.js just to make some things a lot easier. Especially with the "university block" component, it is just tedious to create that dynimcally using the DOM API as opposed to being able to use a React component. This would also simplify and optimize the search functionality by using hooks/context and allowing React to handle the show/hide behavior based on search. 

- Would add some more responsive styles, potentially putting the nav items in drawer/menu.

- I think for a page this simple most of a11y considerations are handled, but potentially would look into putting a hidden <label> tag for the Search input (although I think that is covered by the aria-label attribute included)
