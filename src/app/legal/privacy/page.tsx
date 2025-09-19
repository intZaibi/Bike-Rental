
import styles from '../style.module.css'; // Import css modules stylesheet as styles


const Privacy = () => {
  const price = "$6.99";
  return (
    <>
      <div className={styles.form_wrapper}>
      <h2 style={{color: 'black'}}>Privacy Policy</h2>
      <p className={styles.terms}>
        {`
 Lighting Bike — Privacy Policy

Last updated: April 15, 2025

 1) Information we collect

A. You provide

 Account details (name, email, phone, password).
 Identity/age verification where required (e.g., government ID, selfie check).
 Delivery and pickup addresses; access notes.
 Payment details processed by our payment processors (we do not store full card numbers).
 Communications with support, reviews, survey responses.

B. Collected automatically

 Device and app data (IP, device identifiers, OS/browser, app version, crash logs).
 Usage data (pages viewed, clicks, referral/source, timestamps).
 Cookies and similar technologies.
 Telematics from our fleet: approximate and/or precise location, lock/battery status, motion/fault codes—used for logistics, safety, loss prevention, and support.

 2) Disclosing your information

We share personal information only as described below:

 Service providers/processors: cloud hosting, analytics/advertising (including Google), payment processing, mapping/geocoding, SMS/email, identity verification, customer support tools, and logistics.
 Business operations: professional advisors, auditors, insurers.
 Legal & safety: to comply with law, enforce terms, protect our rights, prevent fraud/theft, or respond to lawful requests.
 Business transfers: as part of a merger, acquisition, financing, or asset sale.
 
 We do not sell personal information for money. We may share certain identifiers and internet/activity data with advertising partners for cross‑context behavioral advertising.


 3) Location & telematics

We use telematics (including location, battery, lock status) to coordinate deliveries/pickups, provide support, prevent loss/theft, and maintain safety. Real‑time location may be accessed by authorized staff and service providers for these purposes only. You can’t disable core telematics while renting, as it is essential to the service.

---

 4) Cookies & similar technologies

This website uses cookies to better the user’s experience while visiting the website. A cookie is a small amount of data, which may include a unique identifier. Cookies are sent to your browser from a website and stored on your device. We assign a different cookie to each device that accesses our website. This website uses a cookie control system allowing the user to the website to confirm the use of cookies on their computer/device.

Cookies are small files saved to the user's computer hard drive that track, save, and store information about the user's interactions and usage of the website. This allows the website, through its server, to provide the users with a tailored experience within this website. Cookies are used for shopping cart fulfillment and abandoned cart engagement. Cookies can be disabled through your web browsing software.

This website uses tracking software to monitor its visitors to better understand how they use it. This software includes Google Analytics which uses cookies to track visitor usage (you can read Google's privacy policy at the following link: https://policies.google.com/privacy). To opt out of Google Analytics, please visit https://tools.google.com/dlpage/gaoptout.

Additionally, we partner with Mouseflow to capture how you use and interact with our website through behavioral metrics, heatmaps, and session replay to improve and market our products/services. Website usage data is captured using first and third-party cookies and other tracking technologies to determine the popularity of products/services and online activity. We use this information for site optimization, fraud/security purposes, and advertising. For more information about how Mouseflow collects and uses your data, visit the Mouseflow Privacy Statement.

Other cookies may be stored to your computer’s hard drive by external vendors when this website uses referral programs, sponsored links, or adverts. Such cookies are used for conversion and referral tracking and typically expire after 30 days, though some may take longer. We work with a number of third party services to ensure your shopping experience is optimal. All relevant third parties have their own privacy policies. All requests regarding our privacy policy and personal information stored should be directed to info@lightingbike.com.

 5) Data retention

We keep information only as long as needed:

 Account/contact data: life of account + up to 3 years.
 Transactions and invoices: up to 7 years (tax/accounting).
 Support tickets: up to 3 years after closure.
 Telematics/location logs: typically 30–180 days, longer if needed for safety, fraud/theft investigations, or legal obligations.
  We may retain de‑identified/aggregated data indefinitely.


 6) Security

We use administrative, technical, and physical safeguards (encryption in transit, access controls, logging). No method is 100% secure; please use strong passwords and keep credentials private. If we believe the security of your data has been compromised, we will take steps consistent with applicable law.


 7) Your privacy rights

California (CPRA) and certain US states: You may request to know/access, delete, correct, and port personal information. You may also opt out of “sharing” for cross‑context behavioral advertising. We do not sell your data for money. Use the in‑app privacy settings or email [support@lightingbike.com](mailto:support@lightingbike.com) with the subject “Privacy Request.” If you opt out, you may still see non‑personalized ads.

EEA/UK (GDPR): You have rights to access, rectify, erase, restrict or object to processing, data portability, and to withdraw consent at any time. You can lodge a complaint with your local supervisory authority.

Do Not Track: We currently do not respond to DNT signals.

We may need to verify your identity before acting on requests. Authorized agents may submit requests where permitted by law.


 8) International data transfers

If we transfer your data outside your region (e.g., to the United States), we rely on appropriate safeguards such as Standard Contractual Clauses and implement additional protections as needed.

 9) Children’s privacy

Our services are not directed to children under 13, and we do not knowingly collect personal information from them. If you believe a child provided us data, contact us and we will take appropriate action.

 10) Communications & marketing

We may send you service emails (rentals, receipts, security, updates). With your consent where required, we may send marketing messages; you can opt out using the link in the message or via account settings. Opting out won’t affect essential service communications.

 11) Changes to this policy

We may update this Privacy Policy from time to time. Material changes will be notified via the app/site or email. Your continued use after the effective date means you accept the updated policy.

 12) Contact us

 Please contact us at our email address below for any questions:
Email: support@lightingbike.com


        `}
      </p>
        </div>
  </>
  );
}

export default Privacy;