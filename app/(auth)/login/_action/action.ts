'use server'

import {signIn} from "next-auth/react";

export const login = async (formData: FormData) => {
    console.log(formData.get('username'));
    console.log(formData.get('password'));

    return signIn('credentials', {
        username: formData.get('username'),
        password: formData.get('password'),
    })
}