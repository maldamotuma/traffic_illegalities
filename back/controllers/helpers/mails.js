module.exports.PasswordResetMail = (name, token) => {
    return `
    <p>
        <p>Hello ${name},</p>
        <p>There was a request to change your password!</p>
        <p>If you did not make this request then please ignore this email.</p>
        Otherwise, please click this link to change your password:
        <a
            style="margin-left: 20px;text-decoration: none; background: #ae5687;padding: 10px;color: #fff;cursor: pointer;border-radius: 10px;width: 300px;display: inline-block;text-align: center;"
            href="http://localhost:3000/forgot-password?_t=${token}">Click here</a></p>
    `;
}