export interface NewPasswordData {
    phone: string;
    email: string;
    newPassword: string;
}

export interface NewPasswordRef {
    handleShowModal: () => void;
}
