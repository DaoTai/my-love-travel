import { useState, useEffect, useRef, memo } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faEllipsis, faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import { Comment } from '../../../interface';
import style from './styles.module.scss';
const cx = classNames.bind(style);
const MyComment = ({ myAccount, myComment }: { myAccount: any; myComment: Comment }) => {
    const [comment, setComment] = useState<string>(myComment.comment);
    const [showComment, setShowComment] = useState<boolean>(true);
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const [showUpdateOptions, setShowUpdateOptions] = useState<boolean>(false);
    const commentInputRef = useRef<HTMLInputElement>(Object(null));
    const updateCommentBtntRef = useRef<HTMLButtonElement>(Object(null));
    const commentRef = useRef(myComment.comment);
    useEffect(() => {
        window.addEventListener('scroll', hideOptions);
        return () => {
            window.removeEventListener('scroll', hideOptions);
        };
    }, []);

    // Hide show Options
    const hideOptions = () => {
        setShowOptions(false);
    };

    // Delete comment
    const handleDeleteComment = () => {
        console.log(myComment.id);
        setShowComment(false);
    };

    // Update comment
    const updateComment = () => {
        setShowOptions(false);
        commentInputRef.current.readOnly = false;
        commentInputRef.current.focus();
        setShowUpdateOptions(true);
    };

    // Handle set comment
    const handleSetComment = (e: any) => {
        setComment(e.target.value);
        if (e.target.value) {
            updateCommentBtntRef.current.disabled = false;
        } else {
            updateCommentBtntRef.current.disabled = true;
        }
    };

    // Handle update comment
    const handleUpdateComment = () => {
        if (comment) {
            commentRef.current = comment;
        } else {
            updateCommentBtntRef.current.disabled = true;
        }
        setShowUpdateOptions(false);
        // Call API
    };

    // Hide show Update
    const hideUpdateOptions = () => {
        setComment(commentRef.current);
        setShowUpdateOptions(false);
        commentInputRef.current.readOnly = true;
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
                            ref={commentInputRef}
                            readOnly
                            spellCheck="false"
                            type="text"
                            className={cx('input-comment')}
                            onChange={(e) => handleSetComment(e)}
                        />
                        {/* Update comment */}
                        {showUpdateOptions && (
                            <div className={cx('update-comment-container')}>
                                <button className={cx('cancel-comment-btn')} onClick={hideUpdateOptions}>
                                    Huỷ
                                </button>
                                <button ref={updateCommentBtntRef} onClick={handleUpdateComment}>
                                    Cập nhật
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Options comment */}
                    <div className={cx('options-comment')}>
                        <HeadlessTippy
                            interactive
                            visible={showOptions}
                            render={(attrs) => (
                                <div className={cx('options-container')} {...attrs}>
                                    <p className={cx('option')} onClick={updateComment}>
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

export default memo(MyComment);
