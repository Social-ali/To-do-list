import React from 'react';
import './contact.css'; // Import the CSS file

function Contact() {
  return (
    <div className="section gray-bg" id="contactus">
      <div className="con">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="section-title">
              <h2>Get In Touch</h2>
              <p>I design and develop services for customers of all sizes, specializing in creating stylish, modern websites.</p>
            </div>
          </div>
        </div>
        <div className="row flex-row-reverse">
          <div className="col-md-7 col-lg-8 m-15px-tb">
            <div className="contact-form">
              <form action="/" method="post" className="contactform contact_form" id="contact_form">
                <div className="returnmessage valid-feedback p-15px-b" data-success="Your message has been received. We will contact you soon."></div>
                <div className="empty_notice invalid-feedback p-15px-b"><span>Please fill required fields.</span></div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input id="name" type="text" placeholder="Full Name" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input id="email" type="text" placeholder="Email Address" className="form-control" />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <input id="subject" type="text" placeholder="Subject" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <textarea id="message" placeholder="Message" className="form-control" rows="3"></textarea>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="send">
                      <button id="send_message" className="px-btn theme" type="submit"><span>Contact Us</span> <i className="arrow"></i></button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-5 col-lg-4 m-15px-tb">
            <div className="contact-name">
              <h5>Mail</h5>
              <p>iNotebook@inname.com</p>
            </div>
            <div className="contact-name">
              <h5>Visit My iNotebook </h5>
              <p>Shahrafaisal,colony <br />A-255 Karachi</p>
            </div>
            <div className="contact-name">
              <h5>Phone</h5>
              <p>+92 123 654 8096</p>
            </div>
            <div className="social-share nav">
              <button className="dribbble" onClick={() => window.open('https://dribbble.com', '_blank')}>
                <i className="fab fa-dribbble"></i>
              </button>
              <button className="behance" onClick={() => window.open('https://behance.net', '_blank')}>
                <i className="fab fa-behance"></i>
              </button>
              <button className="linkedin" onClick={() => window.open('https://linkedin.com', '_blank')}>
                <i className="fab fa-linkedin-in"></i>
              </button>
            </div>
          </div>
        </div>
        {/* Map Location */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d115839.52327296759!2d67.0892032!3d24.8643584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1724231895495!5m2!1sen!2s"
                width="150%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Contact;
