const nodemailer = require('nodemailer')

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            },
        })
    }

    async sendActivationMail(to, link) {
        console.log(to, link)
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'activation of account: ' + process.env.API_URL,
            text: "",
            html: `
                 <div>
                    <h1>для активации перейдите по ссылке приложенной ниже</h1>
                    <a href="${link}">click</a>
                  </div>
                  `
        })
    }
}

module.exports = new MailService()