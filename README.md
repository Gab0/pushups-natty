# pushups

http://www.hundredpushups.com/

https://www.self.com/gallery/5-minute-plank-workout

# Goals

- Provide an excercise platform with usability on par with what is seen in Android apps on Google Play.
- Learn something about biomechanics and correct exercise movements, by displaying an humanoid 3D model executing all proposed movements.
- Aggregate effective exercise routines based on existing programs such as "100 pushups".


# TODO

## Usability

- Select Tier/Week/Day for the current exercise program through radio buttons.
- Listen to keyboard keys. `spacebar`/`enter` should trigger the `Go` button. `up`/`down` arrows should select the type of exercise, while `left`/`right` cycle through programs (day/week/etc).

## 3D Models

- Implement a simple `three.js` pane.
- Find a suitable bipedal model and make it do pushups in the animation pane.
- Implement a proper animation skeleton to the model, paving the way to have it doing all kind of movements.

## Exercise Routines

- Define the database format and all required loading functions.
- Design the exercise database and populate it with at least four different exercise types.
- Increment the excercise program list with information about exercises.
- Implement full functionality and visuals for the exercise program list.

