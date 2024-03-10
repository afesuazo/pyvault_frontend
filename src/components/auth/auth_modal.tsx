"use client";

import {Modal, ModalBody, ModalHeader, ModalContent, ModalFooter} from "@nextui-org/modal";
import {Button, Checkbox, Input} from "@nextui-org/react";
import {MailIcon, Lock} from "@nextui-org/shared-icons";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import {useState} from "react";

export const AuthModal = ({isOpen, onClose} : AuthModalProps) => {

    const [enteredUsername, setEnteredUsername] = useState('')
    const [enteredPassword, setEnteredPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    if (!isOpen) return null;

    const loginHandler = async () => {
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

        if(result.ok) {
            onClose()
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            placement="top-center"
            isDismissable={false}
            hideCloseButton={true}
        >
            <ModalContent>
                <ModalHeader className="flex flex-col text-center gap-1">Log in</ModalHeader>
                <ModalBody>
                    <Input
                        autoFocus
                        endContent={
                            <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        label="Email"
                        placeholder="Enter your email"
                        variant="bordered"
                        onChange={(e) => setEnteredUsername(e.target.value)}
                    />
                    <Input
                        endContent={
                            <Lock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        variant="bordered"
                        onChange={(e) => setEnteredPassword(e.target.value)}
                    />
                    <div className="flex py-2 px-1 justify-between">
                        <Checkbox
                            classNames={{
                                label: "text-small",
                            }}
                        >
                            Remember me
                        </Checkbox>
                        <Link color="primary" href="#" >
                            Forgot password?
                        </Link>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onPress={loginHandler}>
                        Sign in
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}