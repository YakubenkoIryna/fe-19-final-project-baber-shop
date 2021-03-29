import Ajax from "./Ajax";

class MailService {
    OK = 'ok';
    NOK = 'nok';

    async subscribe(email) {
        const subscriptionStatus = await this.checkSubscriptionStatus(email);
        if (subscriptionStatus != null) {
            if (!subscriptionStatus) {
                // existing unsubscribed customer
                try {
                    const {checksum, url} = this.prepareUnsubscribeData(email);

                    await this.updateCustomer(email, {
                        enabled: true,
                        letterSubject: 'Welcome back to Barber shop',
                        letterHtml: `<h1>Hello again and welcome back!</h1><div><a href="${url}">Unsubscribe :(</a></div>`,
                        checksum
                    })
                    return {
                        status: this.OK,
                        message: 'Welcome back!'
                    }
                } catch (err) {

                }
            } else {
                // already subscribed
                return {
                    status: this.NOK,
                    message: 'Email is already subscribed.'
                }
            }
        } else {
            // new customer
            try {
                const {checksum, url} = this.prepareUnsubscribeData(email);

                await Ajax.post('/subscribers', {
                    email,
                    letterSubject: 'Welcome to Barber shop',
                    letterHtml: `<h1>Hello and welcome!</h1><div><a href="${url}">Unsubscribe :(</a></div>`,
                    checksum
                });
                return {
                    status: this.OK,
                    message: 'Successfully subscribed.'
                }
            } catch (err) {
                //
            }
        }
        return {
            status: this.NOK,
            message: 'Internal error, please try again later :('
        }
    }

    prepareUnsubscribeData(email) {
        const checksum = btoa(Math.random().toString(36).substring(7));
        const url = window.location.protocol + '//' + window.location.host + `/unsubscribe?email=${encodeURIComponent(email)}&check=${encodeURIComponent(checksum)}`;
        return {checksum, url};
    }

    async unsubscribe(email, checksum) {
        try {
            const subs = await this.getSubscriber(email);

            if (subs.checksum === checksum) {
                await this.updateCustomer(email, {
                    enabled: false,
                    letterSubject: 'Barbershop says goodbye!',
                    letterHtml: '<h1>Thanks and goodbye!</h1>',
                    checksum: this.prepareUnsubscribeData(email).checksum
                })
                return true;
            }
        } catch (err) {
            //
        }
        return false;
    }

    async getSubscriber(email) {
        try {
            return await Ajax.get(`/subscribers/${email}`);
        } catch (err) {
            return null;
        }
    }

    async checkSubscriptionStatus(email) {
        try {
            return (await this.getSubscriber(email)).enabled;
        } catch (err) {
            return null;
        }
    }

    async updateCustomer(email, data) {
        await Ajax.put('/subscribers/email', email, data)
    }
}

export default new MailService();