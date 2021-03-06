class SessionsController < Devise::SessionsController
  def new
    history1 = {contact_id: 3, type: "twitter", id: 1, icon: "twitter.png", text: "Just found out about an awesome new fashion service! Check it out bit.ly/hsi32k"}
    history2 = {contact_id: 3, type: "gmail", id: 2, icon: "gmail.png", text: "RE: Beta Invitation Request for Threadstop"}
    history3 = {contact_id: 3, type: "twitter", id: 3, icon: "twitter.png", text: "Anyone have good suggestions of where to buy summer clothes?"}
    history_1 = [history1, history2, history3]

    history4 = {contact_id: 3, type: "phone", id: 4, icon: "phone.png", text: "Call on 04/10/13: 47 minutes"}
    history5 = {contact_id: 3, type: "calendar", id: 5, icon: "calendar.png", text: "Interview on 04/03/13"}
    history6 = {contact_id: 3, type: "gmail", id: 6, icon: "gmail.png", text: "RE: Request for an interview with the founder of Threadstop"}
    history_2 = [history4, history5, history6]

    history7 = {contact_id: 3, type: "calendar", id: 7, icon: "calendar.png", text: "Meeting on 02/17/13: Go over terms"}
    history8 = {contact_id: 3, type: "gmail", id: 8, icon: "gmail.png", text: "RE: Interested in investing in a fast paced startup?"}
    history9 = {contact_id: 3, type: "phone", id: 9, icon: "phone.png", text: "Call on 03/20/13: 20 minutes"}
    history_3 = [history7, history8, history9]

    ryan = {timestamp: 1367852889, contact_id: 3, name: "Ryan Lau", picture: "https://api.twitter.com/1/users/profile_image?screen_name=ryanmlau&size=reasonably_small", type: "small-card", tag: "beta", history: history_1}
    heinz = {timestamp: 1367852889, contact_id: 3, name: "Matt Heinz", picture: "https://api.twitter.com/1/users/profile_image?screen_name=heinzmarketing&size=reasonably_small", type: "small-card", tag: "advisor", history: history_1}
    dharmesh = {timestamp: 1367852889, contact_id: 3, name: "Dharmesh Shah", picture: "https://api.twitter.com/1/users/profile_image?screen_name=dharmesh&size=reasonably_small", type: "small-card", tag: "investor", history: history_1}
    dyor = {timestamp: 1367852889, contact_id: 3, name: "Matt Dyor", picture: "https://api.twitter.com/1/users/profile_image?screen_name=mattdyor&size=reasonably_small", type: "small-card", tag: "advisor", history: history_1}
    tim = {timestamp: 1367852889, contact_id: 3, name: "Tim Moody", picture: "https://api.twitter.com/1/users/profile_image?screen_name=timlmoody&size=reasonably_small", type: "small-card", tag: "reporter", history: history_1}
    delian = {timestamp: 1367852889, contact_id: 3, name: "Delian Asparouhov", picture: "https://api.twitter.com/1/users/profile_image?screen_name=mitdelian&size=reasonably_small", type: "medium-card", tag: "reporter", history: history_2}
    aziz = {timestamp: 1367852889, contact_id: 3, name: "Aziz Ansari", picture: "https://api.twitter.com/1/users/profile_image?screen_name=azizansari&size=reasonably_small", type: "medium-card", tag: "beta", history: history_2}
    paul = {timestamp: 1367852889, contact_id: 3, name: "Paul Graham", picture: "https://api.twitter.com/1/users/profile_image?screen_name=paulg&size=reasonably_small", type: "medium-card", tag: "investor", history: history_2}
    jon = {timestamp: 1367852889, contact_id: 3, name: "Jon Froehlich", picture: "https://api.twitter.com/1/users/profile_image?screen_name=jonfroehlich&size=reasonably_small", type: "medium-card", tag: "reporter", history: history_2}
    nate = {timestamp: 1367852889, contact_id: 3, name: "Nate Silver", picture: "https://api.twitter.com/1/users/profile_image?screen_name=fivethirtyeight&size=reasonably_small", type: "medium-card", tag: "reporter", history: history_2}
    buzz = {timestamp: 1367852889, contact_id: 3, name: "Buzz Aldrin", picture: "https://api.twitter.com/1/users/profile_image?screen_name=therealbuzz&size=reasonably_small", type: "medium-card", tag: "beta", history: history_2}
    bill = {timestamp: 1367852889, contact_id: 3, name: "Bill Nye", picture: "https://api.twitter.com/1/users/profile_image?screen_name=thescienceguy&size=reasonably_small", type: "medium-card", tag: "advisor", history: history_2}
    akash = {timestamp: 1367852889, contact_id: 3, name: "Akash Badshah", picture: "https://api.twitter.com/1/users/profile_image?screen_name=akashbad&size=reasonably_small", type: "large-card", tag: "investor", history: history_3}
    john = {timestamp: 1367852889, contact_id: 3, name: "John Resig", picture: "https://api.twitter.com/1/users/profile_image?screen_name=jeresig&size=reasonably_small", type: "large-card", tag: "beta", history: history_3}
    brad = {timestamp: 1367852889, contact_id: 3, name: "Brad Feld", picture: "https://api.twitter.com/1/users/profile_image?screen_name=bfeld&size=reasonably_small", type: "large-card", tag: "investor", history: history_3}
    barack = {timestamp: 1367852889, contact_id: 3, name: "Barack Obama", picture: "https://api.twitter.com/1/users/profile_image?screen_name=barackobama&size=reasonably_small", type: "large-card", tag: "advisor", history: history_3}
    peter = {timestamp: 1367852889, contact_id: 3, name: "Peter Thiel", picture: "https://api.twitter.com/1/users/profile_image?screen_name=peterthiel&size=reasonably_small", type: "large-card", tag: "investor", history: history_3}
    nilay = {timestamp: 1367852889, contact_id: 3, name: "Nilay Patel", picture: "https://api.twitter.com/1/users/profile_image?screen_name=reckless&size=reasonably_small", type: "large-card", tag: "reporter", history: history_3}
    victor = {timestamp: 1367852889, contact_id: 3, name: "Victor Pontis", picture: "https://api.twitter.com/1/users/profile_image?screen_name=viccypont&size=reasonably_small", type: "large-card", tag: "advisor", history: history_3}

    gon.cards = [ryan, heinz, dharmesh, dyor, tim, delian, aziz, paul, jon, nate, buzz, bill, akash, john, brad, barack, peter, nilay, victor]
    
    super
  end

  def create
    super
  end

  def update
    super
  end
end 