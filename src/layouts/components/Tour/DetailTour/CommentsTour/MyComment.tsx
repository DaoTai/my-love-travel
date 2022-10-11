import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faEllipsis, faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import style from '../styles.module.scss';
import HeadlessTippy from '@tippyjs/react/headless';
import { Comment } from '../../interface';
const cx = classNames.bind(style);
const MyComment = ({ myAccount, myComment }: { myAccount: any; myComment: Comment }) => {
    const [comment, setComment] = useState<string>(myComment.comment);
    const [showComment, setShowComment] = useState<boolean>(true);
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const commentRef = useRef<HTMLInputElement>(Object(null));
    const hideShowOptions = () => {
        setShowOptions(false);
    };
    useEffect(() => {
        window.addEventListener('scroll', hideShowOptions);
        return () => {
            window.removeEventListener('scroll', hideShowOptions);
        };
    }, []);

    // Delete comment
    const handleDeleteComment = () => {
        console.log(myComment.id);
        setShowComment(false);
    };
    // Update comment
    const handleUpdateComment = () => {
        setShowOptions(false);
        commentRef.current.readOnly = false;
        commentRef.current.focus();
    };
    return (
        <>
            {showComment && (
                // My comments
                <div className={cx('my-comments')}>
                    <img src={myAccount.avatar} alt="avatar" className={cx('avatar')} />
                    <div className={cx('wrap-input-comment')}>
                        <span>{myAccount.nameAccount}</span>
                        <div className={cx('time-comment')}>
                            <FontAwesomeIcon icon={faClock} />
                            <span>{myComment.time}</span>
                        </div>
                        <input
                            value={comment}
                            ref={commentRef}
                            readOnly
                            spellCheck="false"
                            type="text"
                            className={cx('input-comment')}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        {/* Update comment */}
                        <div className={cx('d-flex update-comment-container')}>
                            <button>Huỷ</button>
                            <button>Cập nhật</button>
                        </div>
                    </div>

                    {/* Options comment */}
                    <div className={cx('options-comment')}>
                        <HeadlessTippy
                            interactive
                            visible={showOptions}
                            render={(attrs) => (
                                <div className={cx('options-container')} {...attrs}>
                                    <p className={cx('option')} onClick={handleUpdateComment}>
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
