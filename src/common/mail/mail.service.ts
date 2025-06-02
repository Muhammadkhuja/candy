import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { User } from "../../user/entities/user.entity";
import { Admin } from "../../admin/entities/admin.entity";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(patient: User) {
    const url = `${process.env.API_HOST}/api/user/activate/${patient.activation_link}`;

    await this.mailerService.sendMail({
      to: patient.email,
      subject: "Hush kelib siz",
      html: `<h1>Salom ! ${patient.name}</h1>
            <h2> Linkni bosing va akkauntingizni activatsiya qiling </h2>
            <p><a href="${url}">Tasdiqlash link<a/></p>`,
    });
  }

  async sendMailAd(patient: Admin) {
    const url = `${process.env.API_HOST}/api/admin/activate/${patient.activation_link}`;

    await this.mailerService.sendMail({
      to: patient.email,
      subject: "Hush kelib siz",
      html: `<h1>Salom ! ${patient.name}</h1>
            <h2> Linkni bosing va akkauntingizni activatsiya qiling </h2>
            <p><a href="${url}">Tasdiqlash link<a/></p>`,
    });
  }
}
