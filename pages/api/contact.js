const mail = require('@sendgrid/mail');

mail.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req, res) => {
   const body = JSON.parse(req.body);

   const message = `
    Subject: ${body.subject}\r\n
    Message: ${body.message}
  `;

   const data = {
      to: 'theatraliscy@gmail.com, myrokyp@hotmail.com, pantelis-petrou@hotmail.com, yannakyp@gmail.com',
      from: 'theatraliscy@gmail.com',
      subject: `New message to Theatralis via Contact Us form`,
      text: message,
      html: message.replace(/\r\n/g, '<br />'),
   };

   await mail.send(data);

   res.status(200).json({ status: 'OK' });
};
