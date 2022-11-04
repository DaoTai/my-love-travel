import { AccountUser } from '~/layouts/components/Auth/interface';

export interface DetailUserProps {
    user: AccountUser | undefined;
    onHide: () => void;
}
