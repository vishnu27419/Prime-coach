import CoachHeader from "container/PublicLayout/CoachHeader";
import InnerHeader from "container/PublicLayout/InnerHeader";
import React from "react";
import "../Privacy Policy/PrivacyPolicy.css";
import Footer from "../PublicLayout/Footer";
import Header from "../PublicLayout/Header";

function PrivacyPolicy() {
  return (
    <div className="loader_sec">
      {localStorage.getItem("access_role") === null ? (
        <Header />
      ) : localStorage.getItem("access_role") === "Athlete" ? (
        <InnerHeader />
      ) : (
        <CoachHeader />
      )}
      <section className="privacy-wrapper">
        <div className="container">
          <div className="heading">
            <h1>
              Privacy <span>Policy</span>
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
                  Your privacy is very important to us. Accordingly, we have
                  developed this Policy in order for you to understand how we
                  collect, use, communicate and disclose and make use of
                  personal information. We use your Personal Information only
                  for providing and improving the Platform. By using the
                  Platform, you agree to the collection and use of information
                  in accordance with this policy. The following outlines our
                  Privacy Policy.
                </p>

                <ul>
                  <li>
                    Before or at the time of collecting personal information, we
                    will identify the purposes for which information is being
                    collected.
                  </li>
                  <li>
                    We will collect and use personal information solely with the
                    objective of fulfilling those purposes specified by us and
                    for other compatible purposes, unless we obtain the consent
                    of the individual concerned or as required by law.
                  </li>
                  <li>
                    We will only retain personal information as long as
                    necessary for the fulfillment of those purposes.
                  </li>
                  <li>
                    We will collect personal information by lawful and fair
                    means and, where appropriate, with the knowledge or consent
                    of the individual concerned.
                  </li>
                  <li>
                    Personal data should be relevant to the purposes for which
                    it is to be used, and, to the extent necessary for those
                    purposes, should be accurate, complete, and up-to-date.
                  </li>
                  <li>
                    We will protect personal information by reasonable security
                    safeguards against loss or theft, as well as unauthorized
                    access, disclosure, copying, use or modification.
                  </li>
                  <li>
                    We will make readily available to customers information
                    about our policies and practices relating to the management
                    of personal information.
                  </li>
                </ul>
              </div>
              <div className="your_policy">
                <div className="blue_heading">Your Privacy</div>
                <p>
                  We follow all legal requirements to protect your privacy. Our
                  Privacy Policy is a legal statement that explains how we may
                  collect information from you, how we may share your
                  information, and how you can limit our sharing of your
                  information. We utilize the Personal Data you offer in a way
                  that is consistent with this Personal Privacy Policy. If you
                  provide Personal Data for a particular reason, we could make
                  use of the Personal Data in connection with the reason for
                  which it was provided. For example, registration info sent
                  when developing your account, might be used to suggest
                  products to you based on past acquisitions. We might use your
                  Personal Data to offer access to services on the Platform and
                  monitor your use of such services. We may also utilize your
                  Personal Data and various other personally non-identifiable
                  information gathered through the Platform to assist us with
                  improving the material and functionality of the Platform, to
                  much better comprehend our users, and to improve our services.
                  You will see terms in our Privacy Policy that are capitalized.
                  These terms have meanings as described in the Definitions
                  section below.
                </p>

                <div className="blue_heading">Definitions</div>
                <p>
                  "<em>Non Personal Information</em>" is information that is not
                  personally identifiable to you and that we automatically
                  collect when you access our Platform with a web browser. It
                  may also include publicly available information that is shared
                  between you and others.
                </p>
                <p>
                  "<em>Personally Identifiable Information</em>" is non-public
                  information that is personally identifiable to you and
                  obtained in order for us to provide you within our Platform.
                  Personally Identifiable Information may include information
                  such as your name, email address, and other related
                  information that you provide to us or that we obtain about
                  you.
                </p>

                <div className="blue_heading">Information We Collect</div>
                <p>
                  Generally, you control the amount and type of information you
                  provide to us when using our Platform. As a user, you can
                  browse our Platform to find out more about our Platform. You
                  are not required to provide us with any Personally
                  Identifiable Information as a user.
                </p>

                <div className="blue_heading">
                  Computer Information Collected
                </div>
                <p>
                  When you use our Platform, we automatically collect certain
                  computer information by the interaction of your mobile phone
                  or web browser with our Platform. Such information is
                  typically considered Non Personal Information. We also collect
                  the following:
                </p>

                <ul>
                  <li>
                    <strong>Cookies</strong>
                    Our Platform uses "Cookies" to identify the areas of our
                    Platform that you have visited. A Cookie is a small piece of
                    data stored on your computer or mobile device by your web
                    browser. We use Cookies to personalize the Content that you
                    see on our Platform. Most web browsers can be set to disable
                    the use of Cookies. However, if you disable Cookies, you may
                    not be able to access functionality on our Platform
                    correctly or at all. We never place Personally Identifiable
                    Information in Cookies.
                  </li>
                  <li>
                    <strong>Geographical Information</strong>
                    When you use the mobile application, we may use GPS
                    technology (or other similar technology) to determine your
                    current location in order to determine the city you are
                    located in and display information with relevant data or
                    advertisements. We will not share your current location with
                    other users or partners. If you do not want us to use your
                    location for the purposes set forth above, you should turn
                    off the location services for the mobile application located
                    in your account settings or in your mobile phone settings
                    and/or within the mobile application.
                  </li>
                  <li>
                    <strong>Automatic Information</strong>
                    We automatically receive information from your web browser
                    or mobile device. This information includes the name of the
                    Platform from which you entered our Platform, if any, as
                    well as the name of the Platform to which you're headed when
                    you leave our Platform. This information also includes the
                    IP address of your computer/proxy server that you use to
                    access the Internet, your Internet Platform provider name,
                    web browser type, type of mobile device, and computer
                    operating system. We use all of this information to analyze
                    trends among our Users to help improve our Platform.
                  </li>
                  <li>
                    <strong>Log Data</strong>
                    Like many Platform operators, we collect information that
                    your browser sends whenever you visit our Platform ("Log
                    Data"). This Log Data may include information such as your
                    computer's Internet Protocol ("IP") address, browser type,
                    browser version, the pages of our Platform that you visit,
                    the time and date of your visit, the time spent on those
                    pages and other statistics.
                  </li>
                </ul>
                <p>
                  Our Services are not directed to persons under the age of 18
                  years. We do not knowingly collect Personally Identifiable
                  Information from children under 18 years. If a parent or
                  guardian becomes aware that his or her child has provided us
                  with Personally Identifiable Information without their
                  consent, he or she should contact us at info@primecoach.co. If
                  we become aware that a child under 18 years has provided us
                  with Personally Identifiable Information, we will delete such
                  information from our record.
                </p>

                <div className="blue_heading">How We Use Your Information</div>
                <p>We use the information we receive from you as follows:</p>
                <ul>
                  <li>
                    to respond to any enquiries which you make to us relating to
                    any of our services;
                  </li>
                  <li>
                    to monitor site usage to develop and administer our
                    Platforms;
                  </li>
                  <li>
                    to promote our products and services to you, as well as the
                    products and services of our affiliates;
                  </li>
                  <li>
                    to deliver email communications, newsletters, and other
                    correspondence to which you subscribe;
                  </li>
                  <li>to conduct other marketing activities; and</li>
                  <li>
                    to respond to your inquiries and other correspondence, or
                    request that you provide feedback to us.
                  </li>
                </ul>
                <div className="blue_heading">How We Share Information</div>
                <p>We may disclose your personal information to:</p>
                <ul>
                  <li>our agents and service providers;</li>
                  <li>our infrastructure providers;</li>
                  <li>sell to any third party; and</li>
                  <li>
                    law enforcement and regulatory agencies in connection with
                    any investigation to help prevent unlawful activity or as
                    otherwise required by law.
                  </li>
                </ul>
                <div className="blue_heading">
                  Reasons We Collect and Use Your Personal Information
                </div>
                <p>We may use your information in the following ways:</p>
                <ul>
                  <li>
                    where it is necessary to perform our contract with you;
                  </li>
                  <li>where it is required by law;</li>
                  <li>
                    where you have provided consent, provided that you can
                    withdraw this consent at any time; and
                  </li>
                  <li>
                    where it is necessary for our legitimate interests as a
                    business.
                  </li>
                </ul>
                <div className="blue_heading">Your Rights</div>
                <p>
                  You have a number of rights under data protection legislation.
                  These include:
                </p>
                <ul>
                  <li>
                    <strong>Right of access.</strong>
                    You have the right to know what information we hold about
                    you and to ask, in writing, to see your records. We will
                    provide you with details of the records we hold as soon as
                    possible and at latest within one month, unless the request
                    is complex. We may require proof of identity before we are
                    able to release the data. Please use the details in the
                    “Contact us” section below if you would like to exercise
                    this right.
                  </li>
                  <li>
                    <strong>Right to be informed.</strong>
                    You have the right to be informed how your personal data
                    will be used. This policy as well as any additional
                    information or notice that is provided to you either at the
                    time you provided your details, or otherwise, is intended to
                    provide you with this information.
                  </li>
                  <li>
                    <strong>Right to withdraw consent.</strong>
                    Where we process your data on the basis of your consent (for
                    example, to send you marketing texts or e-mails) you can
                    withdraw that consent at any time. To do this, or to discuss
                    this right further with us, please contact us using the
                    details in the “Contact us” section below.
                  </li>
                  <li>
                    <strong>Right to object.</strong>
                    You also have a right to object to us processing data where
                    we are relying on it being within our legitimate interests
                    to do so (for example, to send you direct marketing by
                    post). To do this, or to discuss this right further with us,
                    please contact us using the details in the “Contact us”
                    section below.
                  </li>
                  <li>
                    <strong>Right to restrict processing.</strong>
                    In certain situations you have the right to ask for
                    processing of your personal data to be restricted because
                    there is some disagreement about its accuracy or legitimate
                    usage.
                  </li>
                  <li>
                    <strong>Right of erasure.</strong>
                    In some cases, you have the right to be forgotten (i.e. to
                    have your personal data deleted from our database). Where
                    you have requested that we do not send you marketing
                    materials we will need to keep some limited information in
                    order to ensure that you are not contacted in the future.
                  </li>
                  <li>
                    <strong>Right of rectification.</strong>
                    If you believe our records are inaccurate you have the right
                    to ask for those records concerning you to be updated. To
                    update your records please get in touch with us using the
                    details in the “Contact us” section below.
                  </li>
                  <li>
                    <strong>Right to data portability.</strong>
                    Where we are processing your personal data because you have
                    given us your consent to do so, you have the right to
                    request that the data is transferred from one service
                    provider to another.
                  </li>
                </ul>
                <p>
                  Complaints: If you are unhappy with the way in which we have
                  handled your personal information please contact us using the
                  details below. You are also entitled to make a complaint to
                  the Information Commissioner’s Office -{" "}
                  <a href="https://ico.org.uk/">https://ico.org.uk/</a>.
                </p>
                <div className="blue_heading">Links to Other Platforms</div>
                <p>
                  Our Platform may contain links to other Platforms that are not
                  under our direct control. These Platforms may have their own
                  policies regarding privacy. We have no control of or
                  responsibility for linked Platforms and provide these links
                  solely for the convenience and information of our visitors.
                  You access such linked Platforms at your own risk. These
                  Platforms are not subject to this Privacy Policy. You should
                  check the privacy policies, if any, of those individual
                  Platforms to see how the operators of those third-party
                  Platforms will utilize your personal information. In addition,
                  these Platforms may contain a link to Platforms of our
                  affiliates. The Platforms of our affiliates are not subject to
                  this Privacy Policy, and you should check their individual
                  privacy policies to see how the operators of such Platforms
                  will utilize your personal information.
                </p>
                <div className="blue_heading">Security</div>
                <p>
                  The security of your Personal Information is important to us,
                  but remember that no method of transmission over the Internet,
                  or method of electronic storage, is 100% secure. While we
                  strive to use commercially acceptable means to protect your
                  Personal Information, we cannot guarantee its absolute
                  security. We utilize practical protection measures to
                  safeguard against the loss, abuse, and modification of the
                  individual Data under our control. Personal Data is kept in a
                  secured database and always sent out by means of an encrypted
                  SSL method when supported by your web browser. No Web or email
                  transmission is ever totally protected or mistake cost-free.
                  For example, email sent out to or from the Platform may not be
                  protected. You must take unique care in deciding what info you
                  send to us by means of email.
                </p>
                <div className="blue_heading">Retention of Information</div>
                <p>
                  We will retain your information for no longer than is
                  necessary for the purposes for which we collected it, or for
                  as long as we have your consent to do so where your consent is
                  our legal basis on which we process such data. All retained
                  data will be held subject to this policy.
                </p>
                <div className="blue_heading">Privacy Policy Updates</div>
                <p>
                  We reserve the right to modify this privacy policy at any
                  time, so please review it frequently. Changes and
                  clarifications will take effect immediately upon their posting
                  on the Platform. If we make material changes to this policy,
                  we will notify you here that it has been updated.
                </p>
                <div className="blue_heading">
                  Questions about our Privacy Policy
                </div>
                <p>
                  We are committed to conducting our business in accordance with
                  these principles in order to ensure that the confidentiality
                  of personal information is protected and maintained. If you
                  have any questions/complaints about our Privacy Policy, you
                  can reach us at:
                </p>
                <p>
                  Email address:{" "}
                  <a href="mailto:info@primecoach.co">info@primecoach.co</a>
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

export default PrivacyPolicy;
