1. what is the difference between title (a prop) and done (now state)? Why can TaskCard change one but not the other?
  The prop comes from outside, so the card can only read it. The state is inside the card and can be changed with `setDone`. The parent owns the prop, so only the parent can change it. The card owns the state, so the card can change it.

2. why using the map() callback's array index (e.g. key={index}) instead of task.id is risky if the list can be reordered or filtered?
  React matches cards by their position in the list, not by their identity. When the order changes, one card's state can end up on the wrong card. Using `task.id` as the key avoids this, because each task keeps the same identity.

3. Then, as a quick experiment, temporarily remove the onChange handler and try typing again — note what happens in.
  When there is no onChange, I couldn't type anything, because the state does not change and the input always shows the empty value in the state.

4. which component owns the state, which component asked for the change, and how the request got from one to the other.
  TaskBoard owns the state, and NewTaskInput asks it to change.NewTaskInput calls `onAddTask`, which means `handleAddTask` in TaskBoard. TaskBoard updates the state with `setTasks`, and the new task flows down to TaskList as a prop, and the new card is drawn.