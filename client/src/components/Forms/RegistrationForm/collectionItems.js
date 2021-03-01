export const onlyLetters = () => {return e => /[-.;"!@#$%ˆ&*():<>|,§_/'=?/\d/]/.test(e.key) && e.preventDefault()}
export const onlyNumbers = () => {return e => /[-.;"!@#$%ˆ&*():<>|,§_/'=?a-zA-Zа-яА-Я]/.test(e.key) && e.preventDefault()}

export const collectionItemsForm = [
  { name: "firstName", label: "First Name", rules:[{required: true, message: 'Please enter your First Name!'}, {min: 2, message: 'Must be min 2 characters'}, {max: 24, message: 'Max 25 characters'}],maxLength: 25,onKeyPress: onlyLetters()},
  { name: "lastName", label: "Last Name", rules:[{required: true, message: 'Please enter your Last Name!'}, {min: 2, message: 'Must be min 2 characters'}, {max: 24, message: 'Max 25 characters'}],maxLength: 25,onKeyPress: onlyLetters()},
  { name: "login", label: "Login", rules: [{required: true, message: 'Please enter your Login'}, {min: 3, message: 'Must be min 2 characters'}, {max: 10, message: 'Max 10 characters'}],maxLength: 10},
  { name: "email", label: "E-mail", rules: [{required: true, message: 'Please enter your E-mail!'}, {type: "email", messageType: 'The entered e-mail is not valid!'}],maxLength: 35},
  { name: "password", label: "Password", rules: [{required: true, message: 'Please enter your password!'}, {min: 7, message: 'Must be min 7 characters'}, {max: 24, message: 'Max 25 characters'}],maxLength: 25},
  { name: "phone", label: "Phone Number", rules: [{required: true, message: 'Please enter your phone number!'}, {min:13, max:13, message: 'The phone number must contain 13 characters'}],maxLength: 13, onKeyPress: onlyNumbers()}
];


export const collectionItemsCheckoutAddress = [
  { name: "fullName", label: "Full name", rules:[{required: true, message: 'Please enter your Full Name!'}]},
  { name: "email", label: "E-mail", rules:[{required: true, message: 'Please enter your E-mail!'},{type: 'email', messageType: 'The entered e-mail is not valid!'}]},
  { name: "address", label: "Address", rules:[{required: true, message: 'Please enter your address!'}]},
  { name: "city", label: "City", rules:[{required: true, message: 'Please enter your city!'}]},
  { name: "zip", label: "Zip", rules:[{required: true, message: 'Please enter your zip!'}]},
  { name: "phone", label: "Phone Number", rules: [{required: true, message: 'Please enter your phone number!'}, {min:13, max:13, message: 'The phone number must contain 13 characters'}],maxLength: 13, onKeyPress: onlyNumbers()}
]

export const collectionItemsProfileChangePassword = [
  { name: "oldPassword", label: "Old Password", rules: [{required: true, message: 'Please enter your old password!!'}, {min: 7, message: 'Must be min 7 characters'}, {max: 25, message: 'Must be max 25 characters'}],feedback:false},
  { name: "newPassword", label: "New password", rules: [{required: true, message: 'Please enter your password!'}, {min: 7, message: 'Must be min 7 characters'}, {max: 25, message: 'Must be max 25 characters'}],feedback:false},
  { name: "confirmPassword", label: "Confirm new password", feedback:true, rules: [{required: true, message: 'Please enter your password!'}, {min: 7, message: 'Must be min 7 characters'}, {max: 25, message: 'Must be max 25 characters'}, ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue('newPassword') === value) {
          return Promise.resolve();
        }
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject('The two passwords that you entered do not match!');
      },
    })]},

]