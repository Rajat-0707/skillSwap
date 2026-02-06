import '../css/contactus.css'
const ContactUs = () => {
  return (
    <>

    <div className="contactus-container" id='contactus'>
        <h1>Contact Us</h1> 
        <div className="contactt">
            <div className="contact-info">
                <h1>Contact Information</h1>
                <p>Email: contact@skillswap.com</p>
                <p>Phone: +1234567890</p>
                <p>Address: </p>
            </div>
            <div className="contact-msg">
                <h1>Send Us a Message</h1>
                <input type="text" placeholder="Your Name" />
                <input type="email" placeholder="Your Email" />
                <textarea placeholder="Your Message"></textarea>
                <button><span>Send Message</span></button>
            </div>
        </div>
    </div>

    </>
  )
}

export default ContactUs