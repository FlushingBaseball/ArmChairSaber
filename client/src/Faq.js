export default function Faq(){


  return (
    <div id="WrapperFaq">
      <h1>Frequently asked Questions</h1>
        <div className="WrapperQuestion">
          <h3>Who built this site?</h3>
          <p>Hey im @flushingball on Twitter, im a software enginner, and long suffering mets fan</p>
        </div>
        <div className="WrapperQuestion">
          <h3>What Stack does the site run on?</h3>
          <p>Currently it's a React front end with Python/Flask on the backend and sqlite as the database.
            This is probably going to change rather soon as the site matures. 
          </p>
        </div>
        <div className="WrapperQuestion">
          <h3>What is the Leaderboard about?</h3>
          <p>Alot of smart people like baseball and I think the challenge to predict games is a blast. I'll be implementing some basic predictive models 
            so users can not only compete against eachother but also against a models. Eventually I will be allowing submissions of models to join the competition.
          </p>
        </div>
        <div className="WrapperQuestion">
          <h3>Now that the Season is over why should I come to your site?</h3>
          <p>The statistical features will continue to improve as the off season roles along, we also have a surprise in the nearterm. (Predicting contracts and where free agents land) The Blog is going to get alot of attention and you may be intrested in some of the content</p>
        </div>
        <div className="WrapperQuestion">
          <h3>Why haven't you included the game Odds from various gambiling sites?</h3>
          <p>As a one time student of Discrete math the first thing you're taught is <a to="https://en.wikipedia.org/wiki/Gambler%27s_ruin">Gamblers Ruin</a>
          I actually hope the itch to gamble is somewhat less for people that have an outlet (this site) to test their predictive ability. I may include the odds generated
          by ESPN or 538 if they restart their MLB project but as of now it's not on the horizon </p>
        </div>
        <div className="WrapperQuestion">
          <h3>There's a bug with how my prediction was graded! / something is wrong with my data</h3>
          <p>Please reach out to me via the contact for with your username and any details if you see or suspect a bug, the more bugs we squash togeather
            the better the site gets so thank you for reaching out. 
          </p>
        </div>
        <div className="WrapperQuestion">
          <h3>I have an idea!</h3>
          <p>Please reach out, i'm very intrested in seeing what people want implemented. 
          </p>
        </div>
        {/* <div className="WrapperQuestion">
          <h3></h3>
          <p></p>
        </div>
        <div className="WrapperQuestion">
          <h3></h3>
          <p></p>
        </div>
        <div className="WrapperQuestion">
          <h3></h3>
          <p></p>
        </div> */}
    </div>
  )
}