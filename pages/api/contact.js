const mail = require('@sendgrid/mail');

mail.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req, res) => {
   const body = JSON.parse(req.body);

   const message = `
    Reason: ${body.reason}\r\n
    Message: ${body.message}\r\n
    Email: ${body.email}
  `;

   const data = {
      to: ['myrokyp@hotmail.com', 'pantelis-petrou@hotmail.com', 'yannakyp@gmail.com', 'info@theatralis.com.cy'],
      from: 'theatraliscy@gmail.com',
      subject: `New message to Theatralis via Contact Us form`,
      text: message,
      html: message.replace(/\r\n/g, '<br />'),
   };

   await mail.send(data);

   res.status(200).json({ status: 'OK' });
};
