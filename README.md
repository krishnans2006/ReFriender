# ReFriender

[![wakatime](https://wakatime.com/badge/github/krishnans2006/ReFriender.svg)](https://wakatime.com/badge/github/krishnans2006/ReFriender)

https://www.youtube.com/watch?v=XxutOuYRz9M

## Inspiration
The theme of restoration is usually connotated with tangible things such as the environment. In this project, though, we wanted to take a creative approach by restoring one of the most meaningful things in our life: our social connections. Everyone has old friends that they lost their touch with, or people they could not really get to know. ReFriender has born as a solution to this. With its advanced algorithm to find the user's old connections using their current ones, ReFriender is an app for everyone that wants to get back in touch with their old friends to see what they are up to. Especially during the pandemic where people may feel lonely, ReFriender is THE app to spark some new (or reborn the old) connections.

## What it does
Our algorithm to find the old friend's of the user was an essential component of this project that we are proud of. The algorithm works by first getting the user's friend (in other words, first degree of separation) either through Facebook API (had it allowed developer's to get user's friend list without Facebook reviewing our app for 5 days) or through getting the user's location and making them confirm their friend(s) on the app. Then, the algorithm checks the friends of the user's friends (second degree of separation), and we consider these people to be "potential old friends (or never got to meet in detail)" of the user. The more shared friends the user has with those that are separated by two degrees (friends' friends), the higher weight those people have. Hence, our algorithm displays the people with most mutual friends the user has, but those that are not actually a friend of the user. The user then decides whether the person actually is an old friend of them, and the algorithm updates accordingly.
When the user chooses a person as their old friend, they get to start a conversation with that person to see what they have been up to using the app's chat function. The user is also able to edit their profile to update their information, such as the school they go to.

## How we built it

### Backend
The backend was designed using Python Flask and the Firebase Firestore Admin SDK, in order to provide a REST API for interacting with the Cloud Firestore Database. The Cloud Firestore database was used to store user data and chat history, and the Flask API will interact with this NoSQL database to provide useful functions for the frontend. Facebook API has been limited due to Facebook's new policy that requires a review by Facebook, which may take 5 days and not possible during our Hackathon.

### Frontend
The frontend is developed in React. Using hooks and components, the React frontend uses react-router-dom to navigate through pages and provide different types of functionality to the site. It also features dynamic content and live updating, using a connection to the backend.

## Challenges we ran into
The whole project composed of little challenges in which we improved ourselves tremendously within the span of 36 hours. Trying to think of an algorithm that would accurately find a user's old friend was one challenge, trying to implement it first to Python and then to JavaScript was another. Basically, using Python as a backend and React as the frontend itself was one of the biggest challenges we had, but overcoming that was the biggest satisfaction we had as well.
Finally, recent changes in Facebook and Instagram API has hindered and limited our project. Facebook API, in order to get the list of friends a user has, requires the app to be reviewed, which takes at least 5 days so not possible within this hackathon. If we were able to use the Facebook API, we would be able to get the first contact of the users immediately, which would make the finding old friend algorithm much more accurate.

## Accomplishments that we're proud of
We are proud of integrating Python Flask backend with React frontend, a concept that we will be using from now on as well. We are also proud of actually coming up with an accurate algorithm that can find the old friends of a user, and making this algorithm self-updating (using knowledge obtained by connections between the friends of the user with other people) made the accuracy only go higher.

## What we learned
Since half of our team consisted of Python developers and the other half with React / JavaScript developers, we learnt to integrate a Python backend with React frontend, something none of us ever attempted to try before. Now that we can integrate backend and frontend with different languages, a new window of opportunity has opened to us in future projects we will make, whether it's in Hackathon or not. Basically, this project allowed us to overcome the biggest challenge between programmers: the difference in languages that we have expertise in. Adding to our Log-in and Sign-in knowledge, we learnt to how to make a Chat app and how to make a person suggesting app like Tinder (although our concept is completely different) within the scope of 36 hours, so it was tiresome yet rewarding. Finally, although limited by its full capability due to its recent privacy term conditions, we were still able to implement Facebook API to our project, and that was something new to us. We learnt to get user information through Facebook, and after being approved by Facebook to use their advanced API, we have a clear idea of how to improve our app.

## What's next for ReFriender
We are very proud of what we have accomplished within this Hackathon's time limit. We have login/signin/profile sections, a functioning chat part, and our algorithm works as intended. The fact that advanced Facebook API functions require a review by Facebook that takes 5 minutes has limited our app's old-friend-finder accuracy, as we couldn't get acces to the user's friend list. What's next for ReFriender, then, is to implement this feature after our app is approved by Facebook. Styling improvements are possible as always. 
