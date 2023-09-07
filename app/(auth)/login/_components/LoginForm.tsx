"use client"
import {useTransition} from "react";
import {signIn} from "next-auth/react";

const LoginForm = () => {
    const [isPending, startTransition] = useTransition();

    return (
        <div>
            <h1>{isPending ? 'pending...': 'no pending'}</h1>
            <form onSubmit={ (event) => {
                event.preventDefault();

                startTransition(async () => {

                    const result = await signIn('credentials', {
                        username: 'asdf',
                        password: 'asdfs',
                        redirect: false
                    })

                    if(result?.ok){
                        console.log('success')
                    }
                })

            }}>
                <input name={"username"} type="text"/><br/>
                <input name={"password"} type="password"/><br/>
                <button disabled={isPending} type={'submit'}>
                    {isPending ? 'submitting...': 'submit'}
                </button>
            </form>
        </div>
    );
};

export default LoginForm;