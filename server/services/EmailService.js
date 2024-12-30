import nodemailer from 'nodemailer'

export function sendMail(email) {
    const transporter = nodemailer.createTransport(
        {
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_ADDRESS,
                pass: process.env.GMAIL_PASSWORD
            },
            from: "momentom.goal@gmail.com"
        }
    );

    var mailOptions = {
        from: '"MomenTom" <momentom.goal@gmail.com>',
        to: `${email}`, 
        subject: 'Monthly Goal Progress',
        template: 'email', 
        html: "<b style='color:blue'>Click the link to view the summary of your December goal progress.</b>",
        text: "Order received"
    };

    // trigger the sending of the E-mail
    transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
}