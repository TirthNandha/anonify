# Challenges in hand: 

## Q. How will I validate that email id is the college email id?
    - Abstract API can be a good solution to this but i don't know anything about that so lets try at the time of backend implementation and see what happen.
## Q.  How to verify email using otp:
    - We can use a third party service like Nexmo or Twilio to send OTP to the
    user's email and then verify it. But this will add extra cost to the project.
    - Another way is to use a library like nodemailer to send email and then verify it. 
### Q.  At this point I don't know how to redirect to a specific page when some element is clicked so have to figure that out.
    - using useNavigate from react-router-dom
### Problems to address in future
    1. when the user clicks in send otp button its email and username is getting saved in the db even if he don't enter the otp there might be the case that now when user login using the email he'll able to do even if he haven't signed up bcoz bcoz his email is in db.
    - Solution: If he don't enter otp within certain time period his entry will be deletd from the db.