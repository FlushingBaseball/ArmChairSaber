import Question from "../UtilityComponets/Question";

export default function Faq() {
  return (
    <div id="WrapperFaq">
      <h1 id="FaqHeader">Frequently asked Questions</h1>
      <Question
        question={"Who built this site?"}
        bodyText={<>Hey im <a className="faq-link" href="https://github.com/flushingbaseball" target="_blank">Sam</a>, a Software Engineer and Mets fan</>}
      />
    <Question
      question={`What else are you working on?`}
      bodyText={`I'm doing some very fun design work for a VR game which will launch in early 2026. `}
    />
      <Question
        question={"What Tech Stack is the site developed on?"}
        bodyText={
          "It's a React frontend with Python/Flask on the backend. The database layer is PostgreSQL with SQLAlchemy as an ORM. (I write the blog in a special type of markdown called MDX)"
        }
      />
      <Question
        question={"The live games are great, how will they evolve?"}
        bodyText={
          "Customization! I love xERA and Max Sprint speed next to in game events, you may want normal ERA and average time to first. I'm working towards letting you pick what you see on a more granular level"
        }
      />
      <Question
        question={"What is the Leaderboard about?"}
        bodyText={
          "A lot of smart people like baseball and I think the challenge to predict games is a blast. I'll be implementing some basic predictive models so users can not only compete against each other but also against models. Eventually I will be allowing submissions of models to join the competition."
        }
      />
      <Question
        question={
          "What will change during the first year?"
        }
        bodyText={
          "The statistical features will continue to improve as the season rolls along. I don't want this website to become a jack of all trades master of none situation so the majority of dev time will be statistical work and the core prediction feature being expanded and iterated on. "
        }
      />
      <Question
        question={"There's a bug / site issue"}
        bodyText={
          "Please reach out to me with your username and any details if you see or suspect a bug, the more bugs we squash together the better the site gets, so thank you for reaching out."
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
        bodyText={"Fun. I try to balance ease of use / familiarity with fun. Websites should be memorable"}
      />
      <Question
        question={
          "Why haven't you included the game Odds from various gambling sites?"
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
        bodyText={`I'm writing the occasional article, but the foucs is on creating bespoke react components to make the articles interactive and fun to read. I didn't want to use a tradional content management system, and I definitely didn't wan't to just write html, so I'm using a special flavor of markdown called MDX that allows me to import my components and use them in the middle of text.`}
      />
    </div>
  );
}
