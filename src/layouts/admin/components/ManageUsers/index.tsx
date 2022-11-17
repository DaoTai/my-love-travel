import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HeadlessTippy from '@tippyjs/react/headless';
import className from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { manageUsersSelector } from './selector';
import { faAdd, faChevronDown, faClose, faEye, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { getUsers } from './actions';
import ModalDetail from './DetailUser';
import ModalDelete from './DeleteUser';
import ModalAdd from './AddUser';
import { AccountUser } from '~/layouts/components/Auth/interface';
import 'tippy.js/dist/tippy.css';
import styles from './styles.module.scss';
const cx = className.bind(styles);
const ManageUsers = () => {
    const dispatch = useDispatch();
    const listUser: AccountUser[] = useSelector(manageUsersSelector);
    const [searchValue, setSearchValue] = useState<string>('');
    const [showSelectTypes, setShowSelectTypes] = useState<boolean>(false);
    const [showModalAdd, setShowModalAdd] = useState<boolean>(false);
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
        setShowModalAdd(false);
        setShowModalDetail(false);
        setShowModalDelete(false);
    }, []);

    // Dispatch get data users
    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    // Emptry search input
    const handleEmptySearch = () => {
        setSearchValue('');
        searchInputRef.current.focus();
    };

    // Handle select type
    const handleSelectType = (type: string) => {
        setSelectedType(type);
        setShowSelectTypes(false);
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
                    <button id={cx('add-user-btn')} onClick={() => setShowModalAdd(true)}>
                        <FontAwesomeIcon icon={faAdd} />
                    </button>
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
                                    <li className={cx('type')} onClick={() => handleSelectType('Khách hàng')}>
                                        Khách hàng
                                    </li>
                                    <li className={cx('type')} onClick={() => handleSelectType('Admin')}>
                                        Admin
                                    </li>
                                    <li className={cx('type')} onClick={() => handleSelectType('Người dẫn tour')}>
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
                    {filteredUsers.length > 0 ? (
                        <table>
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
                                            <td>{index + 1}</td>
                                            <td>{user.username}</td>
                                            <td>{user.fullName}</td>
                                            <td>
                                                <FontAwesomeIcon
                                                    className="detail-icon"
                                                    icon={faEye}
                                                    onClick={() => handleShowDetail(user)}
                                                />
                                            </td>
                                            <td>
                                                <FontAwesomeIcon
                                                    className="delete-icon"
                                                    icon={faTrashCan}
                                                    onClick={() => handleShowDelete(user)}
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-center">Danh sách trống</p>
                    )}
                </div>
            </div>

            {/* Modal add */}
            <ModalAdd isOpen={showModalAdd} onHide={handleHideModal} />
            {/* Modal detail */}
            {showModalDetail && <ModalDetail user={detailUser} onHide={handleHideModal} />}
            {/* Modal delete */}
            {<ModalDelete isOpen={showModalDelete} onHide={handleHideModal} {...deleteUser} />}
        </>
    );
};

export default ManageUsers;
