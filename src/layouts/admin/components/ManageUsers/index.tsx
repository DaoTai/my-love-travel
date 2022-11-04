import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HeadlessTippy from '@tippyjs/react/headless';
import className from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { manageUsersSelector } from './selector';
import { faChevronDown, faClose, faEye, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { getUsers } from './actions';
import { AccountUser } from '~/layouts/components/Auth/interface';
import ModalDetail from './DetailUser';
import ModalDelete from './DeleteUser';
import styles from './styles.module.scss';
const cx = className.bind(styles);
const ManageUsers = () => {
    const dispatch = useDispatch();
    const listUser: AccountUser[] = useSelector(manageUsersSelector);
    const [searchValue, setSearchValue] = useState<string>('');
    const [showSelectTypes, setShowSelectTypes] = useState<boolean>(false);
    const [showModalDetail, setShowModalDetail] = useState<boolean>(false);
    const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
    const [detailUser, setDetailUser] = useState<AccountUser>();
    const [deleteUser, setDeleteUser] = useState({ name: '', id: 0 });
    const [selectedType, setSelectedType] = useState<string>('Khách hàng');
    const searchInputRef = useRef(Object(null));
    const filteredUsers = useMemo(() => {
        let result = listUser.filter((user: AccountUser) => user.role === selectedType);
        if (searchValue) {
            result = listUser.filter(
                (user: AccountUser) =>
                    user.role === selectedType && user.fullName?.toLowerCase().includes(searchValue.toLowerCase()),
            );
        }
        return result;
    }, [selectedType, listUser, searchValue]);

    const handleHideModal = useCallback(() => {
        setShowModalDetail(false);
        setShowModalDelete(false);
    }, []);

    // Dispatch get data users
    useEffect(() => {
        dispatch(getUsers());
    }, []);

    // Emptry search input
    const handleEmptySearch = () => {
        setSearchValue('');
        searchInputRef.current.focus();
    };

    // Show detail user
    const handleShowDetail = (user: AccountUser) => {
        setShowModalDetail(true);
        setDetailUser(user);
    };

    // Show delete user
    const handleShowDelete = (user: AccountUser) => {
        setShowModalDelete(true);
        setDeleteUser({
            id: user.idUser as number,
            name: user.fullName as string,
        });
    };
    return (
        <>
            <div id={cx('manage-users')}>
                <div className={cx('wrap-search-options')}>
                    <div className={cx('search-input')}>
                        <input
                            ref={searchInputRef}
                            type="text"
                            id={cx('search-input')}
                            placeholder="Tìm kiếm tên người dùng"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <FontAwesomeIcon icon={faClose} className={cx('close-icon')} onClick={handleEmptySearch} />
                    </div>
                    <div className={cx('select-type-user')}>
                        <HeadlessTippy
                            placement="bottom"
                            interactive
                            visible={showSelectTypes}
                            onClickOutside={() => setShowSelectTypes(false)}
                            render={(attrs) => (
                                <ul className={cx('list-type-select')} {...attrs}>
                                    <li className={cx('type')} onClick={() => setSelectedType('Khách hàng')}>
                                        Khách hàng
                                    </li>
                                    <li className={cx('type')} onClick={() => setSelectedType('Admin')}>
                                        Admin
                                    </li>
                                    <li className={cx('type')} onClick={() => setSelectedType('Người dẫn tour')}>
                                        Người dẫn tour
                                    </li>
                                </ul>
                            )}
                        >
                            <button onClick={() => setShowSelectTypes(!showSelectTypes)}>
                                <span>{selectedType}</span>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </button>
                        </HeadlessTippy>
                    </div>
                </div>
                <div className={cx('wrap-table')}>
                    <table id={cx('table-manage-users')}>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên tài khoản</th>
                                <th>Tên người dùng</th>
                                <th>Chi tiết người dùng</th>
                                <th>Xoá người dùng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers?.map((user: AccountUser, index: number) => {
                                return (
                                    <tr key={user.idUser}>
                                        <th>{index + 1}</th>
                                        <th>{user.username}</th>
                                        <th>{user.fullName}</th>
                                        <th>
                                            <FontAwesomeIcon
                                                className={cx('detail-icon')}
                                                icon={faEye}
                                                onClick={() => handleShowDetail(user)}
                                            />
                                        </th>
                                        <th>
                                            <FontAwesomeIcon
                                                className={cx('delete-icon')}
                                                icon={faTrashCan}
                                                onClick={() => handleShowDelete(user)}
                                            />
                                        </th>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal detail */}
            {showModalDetail && <ModalDetail user={detailUser} onHide={handleHideModal} />}
            {/* Modal delete */}
            {showModalDelete && <ModalDelete {...deleteUser} onHide={handleHideModal} />}
        </>
    );
};

export default ManageUsers;
