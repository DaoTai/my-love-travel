import { useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faEllipsis, faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import style from '../styles.module.scss';
import HeadlessTippy from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import { Comment } from '../../interface';
const cx = classNames.bind(style);
const MyComment = ({ myAccount, myComment }: { myAccount: any; myComment: Comment }) => {
    const [showComment, setShowComment] = useState<boolean>(true);
    const [showOptions, setShowOptions] = useState<boolean>(false);

    const handleDeleteComment = () => {
        console.log(myComment.id);
        setShowComment(false);
    };
    return (
        <>
            {showComment && (
                <div key={myComment.id} className={cx('other-comments')}>
                    <img src={myAccount.avatar} alt="avatar" className={cx('avatar')} />
                    <div className={cx('wrap-input-comment')}>
                        <span>{myAccount.nameAccount}</span>
                        <div className={cx('time-comment')}>
                            <FontAwesomeIcon icon={faClock} />
                            <span>{myComment.time}</span>
                        </div>
                        <input readOnly type="text" value={myComment.comment} className={cx('input-comment')} />
                    </div>
                    <div className={cx('options-comment')}>
                        <HeadlessTippy
                            interactive
                            visible={showOptions}
                            render={(attrs) => (
                                <div className={cx('options-container')} {...attrs}>
                                    <p className={cx('option')}>
                                        <FontAwesomeIcon icon={faPencil} />
                                        Sửa
                                    </p>
                                    <p className={cx('option')} onClick={handleDeleteComment}>
                                        <FontAwesomeIcon icon={faTrashCan} />
                                        Xoá
                                    </p>
                                </div>
                            )}
                            onClickOutside={() => setShowOptions(false)}
                        >
                            <div
                                className={cx('option-icon', {
                                    active: showOptions,
                                })}
                                onClick={() => setShowOptions(!showOptions)}
                            >
                                <FontAwesomeIcon icon={faEllipsis} />
                            </div>
                        </HeadlessTippy>
                    </div>
                </div>
            )}
        </>
    );
};

export default MyComment;
