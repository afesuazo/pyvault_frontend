"use client";

import {Modal, ModalBody, ModalHeader, ModalContent, ModalFooter} from "@nextui-org/modal";
import {Button, Divider, Input} from "@nextui-org/react";
import {UserIcon, LockClosedIcon} from "@heroicons/react/24/outline";
import {signIn} from "next-auth/react";
import {useState} from "react";
import {AuthModalProps} from "@/interfaces";

export const AuthModal = ({isOpen}: AuthModalProps) => {

    const [enteredUsername, setEnteredUsername] = useState('')
    const [enteredPassword, setEnteredPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    if (!isOpen) return null;

    const loginHandler = async (event: any) => {
        event.preventDefault();

        const result = await signIn('login', {
            redirect: false,
            username: enteredUsername,
            password: enteredPassword
        })

        if (!result) {
            setErrorMessage('An error occurred!')
            return
        }

        if (result.error) {
            setErrorMessage(result.error)
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            placement="top-center"
            isDismissable={false}
            hideCloseButton={true}
            classNames={{
                body: "px-20"
            }}
        >
            <form onSubmit={loginHandler}>
                <ModalContent>
                    <ModalHeader className="my-5 flex flex-col text-center text-3xl gap-1">Log in</ModalHeader>
                    <ModalBody>
                        <Input
                            autoFocus
                            startContent={
                                <UserIcon className="w-6 h-6 text-default-400 pointer-events-none flex-shrink-0"/>
                            }
                            placeholder="Enter your username"
                            variant="underlined"
                            onChange={(e) => setEnteredUsername(e.target.value)}
                        />
                        <Input
                            startContent={
                                <LockClosedIcon className="w-6 h-6 text-default-400 pointer-events-none flex-shrink-0"/>
                            }
                            placeholder="Enter your password"
                            type="password"
                            className={`mt-4`}
                            variant="underlined"
                            onChange={(e) => setEnteredPassword(e.target.value)}
                        />
                        <Divider/>
                        <Button className="bg-primary-500 my-4" size={`lg`} type="submit">
                            Sign in
                        </Button>
                        <Divider/>
                    </ModalBody>
                    <ModalFooter className={`flex text-center justify-center mb-5`}>
                        <p>
                            Don't have an account?{" "}
                        </p>
                        <p className={`text-primary-500 cursor-pointer hover:text-neutral-500`} onClick={() => {console.log("Sign in")}}>
                           Sign up
                        </p>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    )
}