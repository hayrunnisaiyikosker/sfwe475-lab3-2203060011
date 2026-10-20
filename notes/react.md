1. what is the difference between title (a prop) and done (now state)? Why can TaskCard change one but not the other?
  The prop comes from outside, so the card can only read it. The state is inside the card and can be changed with `setDone`. The parent owns the prop, so only the parent can change it. The card owns the state, so the card can change it.

2. why using the map() callback's array index (e.g. key={index}) instead of task.id is risky if the list can be reordered or filtered?
  React matches cards by their position in the list, not by their identity. When the order changes, one card's state can end up on the wrong card. Using `task.id` as the key avoids this, because each task keeps the same identity.