import Question from "../UtilityComponents/Question";

export default function Faq() {
  return (
    <div id="WrapperFaq">
      <h1 id="FaqHeader">Frequently asked Questions</h1>
      <Question
        question={"Who built this site?"}
        bodyText={<>My name is <a className="faq-link" href="https://github.com/flushingbaseball" target="_blank">Sam</a>, I'm a Software Engineer, currently working in tech sales. I root for the New York Mets</>}
      />
    <Question
      question={`What else are you working on?`}
      bodyText={`My main side project is a VR game.`}
    />
      <Question
        question={"What Tech Stack is the site developed on?"}
        bodyText={
          "It's a React frontend with Python/Flask on the backend. The database layer is PostgreSQL with SQLAlchemy as an ORM. (I write the blog in a special type of markdown called MDX which allows me to include inline React components)"
        }
      />
      <Question
        question={"The live games are great, how will they evolve?"}
        bodyText={
          "Customization! Giving users the power to tweak their own experience is what makes a great website.  I want to see a pitches' Stuff+ grade after it's thrown, and a players Max Sprint Speed compared to the bolt they just made to firstbase trying not to ground out. The ultimate goal is letting users pick what they see on a more granular level"
        }
      />
      <Question
        question={"What is the Leaderboard about?"}
        bodyText={
          "A lot of smart people like baseball and I think the challenge to predict a game's outcome (without the fallout of gambling) is a blast. I hope to implement some basic predictive models so users can not only compete against each other, but also against computer models. Maybe even eventually allowing submissions of predictive models to join the competition."
        }
      />
      <Question
        question={
          "What will change about the website?"
        }
        bodyText={
          "I don't want this website to become a jack of all trades master of none situation, Fangraphs, Baseball Prospectus, MLB.com etc exist. The majority of dev time will be spent on the prediction feature and whatever else people find fun. "
        }
      />
      <Question
        question={"There's a bug / site issue"}
        bodyText={
          "Please reach out to me with details if you see, or suspect a bug, the more bugs we squash together the better the site gets, so thank you for reaching out."
        }
      />
      <Question
        question={"What happened to Advanced Fielding?"}
        bodyText={
          "My former data source no longer allows the requests that I had used to calculate fielding metrics. This feature will return but is not a priority."
        }
      />
      <Question
        question={"I have an idea! / Feature request"}
        bodyText={
          <>
          Please reach out on <a href="https://github.com/flushingbaseball" target="_blank" className="faq-link">github</a> , I'm very interested in feedback so please raise an issue on the repo!
          </>
        }
      />
      <Question
        question={"Why the Y2kish design ? "}
        bodyText={"Fun. I try to balance ease of use / familiarity, with fun. Websites should be memorable"}
      />
      <Question
        question={
          "Why haven't you included the gambling odds?"
        }
        bodyText={<>
          As a one time student of Discrete math the first thing you're taught
          is <a href="https://en.wikipedia.org/wiki/Gambler%27s_ruin" target="_blank" className="faq-link">Gambler's Ruin</a>
          I actually hope the itch to gamble is somewhat less for people that
          have an outlet (this site) to test their predictive ability. 
        </>}
      />
      <Question
        question={`Tell me about the blog?`}
        bodyText={`I'm writing the occasional article just to try it out, but the focus is actually on challenging myself to create bespoke react components to make the articles interactive and fun to read. I didn't want to use a traditional content management system, and I definitely didn't wan't to just write html, so I'm using a special flavor of markdown called MDX that allows me to import my components and use them in the middle of text.`}
      />
    </div>
  );
}
