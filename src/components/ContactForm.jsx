import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'

export default function ContactForm() {
  const formRef = useRef()
  const [isSending, setIsSending] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSending(true)

    emailjs.sendForm(
      'service_bkp9ew4', 
      'template_7b6zssd', // Template ID
      formRef.current, 
      '68MZhNiekgSGwxViX'   // Public Key
    )
    .then(() => {
        alert('¡Mensaje enviado con éxito! 🚀')
        setFormData({ name: '', email: '', subject: '', message: '' })
    })
    .catch((error) => {
        alert('Hubo un error al enviar el mensaje.')
        console.error('EmailJS Error:', error)
    })
    .finally(() => {
        setIsSending(false)
    })
  }
const inputStyles = "w-full px-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 " +
                      // MODO CLARO: El gris que pediste con texto negro
                      "bg-[rgb(176,176,176)] text-black placeholder-gray-600 " +
                      // MODO OSCURO: El gris oscuro mate con texto blanco
                      "dark:bg-[#151516] dark:text-white dark:placeholder-gray-500"

  return (
    <section id="contact-me" className="scroll-mt-16 mt-32 md:mt-40 px-5">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-lato-bold text-text-dark dark:text-text-primary mb-5">
            Contact Me
          </h1>
          <p className="text-lg md:text-xl font-lato-medium text-text-secondary dark:text-text-secondary">
            Cultivating Connections: Reach Out and Connect with Me
          </p>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          autoComplete="off"
          className="mt-12 flex flex-wrap gap-6 md:gap-8 justify-center max-w-5xl mx-auto"
        >
          <div className="form-left flex flex-col gap-5 flex-1 min-w-[250px] max-w-[450px]">
            {/*Campo NAME*/}
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
                className={`${inputStyles} h-12`}
              />
            </div>

            {/*Campo EMAIL*/}
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
                className={`${inputStyles} h-12`}
              />
            </div>

            {/*Campo SUBJECT*/}
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
                className={`${inputStyles} h-12`}
              />
            </div>
          </div>

          <div className="form-right flex flex-col gap-5 flex-1 min-w-[250px] max-w-[500px]">
            {/*Campo MESSAGE*/}
            <div className="flex flex-col items-start gap-2">
              <label htmlFor="message" className="text-base text-text-secondary dark:text-text-secondary font-lato-medium font-semibold">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Write your message..."
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                className={`${inputStyles} py-3 resize-none`}
              ></textarea>
            </div>
          <button
            type="submit"
            disabled={isSending}
            className={`mt-8 px-6 py-3 rounded-lg text-white font-lato-bold font-semibold transition-all duration-300 hover:scale-105 ${
                isSending ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:shadow-lg hover:shadow-primary/50'
            }`}
          >
            {isSending ? 'Sending...' : 'Send'}
          </button>
          </div>

        </form>
      </div>
    </section>
  )
}