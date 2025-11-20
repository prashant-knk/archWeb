# EmailJS Setup Instructions

The contact form is set up to use EmailJS to send emails when someone fills out the form. Follow these steps to configure it:

## Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (free tier allows 200 emails/month)

## Step 2: Create an Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions to connect your email account
5. Note down your **Service ID**

## Step 3: Create an Email Template

1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template structure:

```
Subject: New Contact Form Submission from {{from_name}}

From: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}

Message:
{{message}}

---
This email was sent from the Kala & Kriti website contact form.
```

4. Set the **To Email** field to: `sales@kalankriti.in`
5. Note down your **Template ID**

## Step 4: Get Your Public Key

1. Go to **Account** → **General** in your EmailJS dashboard
2. Find your **Public Key** (also called User ID)

## Step 5: Update the Code

Open `script.js` and replace these placeholders:

1. Line 128: Replace `YOUR_PUBLIC_KEY` with your EmailJS Public Key
2. Line 141: Replace `YOUR_SERVICE_ID` with your Service ID
3. Line 142: Replace `YOUR_TEMPLATE_ID` with your Template ID

Example:
```javascript
emailjs.init("abc123xyz"); // Your Public Key

await emailjs.send(
    'service_abc123',      // Your Service ID
    'template_xyz789',     // Your Template ID
    {
        // ... rest of the code
    }
);
```

## Step 6: Test the Form

1. Open your website
2. Fill out the contact form
3. Submit it
4. Check your email inbox (sales@kalankriti.in) for the form submission

## Alternative: Using Formspree (Simpler Option)

If you prefer a simpler setup without EmailJS, you can use Formspree:

1. Go to [https://formspree.io/](https://formspree.io/)
2. Sign up for a free account
3. Create a new form
4. Get your form endpoint URL
5. In `index.html`, change the form tag to:
   ```html
   <form id="contact-form" class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
6. Remove the EmailJS script and JavaScript code, as Formspree handles it automatically

## Troubleshooting

- **Form not sending**: Check browser console for errors
- **Email not received**: Verify your EmailJS service is connected and template is correct
- **Rate limit**: Free tier has limits; upgrade if needed

For more help, visit [EmailJS Documentation](https://www.emailjs.com/docs/)

