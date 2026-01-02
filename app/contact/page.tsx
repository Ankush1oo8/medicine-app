"use client"

import { useState } from 'react'

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitMessage('Message sent successfully!')
        e.currentTarget.reset()
      } else {
        const error = await response.json()
        setSubmitMessage(error.error || 'Failed to send message')
      }
    } catch (error) {
      setSubmitMessage('Failed to send message')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border bg-card p-6 md:p-8">
          <h1 className="text-3xl font-bold">Contact Us</h1>
          <p className="mt-2 text-muted-foreground leading-relaxed">
            We’re here to help with product queries, orders, and account support.
          </p>

          <div className="mt-6 space-y-2 text-sm">
            <p>
              <span className="font-medium">Support Email:</span> vimalpharmaassociate@gmail.com
            </p>
            <p>
              <span className="font-medium">Phone:</span>  +91 7975469866
            </p>
            <p>
              <span className="font-medium">Address:</span> Ground floor 356/28/2 HMT main road., Bengaluru, KARNATAKA 560054 IN
            </p>
          </div>

          {/* <div className="mt-6 rounded-xl bg-secondary p-4 text-sm">
            <p>
              <span className="font-medium">Hours:</span> Mon–Sat, 9:00 AM – 7:00 PM IST
            </p>
            <p className="mt-1">
              <span className="font-medium">SLA:</span> We aim to respond within 24–48 hours.
            </p>
            <p className="mt-1">
              <span className="font-medium">Escalation:</span> escalate@pharma-store.demo
            </p>
          </div> */}
        </section>

        <section className="rounded-2xl border bg-card p-6 md:p-8">
          <h2 className="text-xl font-semibold">Send us a message</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Fill out the form below and we'll get back to you soon.
          </p>

          <form
            className="mt-6 space-y-4"
            onSubmit={handleSubmit}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col text-sm">
                <span className="mb-1 font-medium">Name</span>
                <input
                  name="name"
                  className="rounded-md border bg-background px-3 py-2"
                  placeholder="Your name"
                  required
                />
              </label>
              <label className="flex flex-col text-sm">
                <span className="mb-1 font-medium">Email</span>
                <input
                  name="email"
                  type="email"
                  className="rounded-md border bg-background px-3 py-2"
                  placeholder="you@example.com"
                  required
                />
              </label>
            </div>
            <label className="flex flex-col text-sm">
              <span className="mb-1 font-medium">Subject</span>
              <input
                name="subject"
                className="rounded-md border bg-background px-3 py-2"
                placeholder="How can we help?"
              />
            </label>
            <label className="flex flex-col text-sm">
              <span className="mb-1 font-medium">Message</span>
              <textarea
                name="message"
                className="min-h-[120px] rounded-md border bg-background px-3 py-2"
                placeholder="Write your message..."
                required
              />
            </label>

            {submitMessage && (
              <p className={`text-sm ${submitMessage.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                {submitMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-primary-foreground md:w-auto disabled:opacity-50"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </section>
      </div>
    </div>
  )
}
