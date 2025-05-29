Pros:
- able to spin up a basic react client quickly

Cons:
- Asked it to not import all of React, it was not able to resolve the issue.
  - got into a circular pattern of adding the whole import, then me telling it not to, then it seeing the tsconfig was correct, then adding the whole import again
  - actual issue: TSconfig file was not picking up the TSX files (I had it only looking at .ts files)