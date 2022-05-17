import React from "react";
import "../Terms & Conditions/TermsAndConditions.css";
import Footer from "../PublicLayout/Footer";
import Header from "../PublicLayout/Header";
import InnerHeader from "container/PublicLayout/InnerHeader";
import CoachHeader from "container/PublicLayout/CoachHeader";

function TermsAndConditions() {
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
      <section className="terms_condition-wrapper">
        <div className="container">
          <div className="heading">
            <h1>
              Terms & <span>Conditions</span>
            </h1>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="policy_content">
                <h3>Terms of Use</h3>
                <div className="effectivedate">
                  <span>Effective Date: </span> June 23, 2020
                </div>
                <p>
                  The following terms and conditions (these “
                  <strong>Terms of Use</strong>” or “<strong>Terms</strong>”),
                  govern your access to and use of www.prime-coach.org (the “
                  <strong>Platform</strong>”), including any content,
                  functionality and services offered on or through the Platform,
                  by Prime Coach (the “<strong>Company</strong>” “
                  <strong>we</strong>” “<strong>us</strong>”).
                </p>
                <p>
                  <strong>
                    Please read the Terms carefully before using our Service.
                    This is an agreement between you and Posh Clinic. By
                    accessing or using the Service, you acknowledge that you
                    have read, understood and agreed to these Terms.
                  </strong>
                  Our Privacy Policy (the "Privacy Policy"), explains our
                  collection, use, transmission and disclosure of your personal
                  information provided by or collected from you. By agreeing to
                  be bound by these Terms, you are also agreeing that you have
                  read and understood the collection, use, transmission and
                  disclosure of your personal information or data as described
                  in the Privacy Policy (and as amended from time to time). You
                  should review the Privacy Policy before using the Service.
                </p>
                <p>
                  <strong>
                    If you do not agree to these Terms, you may not access or
                    use the Service. We may update and modify the Terms from
                    time to time. Your continued use of the Service means that
                    you have accepted those modifications.
                  </strong>
                </p>
              </div>
              <div className="your_policy">
                <div className="blue_heading">Use of the Site and Service</div>
                <p>
                  YOU MUST BE 18 YEARS OR OLDER AND HAVE THE NECESSARY POWER AND
                  AUTHORITY TO ACCESS OR USE THE PLATFORM, OR ENTER INTO THESE
                  TERMS. CHILDREN UNDER THE AGE OF 18 ARE PROHIBITED FROM USING
                  THIS PLATFORM.
                </p>

                <p>
                  Prime Coach makes no representation or warranty that the
                  Content, regardless of its source, is accurate, complete,
                  reliable, current or error-free. Content provided on the
                  Platform and in or related to the Service is subject to
                  change. Prime Coach disclaims all liability for any
                  inaccuracy, unreliability, error or lack of timeliness or
                  completeness in the Content.
                </p>

                <p>
                  Content on this Platform may be provided in written, video
                  and/or audio format and is provided for the user’s convenience
                  for informational, educational and entertainment purposes
                  only. The Platform does not intended to provide specific
                  financial, tax, legal, physical or mental health or any other
                  professional advice whatsoever to you, or any other individual
                  or company, through its content and must not be relied upon as
                  such.
                </p>

                <div className="blue_heading">Account Registration</div>
                <p>
                  To use the Service provided, you may be required to provide
                  information about yourself including your name, email address,
                  username and password and other personal information. You
                  agree that any registration information you give to Prime
                  Coach will always be current, correct and complete.Your
                  account must not be used for any illegal or unauthorized
                  purpose and must not impersonate someone else. You must not
                  provide account information or any email address other than
                  your own. You must not, in the use of the Service, violate any
                  laws in your jurisdiction.
                </p>

                <div className="blue_heading">Refusal of Service</div>
                <p>
                  The Service is offered subject to our acceptance of your order
                  or request for Service. We reserve the right to refuse service
                  to any order, person or entity, without any obligation to
                  explain our reason for doing so. An order is not deemed
                  accepted by us until payment has been processed. We may at any
                  time change or discontinue any aspect or feature of the
                  Platform or Service, subject to us fulfilling our previous
                  responsibilities to you based on acceptance of your payment.
                  If we choose to refuse your order after payment has been
                  processed, we will not refund your money.
                </p>

                <div className="blue_heading">Order Confirmation</div>
                <p>
                  We will email you to confirm the placement of your order and
                  with details concerning product delivery. In the event that
                  there is an error in this email confirmation, it is your
                  responsibility to inform us as soon as possible so that we may
                  correct the error.
                </p>

                <div className="blue_heading">
                  Cancellations, Refunds & Returns
                </div>
                <p>
                  We do not offer refunds for any products or services purchased
                  by you from the Platform.
                </p>
                <div className="blue_heading">Product Description</div>
                <p>
                  We endeavor to describe and display the Platform and Service
                  as accurately as possible. While we try to be as clear as
                  possible in explaining the Service, we do not guarantee that
                  the Platform is entirely accurate, current, or error-free.
                  From time to time we may correct errors in pricing and
                  descriptions. We reserve the right to refuse or cancel any
                  order with an incorrect price listing.
                </p>

                <div className="blue_heading">Product Description</div>
                <p>
                  We endeavor to describe and display the Platform and Service
                  as accurately as possible. While we try to be as clear as
                  possible in explaining the Service, we do not guarantee that
                  the Platform is entirely accurate, current, or error-free.
                  From time to time we may correct errors in pricing and
                  descriptions. We reserve the right to refuse or cancel any
                  order with an incorrect price listing.
                </p>

                <div className="blue_heading">Restrictions on Usage</div>
                <p>
                  You agree to use the Platform and to purchase Service through
                  the Platform for legitimate purposes expressly permitted by
                  this Platform.You may use the Platform and Service for lawful
                  purposes only. You agree to be financially responsible for all
                  purchases made by you or someone acting on your behalf through
                  the Platform. You must not without Prime Coach’s express prior
                  written consent use this platform for any other purpose,
                  including commercial purpose. You shall not broadcast or share
                  through the Platform any content that disregard or breaches
                  the rights of others, or which is aggressive, offensive,
                  abusive, derogatory, injurious, libelous, invasive of privacy
                  or publicity rights, indecent, obscene, profane or otherwise
                  objectionable, contains injurious formulas, recipes, or
                  instructions, or which encourages conduct that would
                  constitute a criminal offense, give rise to civil liability or
                  otherwise violate any law.
                </p>

                <div className="blue_heading">Third Party Websites</div>
                <p>
                  There are third party links provided for your convenience on
                  the Platform. These websites are provided mainly for your
                  assistance. You understand and agree that we are not
                  accountable or liable for the availability, accuracy, content
                  or policies of third party website or resources. Unless
                  otherwise indicated by us, links to such website or resources
                  do not imply any endorsement by or affiliation with Prime
                  Coach. You acknowledge sole responsibility for and assume all
                  risk arising from your use of any such websites or resources.
                </p>
                <p>
                  We review our Platform periodically for broken and out-of-date
                  linksand we have the right to revise, remove or post links at
                  any time. However, situations which are not controlled by us
                  include links to external websites. These third party links
                  may expire over time. If you would like to report problems
                  with links on our Platform, please send an email to [Email].
                </p>

                <div className="blue_heading">Website Content</div>
                <p>
                  Prime Coach disallows the uploading, posting or otherwise
                  making available on the Platform any artwork, photos, videos,
                  audios, text or other submission of material (collectively
                  “Submissions”) protected by copyright, trademark or other
                  proprietary right without the express written permission of
                  the owner of the copyright, trademark or other proprietary
                  right. The burden of determining that any Submissions are not
                  so protected rests entirely with you. You shall be liable for
                  any damage resulting from any infringement of copyrights,
                  trademarks, or other proprietary rights, or any other harm
                  resulting from such a Submission. You represent or warrant
                  that you have the authority to use and distribute all
                  Submissions submitted by you to the Platform, as well as any
                  Submissions sent via email to our email address or via mail to
                  our mailing address, and that the use or display of the
                  Submissions will not violate any laws, rules, regulations or
                  rights of third parties.
                </p>

                <div className="blue_heading">Intellectual Property</div>
                <p>
                  The Platform and Service contain intellectual property owned
                  by Prime Coach, including, without limitation, trademarks,
                  copyrights, proprietary information and other intellectual
                  property as well as the www.prime-coach.org domain name, logo,
                  all designs, text, graphics, other files, and the selection
                  and arrangement thereof, also referred to as the “look and
                  feel.” The entire Content of our Platform is protected by
                  intellectual property law, including international copyright
                  and trademark laws. You are prohibited from modifying,
                  publishing, transmitting, participating in the transfer or
                  sale of, creating derivative works from, distributing,
                  displaying, reproducing or performing, or in any way
                  exploiting in any format whatsoever any of the Platform or
                  Service Content or intellectual property, in whole or in part
                  without our prior written consent, including any and all text,
                  graphics, code, software, video, audio, or other Content. We
                  reserve the right to immediately remove you from the Service,
                  without refund, or restrict you from access to the Platform,
                  if you are caught violating this intellectual property policy.
                </p>

                <div className="blue_heading">
                  Disclaimers and Limitations of Liability
                </div>
                <p>
                  THE INFORMATION ON OUR PLATFORM IS PROVIDED ON AN “AS IS,” “AS
                  AVAILABLE” BASIS. YOU AGREE THAT YOUR USE OF OUR PLATFORM IS
                  AT YOUR SOLE RISK. INFORMATION ON OUR PLATFORM SHOULD NOT
                  NECESSARILY BE RELIED UPON AND SHOULD NEVER BE CONSTRUED TO BE
                  PROFESSIONAL ADVICE FROM US. WE DO NOT GUARANTEE THE ACCURACY
                  OR COMPLETENESS OF ANY OF THE INFORMATION PROVIDED, AND ARE
                  NOT RESPONSIBLE FOR ANY LOSS RESULTING FROM YOUR RELIANCE ON
                  SUCH INFORMATION. UNDER NO CIRCUMSTANCES WILL PRIME COACH BE
                  LIABLE OR RESPONSIBLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
                  CONSEQUENTIAL (INCLUDING DAMAGES FROM LOSS OF BUSINESS, LOST
                  PROFITS, LITIGATION, OR THE LIKE), SPECIAL, EXEMPLARY,
                  PUNITIVE, OR OTHER DAMAGES, UNDER ANY LEGAL THEORY, ARISING
                  OUT OF OR IN ANY WAY RELATING TO THE PLATFORM OR SERVICE, YOUR
                  PLATFORM USE, OR THE PLATFORM CONTENT, EVEN IF ADVISED OF THE
                  POSSIBILITY OF SUCH DAMAGES.
                </p>
                <p>
                  ADDITIONALLY, PRIME COACH IS NOT LIABLE FOR DAMAGES IN
                  CONNECTION WITH (A) ANY FAILURE OF PERFORMANCE, ERROR,
                  OMISSION, DENIAL OF SERVICE, ATTACK, INTERRUPTION, DELETION,
                  DEFECT, DELAY IN OPERATION OR TRANSMISSION, COMPUTER VIRUS OR
                  LINE OR SYSTEM FAILURE; (B) LOSS OF REVENUE, ANTICIPATED
                  PROFITS, BUSINESS, SAVINGS, GOODWILL OR DATA; AND (C) THIRD
                  PARTY THEFT OF, DESTRUCTION, OF, UNAUTHORIZED ACCESS TO,
                  ALTERATION OF, OR USE OF YOUR INFORMATION OR PROPERTY,
                  REGARDLESS OF OUR NEGLIGENCE ,GROSS NEGLIGENCE, FAILURE OF AN
                  ESSENTIAL PURPOSE AND WHETHER SUCH LIABILITY ARISES IN
                  NEGLIGENCE, CONTRACT, TORT, OR ANY OTHER THEORY OF LEGAL
                  LIABILITY. THIS APPLIES EVEN IF PRIME COACH WAS ADVISED OF THE
                  POSSIBILITY OR COULD HAVE FORESEEN THE DAMAGES.
                </p>
                <p>
                  THE WEBSITE AND SERVICES CONTAINED THEREON ARE NOT SUBSTITUTES
                  FOR THE ADVICE AND TREATMENT OF A LICENSED HEALTH CARE
                  PROFESSIONAL. NOT ALL SERVICES ARE SUITED FOR EVERYONE. THE
                  CREATORS OF ANY SERVICES DO NOT ASSUME, AND SHALL NOT HAVE,
                  ANY LIABILITY TO USERS FOR INJURY OR LOSS IN CONNECTION
                  THEREWITH. WE MAKE NO REPRESENTATIONS OR WARRANTIES AND
                  EXPRESSLY DISCLAIM ANY AND ALL LIABILITY CONCERNING ANY
                  TREATMENT OR ANY ACTION FOLLOWING THE INFORMATION OFFERED OR
                  PROVIDED WITHIN OR THROUGH THE WEBSITE. IF YOU HAVE SPECIFIC
                  CONCERNS OR A SITUATION IN WHICH YOU REQUIRE PROFESSIONAL OR
                  MEDICAL ADVICE, YOU SHOULD CONSULT WITH AN APPROPRIATELY
                  TRAINED AND QUALIFIED SPECIALIST, SUCH AS A LICENSED
                  PSYCHOLOGIST, PHYSICIAN OR OTHER HEALTH PROFESSIONAL. NEVER
                  DISREGARD THE MEDICAL ADVICE OF A PSYCHOLOGIST, PHYSICIAN OR
                  OTHER HEALTH PROFESSIONAL, OR DELAY IN SEEKING SUCH ADVICE,
                  BECAUSE OF THE INFORMATION OFFERED OR PROVIDED WITHIN OR
                  THROUGH THE WEBSITE.
                </p>
                <p>
                  BECAUSE ANY WEIGHT LOSS OR HEALTH MODIFICATION PLAN CAN RESULT
                  IN SERIOUS INJURY, WE URGE YOU TO OBTAIN A PHYSICAL
                  EXAMINATION FROM A DOCTOR BEFORE USING ANY WEIGHT LOSS
                  PRODUCTS OR SERVICES. YOU AGREE THAT BY USING ANY PRODUCTS OR
                  SERVICES, YOU DO SO ENTIRELY AT YOUR OWN RISK. ANY
                  RECOMMENDATION FOR CHANGES IN DIET INCLUDING THE USE OF FOOD
                  SUPPLEMENTS, WEIGHT REDUCTION AND/OR BODY BUILDING ENHANCEMENT
                  PRODUCTS ARE ENTIRELY YOUR RESPONSIBILITY AND YOU SHOULD
                  CONSULT A PHYSICIAN PRIOR TO UNDERGOING ANY DIETARY OR FOOD
                  SUPPLEMENT CHANGES. YOU AGREE THAT YOU ARE VOLUNTARILY
                  PURCHASING SERVICES, PARTICIPATING IN RECOMMENDED ACTIVITIES,
                  AND USING THIS WEBSITE AND ASSUME ALL RISKS OF INJURY,
                  ILLNESS, OR DEATH.
                </p>
                <p>
                  YOU ACKNOWLEDGE THAT YOU HAVE CAREFULLY READ THIS “WAIVER AND
                  RELEASE OF LIABILITY” AND FULLY UNDERSTAND THAT IT IS A
                  RELEASE OF LIABILITY. YOU EXPRESSLY AGREE TO RELEASE AND
                  DISCHARGE ALL INDEMNIFIED PARTIES (AS DEFINED BELOW) FROM ANY
                  AND ALL CLAIMS OR CAUSES OF ACTION AND YOU AGREE TO
                  VOLUNTARILY GIVE UP AND IRREVOCABLY WAIVE AND RELEASE ANY
                  RIGHT THAT YOU MAY OTHERWISE HAVE TO BRING A LEGAL ACTION
                  AGAINST ANY INDEMNIFIED PARTY FOR PERSONAL INJURY OR PROPERTY
                  DAMAGE.
                </p>
                <p>
                  CERTAIN STATE LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED
                  WARRANTIES OR THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES.
                  IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE FOREGOING
                  DISCLAIMERS, EXCLUSIONS OR LIMITATIONS MAY NOT APPLY TO YOU,
                  AND YOU MIGHT HAVE ADDITIONAL RIGHTS
                </p>

                <div className="blue_heading">Indemnification</div>
                <p>
                  You hereby agree to indemnify, defend, and hold us, and our
                  licensors, licensees, successors, distributors, agents,
                  representatives and other authorized users, and each of their
                  respective officers, directors, owners, managers, members,
                  employees, agents, representatives and assigns (collectively,
                  the “Indemnified Parties“), harmless from and against any and
                  all loss, cost, damage, liability and expense (including,
                  without limitation, settlement costs and legal or other fees
                  and expenses) suffered or incurred by any of the Indemnified
                  Parties arising out of, in connection with or related to any
                  breach or alleged breach by you of these Terms of Use. You
                  shall use your best efforts to cooperate with us in the
                  defense of any claim. We reserve the right, at our own
                  expense, to employ separate counsel and assume the exclusive
                  defense and control of the settlement and disposition of any
                  claim that is subject to indemnification by you.
                </p>

                <div className="blue_heading">Effect of Headings</div>
                <p>
                  The subject headings of the paragraphs and subparagraphs of
                  these Terms of Use are included for convenience only and shall
                  not affect the construction or interpretation of any of its
                  provisions.
                </p>

                <div className="blue_heading">Entire Agreement; Waiver</div>
                <p>
                  These Terms of Use constitute the entire agreement between you
                  and Prime Coach pertaining to the Platform and Service and
                  supersede any and all prior and contemporaneous agreements,
                  representations, and understandings between us. No waiver of
                  any of the provisions of this Prime Coach shall be deemed, or
                  shall constitute, a waiver of any other provision, whether or
                  not similar, nor shall any waiver constitute a continuing
                  waiver. No waiver shall be binding unless executed in writing
                  by Prime Coach.
                </p>

                <div className="blue_heading">Notices</div>
                <p>
                  All notices, requests, demands, and other communications under
                  this Agreement shall be in writing and properly addressed as
                  follows:
                </p>
                <p>Prime Coach</p>
                <p>
                  <a href="#">info@primecoach.co</a>
                </p>

                <div className="blue_heading">
                  Governing Law; Venue; Arbitration
                </div>
                <p>
                  This Agreement shall be construed in accordance with, and
                  governed by, the laws of England and Wales as applied to
                  contracts that are executed and performed entirely in. The
                  exclusive venue for any arbitration or court proceeding based
                  on or arising out of this Agreement shall be London. Any
                  dispute between you and us, excluding any intellectual
                  property right infringement claims we pursue against you,
                  shall be settled solely by confidential binding arbitration
                  per the commercial arbitration rules. All claims must be
                  arbitrated on an individual basis, and cannot be consolidated
                  in any arbitration with any claim or controversy of anyone
                  else. All arbitration must occur in London. Each party shall
                  bear one half of the arbitration fees and costs incurred, and
                  each party is responsible for its own lawyer fees.
                </p>

                <div className="blue_heading">Severability</div>
                <p>
                  If any term, provision, covenant, or condition of these Terms
                  is held by an arbitrator or court of competent jurisdiction to
                  be invalid, void, or unenforceable, the rest of the Terms
                  shall remain in full force and effect and shall in no way be
                  affected, impaired, or invalidated.
                </p>

                <div className="blue_heading">Assignment</div>
                <p>
                  These Terms bind and inure to the benefit of the parties’
                  successors and assigns. These Terms are not assignable,
                  delegable, sub-licenseable or otherwise transferable by you.
                  Any transfer, assignment, delegation or sublicense by you is
                  invalid.
                </p>

                <div className="blue_heading">Modification of Terms</div>
                <p>
                  We may at any time amend these Terms. Such amendments are
                  effective immediately upon notice to you by us posting the new
                  Terms on this Platform. Any use of the Platform or Service by
                  you after being notified means you accept these amendments. We
                  reserve the right to update any portion of our Platform and
                  Service, including these Terms at any time. We will post the
                  most recent versions to the Platform and list the effective
                  dates on the pages of our Terms.
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

export default TermsAndConditions;
