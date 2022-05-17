import CoachHeader from "container/PublicLayout/CoachHeader";
import InnerHeader from "container/PublicLayout/InnerHeader";
import React from "react";
import "../Cookie Policy/CookiePolicy.css";
import Footer from "../PublicLayout/Footer";
import Header from "../PublicLayout/Header";

function CookiePolicy() {
  return (
    <div className="loader_sec">
      {/* <Header /> */}

      {localStorage.getItem("access_role") === null ? (
        <Header />
      ) : localStorage.getItem("access_role") === "Athlete" ? (
        <InnerHeader />
      ) : (
        <CoachHeader />
      )}
      <section className="cookie-wrapper">
        <div className="container">
          <div className="heading">
            <h1>
              Cookie <span>Policy</span>
            </h1>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="policy_content">
                <p>
                  Our Privacy Policy was last updated and posted on June 23,
                  2020. It governs the privacy terms of our Platform,
                  www.prime-coach.org, sub-domains, and any associated web-based
                  applications (the "<strong>Platform</strong>"), as owned and
                  operated by{" "}
                  <strong>Ultimate Sports Therapy & Performance Limited</strong>{" "}
                  (“<strong>Prime Coach</strong>”, “<strong>We</strong>”, “
                  <strong>Our</strong>”).
                </p>
                <p>
                  BY CONTINUING TO USE OUR SITE AND SERVICES, YOU ARE AGREEING
                  TO THE USE OF COOKIES AND SIMILAR TECHNOLOGIES FOR THE
                  PURPOSES WE DESCRIBE IN OUR PRIVACY POLICY. IF YOU DO NOT
                  ACCEPT THE USE OF COOKIES AND SIMILAR TECHNOLOGIES, DO NOT USE
                  THIS SITE.
                </p>
              </div>
              <div className="your_policy">
                <div className="blue_heading">What is a Cookie?</div>
                <p>
                  A cookie is a simple text file that is stored on your computer
                  or mobile device by a website’s server. Each cookie is unique
                  to your web browser. It will contain some anonymous
                  information such as a unique identifier and the site name and
                  some digits and numbers.
                </p>
                <p>
                  Most websites you visit use cookies to improve your user
                  experience by allowing the website to ‘remember’ you, either
                  for the duration of your visit (using a ‘session cookie’) or
                  for repeat visits (using a ‘persistent cookie’).
                </p>
                <p>
                  Cookies may be set by the website you are visiting (‘first
                  party cookies’) or they may be set by other websites who run
                  content on the page you are viewing (‘third party cookies’).
                </p>

                <div className="blue_heading">What do Cookies do?</div>
                <p>
                  Cookies have lots of different jobs, like letting you navigate
                  between pages efficiently, storing your preferences, and
                  improving your experience of a website. Cookies make the
                  interaction between you and the website faster and easier. If
                  a website doesn’t use cookies, it will think you are a new
                  visitor every time you move to a new page on the site, for
                  example, even after you “log in,” if you move to another page
                  it won’t recognise you and it won’t be able to keep you logged
                  in.
                </p>

                <div className="blue_heading">How do we use Cookies?</div>
                <p>
                  We use Cookies to track how our users access and use our
                  Services, to learn when and how users visit the Services, to
                  make personalized features and other services available to
                  you, to learn which terms are used, to learn which websites
                  direct you to our Services, to compile and analyze aggregate
                  statistics and trends, and to otherwise help administer and
                  improve the Services. We also use Cookies to help display
                  certain information on the Services and to improve your
                  enjoyment and convenience when using or visiting our Services;
                  for example, by remembering your contact and other information
                  when you access or use the Services. We also use Cookies to
                  facilitate login and access actions to enter a user account.
                </p>
                <p>
                  We use different types of cookies to enhance and improve your
                  experience. We use cookies for:
                </p>

                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Category of Use</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Security</td>
                      <td>
                        We use cookies to enable and support our security
                        features, for example: to authenticate Members, prevent
                        fraudulent use of login credentials, and protect Member
                        data from unauthorized parties.
                      </td>
                    </tr>
                    <tr>
                      <td>Preferences</td>
                      <td>
                        <p>
                          When you are signed in to your account, cookies help
                          us display the correct information and personalize
                          your experience, by providing you with features,
                          insights, and customized content. They can also help
                          you fill out forms more easily.
                        </p>
                        <p>
                          Loss of the information stored in a preference cookie
                          may make the Site experience less functional, but
                          should not prevent it from working.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>Session State</td>
                      <td>
                        <p>
                          We collect information about how our Users and Members
                          use and interact with the Site. This may include the
                          pages Members visit most often and when and where
                          Members get error messages. We use these “session
                          state cookies” to help us improve our Site and
                          Services.
                        </p>
                        <p>
                          Blocking or deleting these cookies will not prevent
                          the Site from working.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>Analytics</td>
                      <td>
                        <p>
                          These cookies help us learn how our Site performs in
                          different locations.
                        </p>
                        <p>
                          We use cookies to understand and improve our Services
                          and features.
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="blue_heading">
                  Ad Choices and Managing Cookies
                </div>
                <p>
                  We work with several third parties to provide you with
                  personalized, interest-based advertising. We may target ads to
                  you, and measure their performance, on and off the Website
                  using:
                </p>

                <ul>
                  <li>
                    Member-provided profile information (e.g., job title,
                    occupation, location, authorized information shared from
                    your social networking site)ionality on our Platform
                    correctly or at all. We never place Personally Identifiable
                    Information in Cookies.
                  </li>
                  <li>
                    Your use of the Website (e.g., search history, job clicks,
                    companies you follow);
                  </li>
                  <li>
                    Information inferred from data described above (e.g., using
                    job titles from a profile to infer industry, seniority, and
                    compensation bracket)
                  </li>
                  <li>
                    IP address or mobile device location information (to the
                    extent you have enabled location tracking on your device);
                  </li>
                  <li>
                    Cookies (both on and off the Website) which may include
                    information from the Ad Partners we use to help deliver
                    relevant ads to you.
                  </li>
                </ul>
                <div className="blue_heading">
                  How We Work with Third-Party Ad Partners
                </div>
                <p>
                  When we work with our Ad Partners to serve you personalized,
                  interest-based advertising, we do not share information with
                  them that they can use to identify you or associate with you
                  as a specific individual unless you have instructed us to do
                  so (such as when you fill out a lead form in an ad, or approve
                  your Profile for display to employers). Similarly, if one of
                  these Ad Partners has information about you saved in one of
                  their own Cookies on your browser, they use that information
                  to help us send you a relevant ad, but they do not share with
                  us information that we can associate with you as an
                  individual.
                </p>
                <div className="blue_heading">Opting Out of Cookies</div>
                <p>
                  We use Cookies that are necessary for us to provide the
                  services you use and you cannot opt out of these Cookies on
                  the Website. You are able to disable placement of some (but
                  not all) Cookies by setting your browser to decline cookies,
                  though this may worsen your user experience. Additionally, you
                  can also control, manage and/or delete cookies via your
                  browser settings. A useful resource for information about
                  deleting and controlling cookies can be found at{" "}
                  <a href="https://www.aboutcookies.org/">AboutCookies.org</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default CookiePolicy;
