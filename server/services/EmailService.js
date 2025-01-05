import nodemailer from 'nodemailer'

export async function sendMail(email) {
    try{
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
            to: email.recipientAddress, 
            subject: email.subject,
            template: 'email', 
            html: email.message,
            text: "Message Received"
        };
    
        // trigger the sending of the E-mail
     transporter.sendMail(mailOptions, function (error, response) {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });
    }
    catch(err){
        console.log(err)
    }
}