const mail = require('@sendgrid/mail');

mail.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req, res) => {
   const body = JSON.parse(req.body);

   const message = `
    Subject: ${body.subject}\r\n
    Message: ${body.message}
  `;

   const data = {
      to: 'theatraliscy@gmail.com',
      from: 'theatraliscy@gmail.com',
      subject: `New message from Theatralis Contact Us`,
      text: message,
      html: message.replace(/\r\n/g, '<br />'),
   };

   await mail.send(data);

   res.status(200).json({ status: 'OK' });
};
