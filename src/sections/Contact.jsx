import emailjs from "emailjs-com";

export default function Contact() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await emailjs.sendForm(
        "service_rr7l3uu",
        "template_gr0mitk",
        e.target,
        "G3_E2yuKRSEURv8gu"
      );

      alert("Message sent successfully!");
      e.target.reset();
    } catch (error) {
      console.error(error);
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <section className="px-[8%] py-28">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT */}
        <div>
          <h3 className="text-sm uppercase tracking-widest text-sky-400">
            Contact
          </h3>

          <h2 className="mt-4 text-4xl font-semibold text-slate-100 leading-tight">
            Let’s build something <br />
            <span className="text-gradient">meaningful together</span>
          </h2>

          <p className="mt-6 text-base text-slate-400 max-w-md">
            I’m open to frontend developer opportunities.
            Drop a message and I’ll get back to you.
          </p>
        </div>

        {/* RIGHT */}
        <div className="rounded-2xl bg-slate-900/50 border border-white/10 p-8">
          <h4 className="text-lg font-medium text-slate-100">
            Send me a message
          </h4>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your name"
                className="contact-input"
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Your phone number"
                className="contact-input"
              />

              <input
                type="email"
                name="email"
                placeholder="Your email"
                className="contact-input"
                required
              />
            </div>

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className="contact-input"
              required
            />

            <textarea
              rows="4"
              name="message"
              placeholder="Your message"
              className="contact-input resize-none"
              required
            ></textarea>

            <button
              type="submit"
              className="mt-4 rounded-full bg-sky-400 px-8 py-3 text-sm font-medium text-slate-900 hover:-translate-y-0.5 transition"
            >
              Send Message
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
