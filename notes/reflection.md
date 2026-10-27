4. Why can't FilterBar and TaskList share filter state directly, without lifting it to a shared parent?
  They can't share the filter directly. Because both of them are siblings, and one of them (FilterBar) changes the state while the other one (TaskList) reads it, so the common parent, TaskBoard, has to hold the state.

5. What would go wrong, specifically, if TaskList used the array index as each TaskCard's key instead of task.id?
  For example, we have a list [A, B, C] and the keys are 0, 1, 2. If we take A off the list, the others move up. React says there is still a card number 0, but this card is not the same as before: it used to have A inside. In this state, the checked checkbox moves to B, which means that when the order changes, React matches the cards wrongly and the state moves to the wrong place. When we use task.id as the key, each task keeps its own id, so this does not happen.

6. In the sentence "props flow down, requests flow up," what in your TaskBoard app is an example of each direction?
  Props flow down, requests flow up. Think of a tree: TaskBoard is at the top, and the data always goes down, from TaskBoard to TaskList to TaskCard. The top component says "take this data and show it", and the lower component can only read it. The lower component cannot change the data. Instead, it calls a function to ask "can you change this?", and the change is always made by the top component. For example, `tasks` flows down from TaskBoard to TaskList as a prop, and `onToggleTask` is a request that goes up from TaskCard to TaskBoard when a checkbox is clicked.


## Last Lab Activity

7. Empty List vs Error (Strand 1)
  An empty list means there is no task to show, but the system works correctly. An error means something went wrong while getting the data. The empty state should tell the user to add a new task, but the error state should explain the problem and give a retry option.

8. Field-Specific Validation (Strand 2)
  We store errors in errors.title because the error belongs to the title field. This helps the user understand which field has a problem and fix it easily. If we show only one error message for the whole form, the user may not know what they need to change.

9. aria-live and Loading Messages (Strand 3)
  aria-live helps screen readers announce changes on the page. A sighted user can see the loading message, but a screen reader user may not notice the change automatically. With aria-live, the user can hear that the system is loading data.


## AI URL
  https://claude.ai/share/3eb84f39-cb81-4fd1-b041-830225ce3dac

  https://claude.ai/share/d5bd38a6-2f44-4c48-a3bb-e0a96de9e026