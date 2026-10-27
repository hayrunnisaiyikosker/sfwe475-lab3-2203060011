## with the default 800ms delay, what will the screen show for the first 800 milliseconds?
  For the first 800 ms the screen shows "Loading tasks...", because status starts as "loading" and 5it will resolves after the delay.
  "my guess is correct"

## Empty and error need to be two separate states instead of one “something's wrong” state.
  In empty situation the system work well, just there is no any data to show. the user must add new duty. but in error situation something is broke and data didn't take and the user can understand that "i don't have any duty or assume that data deleted". There is the only way that to try again. if we gave us these two messages at the same time the can go wrong way.