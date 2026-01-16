import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    comments: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // El formulario se enviará a Formspree
    const form = e.target
    form.submit()
  }

  return (
    <section id="contact-me" className="scroll-mt-16 mt-32 md:mt-40 px-5">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-lato-bold text-text-primary dark:text-text-primary mb-5">
            Contact Me
          </h1>
          <p className="text-lg md:text-xl font-lato-medium text-text-secondary dark:text-text-secondary">
            Cultivating Connections: Reach Out and Connect with Me
          </p>
        </div>

        <form
          action="https://formspree.io/f/xvgbkply"
          method="POST"
          onSubmit={handleSubmit}
          autoComplete="off"
          className="mt-12 flex flex-wrap gap-6 md:gap-8 justify-center max-w-5xl mx-auto"
        >
          <div className="form-left flex flex-col gap-5 flex-1 min-w-[250px] max-w-[450px]">
            <div className="flex flex-col items-start gap-2">
              <label htmlFor="name" className="text-base text-text-secondary dark:text-text-secondary font-lato-medium font-semibold">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full h-12 px-3 rounded-lg bg-bg-card dark:bg-bg-card text-text-primary dark:text-text-primary text-base border-none focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex flex-col items-start gap-2">
              <label htmlFor="email" className="text-base text-text-secondary dark:text-text-secondary font-lato-medium font-semibold">
                E-Mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full h-12 px-3 rounded-lg bg-bg-card dark:bg-bg-card text-text-primary dark:text-text-primary text-base border-none focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex flex-col items-start gap-2">
              <label htmlFor="subject" className="text-base text-text-secondary dark:text-text-secondary font-lato-medium font-semibold">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full h-12 px-3 rounded-lg bg-bg-card dark:bg-bg-card text-text-primary dark:text-text-primary text-base border-none focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="form-right flex flex-col gap-5 flex-1 min-w-[250px] max-w-[500px]">
            <div className="flex flex-col items-start gap-2">
              <label htmlFor="comments" className="text-base text-text-secondary dark:text-text-secondary font-lato-medium font-semibold">
                Comments
              </label>
              <textarea
                id="comments"
                name="comments"
                placeholder="Write your message..."
                rows="5"
                value={formData.comments}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded-lg bg-bg-card dark:bg-bg-card text-text-primary dark:text-text-primary text-base border-none resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
            </div>
          </div>

          <input
            type="submit"
            value="Send"
            className="mt-8 px-6 py-3 rounded-lg bg-primary text-white font-lato-bold font-semibold cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/50"
          />

          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
        </form>
      </div>
    </section>
  )
}
