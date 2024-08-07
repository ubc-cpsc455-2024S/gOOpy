# Group 08 - gOOpy

This ain't your grandma's 3D modeling software! With gOOpy you can create wild shapes and watch in fascination as they gOOp together with ray marching! Join our vibrant community of gOOpers, view their artworks, and get gOOpy today!

![Deploy](https://github.com/ubc-cpsc455-2024S/gOOpy/actions/workflows/deploy.js.yml/badge.svg)

## Goals:

## Project task requirements:

🟩 - Completed
🟨 - Partially
🟥 - Incomplete

### minimal requirements:

-   [x] 🟩 Ability to add SDF primitives (spheres, boxes, etc) to the scene.
-   [x] 🟩 Serialize Scene Data for saving
-   [x] 🟩 Scene Editor / Renderer
-   [x] 🟩 Update the values of objects in real-time
-   [x] 🟩 Allows user-saved models to be retrieved on login

### “standard” requirements:

-   [x] 🟩 Download image renderings
-   [x] 🟩 Tutorial to teach users how to user the tool
-   [x] 🟩 See other user’s scenes

### stretch requirements:

-   [x] 🟩 Strong authentication
-   [x] 🟩 Reactive/mobile friendly home page
-   [x] 🟩 Users are navigated around website in a natural way
-   [ ] 🟨 "Explore Page" style page
-   [ ] 🟨 A fleshed out materials system
-   [ ] 🟥 Move camera w/ controls
-   [ ] 🟥 User’s can like and comment on other user’s posts.
-   [ ] 🟥 Click and drag items to move them

## How we are using each technology

### HTML and CSS

The styling of the whole main page is responsive, and the logo animation is also shifted and displayed differently depending on if you're in mobile or desktop view.

### React

We used React to build out all the client side components and logic. Our most complex component is the editor.

React allows us to build a user interface with complex state updates and interactions. We use a library called React Three Fiber that gives us special react hooks to interact with the Three.js rendering system.

### Redux

Redux is used to manage global state. In this project, we use redux to manage user information. When a user logs in, we store that information in redux and use it to display on our user page.

### Node & Express

We use Node.js and Express to create RESTful API endpoints to handle user authentication, user information, as well as scene saving / retrieval. Backend endpoints feature error handling in case our database features fail to load for any reason. We use express-session to temporarily store information about the logged in user.

### MongoDB

We are using MongoDB to store our user data, our session data, and scene data. The "BSON" Format of MongoDB allows for easy implementation with our JSON scenes, compared to a relational database which would need more work to convert to different tables. Our scene data contains attributes like shapes, skybox colour, skybox light colour, ambient intensity, and metadata. Shapes is a list of "shape" type, which each contain information about what type of object it is as well as other parameters to describe it's position and features.

### Github Actions & Render.com

We deployed out frontend and backend to Render.com, and set up github actions to trigger deployments. Then we set up a badge in our readme to show that the deployments are set up. This CI/CD pipeline allows our deployed webpage to always contain our most up to date changes. Render.com is a good choice for us right now due to ease of use and cost, but it suffers from cold start issues, so we plan on switching to something else in the future.

## Above and Beyond Functionality

### Raymarching

The raymarching is implemented in `/gOOpy-frontend/public/shaders/raymarching.fs.glsl`.

This project uses a unique rendering technique called "raymarching". For each pixel, we cast a ray into the scene to check for collisions. Unlike raytracing which finds intersections of rays with polygons, raymarching (in our implementation) figures out the distance to the nearest shape, and then takes small steps until it hits the surface. This might sound inefficient, but it allows for some very fun new possibilities.

But how does it find the nearest distance to the surface? You can do this using a _signed distance function_. A signed distance function (or SDF) is a function that takes in an input and returns a distance to the surface. You can learn more, and see some examples [here](https://iquilezles.org/articles/distfunctions/).

So, at each step of the raymarching, we find the minimum value of all the SDFs. This gives us the maximum step size without passing through a shape. The ray will "march" to that point, and then check again. When the distance is very close to zero, we have hit a shape, and we render a surface at this point.

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Visualization_of_SDF_ray_marching_algorithm.png/2880px-Visualization_of_SDF_ray_marching_algorithm.png" width="500px">

Source: [Wikipedia](https://en.wikipedia.org/wiki/Ray_marching#/media/File:Visualization_of_SDF_ray_marching_algorithm.png)

When we render a surface, we need some more information to calculate the lighting. Specifically, the need the surface normal. This is a vector that is orthogonal to a surface. Imaging spikey hair pointing straight outwards. We can calculate this from the SDF by sampling a few nearby points and using central differences. You can learn more about this [here](https://iquilezles.org/articles/normalsSDF/).

### gOOpiness

You might be wondering what is special about raymarching and signed distance functions. Well, they allow you to do some pretty unique effects. In our case, we are using a concept called "smooth minimum". In simple terms, it finds the minimum while smoothing around the edges. This technique allows shapes to "blend" or "gOOp" together. You can read more about it [here](https://iquilezles.org/articles/smin/).

There are other cool things you can do with SDFs. For example, you could make a shape defined by the intersection of two other shapes. You can also "subtract" from a shape using another shape. These are not currently implemented in gOOpy, but we plan on implementing it some day.

### WebGL and React

There were two requirements for our Editor that needed a special solution.

1. Users can add an arbitrary number of shapes in the scene
2. Users can select multiple types of shapes in their scene

The first one was a challenge because WebGL/Three.js require that the values passed to the shader are static in size. To solve this, we simply create a large fixed-size array that we fill with our shape data. Then we only need to loop over the existing shapes withing that array. Note that WebGL requires that we fill the array with data even if it's not used.

For the second one, this is a problem that would often be solved with some type of polymorphism. However, GLSL does not support polymorphism. So instead, all of our shape objects have a "type" attribute that contains the type ID. Then the raymarching step can check a different SDF based on the type.

### Configuration and adding new shapes

There are many types of shapes that we could include in our project, but right now we only have a small subset. We created a streamlined way to add new shapes in the future, in order to reduce tech debt.

To add a new shape:

1. Modify the raymarching shader function to include the new SDF, define the shape ID, and include it in the switch statement.
2. Modify the config file to add the shape ID, then add an entry to the shape properties array to specify how certain sliders should affect the shape data. The shape ID in the shader must match the shape ID in the config file.

The frontend will automatically pick up the new shape and it will be usable in the editor.

### Animated logo

We created an animated logo using our rendering system. This logo is available at the `/goopy` route, if you want to see it in the renderer. However, when we use it on the main page we don't want to use the renderer for performance reasons. For this reason, we have created a webm video of the animation that we display on the homepage.

### Google login

We have implemented Google Login, allowing users to seamlessly save their scenes to their existing Google accounts. This process ensures that we are able to handle user information in a secure way that is able to be scaled in the future.

### User flow

We have been very intentional in the design of our user flow, with the goal of lowering barriers to onboarding. We allow users to open the editor and make their scene without logging in. Then, users can click save. If they're logged in, their scene will get saved to their account. If they're not logged in, they will get redirected to the login page. At the same time we automatically save their scene so their creation isn't lost while logging in, after logging in, they get redirected back to the editor. This is a smooth user experience to help encourage people to make accounts.

## Next Steps

We have many plans for this project, including:

1. "Explore page" allowing users to browse scenes
2. Improve editor styling (scene placement)
3. Camera movements
4. Likes and comments on scenes
5. Click and drag items to move them
6. More detailed materials system
7. Update Google login (current technique will be deprecated soon)
8. Per-shape colours
9. Improve security
10. Ability to duplicate scene
11. More SDF functions (ie intersection)
12. An in-depth, interactive tutorial

## Contributions

### Shiyu Li

I worked on setting up Express endpoints, designing MongoDB schemas and incorporating it into our project, I also implemented user session and login using OAuth 2.0 and worked on styling and refactoring the editor.

### Aiden Kerr

I implemented the raymarching rendering that allows the scenes to be visible and update in real time, and I integrated it into the editor. I worked on various parts of the editor, including the shape properties configuration described above. I also worked on the deployment, some frontend styling, as well as various other small things in the backend.

### Jacob Lacsamana

I worked on designing and building the GUI for the editor, creating controls for the scene's environment and component objects, and integrating them with the renderer. Additionally, I worked on designing and tuning the layout and styling of the editor view to increase responsiveness. I also worked on creating new endpoints and extending the functionality of existing ones, and integrating them with various parts of the frontend.

### Matthew Wan

My main contributions were the creating the main page, tutorial, user page, creating express endpoints and structuring our database. I designed and coded the main page and tutorial with animations and demos that I recorded myself, and making the styling reactive. For the backend endpoints, I used mongoose to create many of the queries we use to fetch information to the user and setup many of the express endpoints for the users and scenes, including formatting the data to be stored.

## References

-   Ray Marching concepts, Nico
    -   [link](https://barradeau.com/blog/?p=575)
-   Smooth Minimum, Inigo Quilez
    -   [link](https://iquilezles.org/articles/smin/)
-   SDF Normal Vectors Calculations, Inigo Quilez
    -   [link](https://iquilezles.org/articles/normalsSDF/)
-   React help
    -   [link](https://stackoverflow.com/questions/55987953/how-do-i-update-states-onchange-in-an-array-of-object-in-react-hooks)
-   HeroIcons (SVGs)
    -   [link](https://heroicons.com/)
