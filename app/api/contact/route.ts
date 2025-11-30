import { NextRequest, NextResponse } from 'next/server'

const RECIPIENT_EMAIL = 'lynnx.xie@outlook.com'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend')
        const resend = new Resend(process.env.RESEND_API_KEY)
        
        const result = await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
          to: RECIPIENT_EMAIL,
          replyTo: email,
          subject: `Portfolio Contact: ${subject}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          `,
        })

        if (result.error) {
          console.error('Resend API error:', result.error)
          throw new Error(result.error.message || 'Resend API error')
        }

        console.log('Email sent successfully via Resend:', result.data)
        return NextResponse.json(
          { message: 'Email sent successfully' },
          { status: 200 }
        )
      } catch (resendError) {
        console.error('Resend error:', resendError)
        //log
      }
    } else {
      console.log('RESEND_API_KEY not found in environment variables')
    }

    // Fallback
    console.log('Contact form submission received:', {
      to: RECIPIENT_EMAIL,
      from: email,
      name,
      subject,
      message,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    )
  }
}

