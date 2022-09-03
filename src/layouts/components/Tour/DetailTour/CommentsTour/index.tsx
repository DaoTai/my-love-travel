import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { comments as FakeComments } from './FakeDatas';
import { myAccount } from './FakeDatas';
import style from '../styles.module.scss';
const cx = classNames.bind(style);
const CommentsTour = () => {
    const { id } = useParams();
    const [comments, setComments] = useState(FakeComments.filter((comment) => comment.idTour === id));
    const [myComment, setMyComment] = useState<string>('');
    const [showWrapButtons, setShowWrapButtons] = useState<boolean>(false);

    // Submit comment
    const handleSendComment = () => {
        setComments((prev: any) => {
            const dataSend = {
                ...myAccount,
                idTour: id,
                idAccount: Number(myAccount.id),
                comment: myComment,
                id: Math.floor(Math.random() * 1000),
            };
            return [dataSend, ...prev];
        });
        setMyComment('');
    };

    // Cancel comment
    const handleCancelComment = () => {
        setMyComment('');
        setShowWrapButtons(false);
    };

    return (
        <div id={cx('wrap-comments')}>
            <h3>Bình luận:</h3>
            <div className={cx('wrap-comments')}>
                {/* My comment */}
                <div className={cx('my-comment')}>
                    <img srcSet={myAccount.avatar} alt="avatar" className={cx('avatar')} />
                    <div className={cx('wrap-input-comment')}>
                        <input
                            type="text"
                            placeholder="Love Travel luôn sẵn sàng giải đáp thắc mắc của khách hàng"
                            spellCheck={false}
                            autoComplete="off"
                            className={cx('input-comment')}
                            value={myComment}
                            onChange={(e) => setMyComment(e.target.value)}
                            onFocus={() => setShowWrapButtons(true)}
                        />
                        {showWrapButtons && (
                            <div className={cx('wrap-btns')}>
                                <button className={cx('cancel-comment-btn')} onClick={handleCancelComment}>
                                    Huỷ
                                </button>
                                <button className={cx('send-comment-btn')} onClick={handleSendComment}>
                                    Bình luận
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                {/* Other comments */}
                <div id={cx('wrap-other-comments')}>
                    {comments.map((comment) => (
                        <div key={comment.id} className={cx('other-comments')}>
                            <img src={comment.avatar} alt="avatar" className={cx('avatar')} />
                            <div className={cx('wrap-input-comment')}>
                                <span>{comment.nameAccount}</span>
                                <input readOnly type="text" value={comment.comment} className={cx('input-comment')} />
                                <div className={cx('time-comment')}>
                                    <FontAwesomeIcon icon={faClock} />
                                    <span>{comment.time}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CommentsTour;
